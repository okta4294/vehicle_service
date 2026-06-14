import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background min-h-screen flex flex-col md:flex-row relative">
            {/* Decorative Background Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-50"></div>
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] z-0 pointer-events-none"></div>
            
            <Navigation />
            
            {children}
        </div>
    )
}
