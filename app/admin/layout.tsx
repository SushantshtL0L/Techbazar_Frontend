import Sidebar from "./_component/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen bg-black text-white font-sans dark'>
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-20 bg-black overflow-y-auto text-white">
                {children}
            </main>
        </div>
    );
}