export default function adminUserPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">User Management</h1>
            <p className="text-gray-400">This page will allow you to manage your application users.</p>
            {/* User table or list would go here */}
            <div className="mt-8 bg-neutral-900 rounded-lg shadow-sm p-4 border border-white/10">
                <p className="text-center py-10 text-gray-400">Loading user data...</p>
            </div>
        </div>
    );
}
