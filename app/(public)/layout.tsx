export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen flex flex-col bg-black">
            <main className="flex-1">
                {children}
            </main>
        </section>
    );
}
