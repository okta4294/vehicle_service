import Navigation from '@/components/Navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background min-h-screen flex flex-col md:flex-row relative">
            <Navigation />
            <main className="flex-1 pt-16 md:pt-0 md:pl-64 w-full">
                {children}
            </main>
        </div>
    )
}
