"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var ws_1 = __importDefault(require("ws"));
var serverless_1 = require("@neondatabase/serverless");
var adapter_neon_1 = require("@prisma/adapter-neon");
var client_1 = require("@prisma/client");
// Siapkan WebSockets untuk lingkungan Node.js murni agar adapter berjalan
serverless_1.neonConfig.webSocketConstructor = ws_1.default;
var globalForPrisma = globalThis;
function createPrismaClient() {
    var dbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_tkXwDxP6gi0o@ep-nameless-dream-ao5uwcni-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    console.log("[PRISMA_INIT] NEXT.js creating Prisma Client...");
    console.log("[PRISMA_INIT] process.env.DATABASE_URL is:", process.env.DATABASE_URL ? "SET" : "UNDEFINED");
    console.log("[PRISMA_INIT] dbUrl being passed to Pool is:", dbUrl);
    var pool = new serverless_1.Pool({ connectionString: dbUrl });
    var adapter = new adapter_neon_1.PrismaNeon(pool);
    return new client_1.PrismaClient({ adapter: adapter }); // Prisma 7 mewajibkan opsi adapter!
}
exports.prisma = createPrismaClient();
// Selalu override cache saat hot reload agar perubahan config terbaca
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prismaFresh = exports.prisma;
