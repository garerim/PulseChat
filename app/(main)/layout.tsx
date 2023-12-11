

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full pt-[56px]">
            {children}
        </main>
    )
}

export default MainLayout