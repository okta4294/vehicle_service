"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("./lib/prisma");
prisma_1.prisma.user.findFirst().then(console.log).catch(console.error);
