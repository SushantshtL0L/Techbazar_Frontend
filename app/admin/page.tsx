
import { handleWhoami } from "@/lib/actions/auth.actions";
import { notFound } from "next/navigation";
import { handleAdminGetAllUsers } from "@/lib/actions/auth.actions";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { handleGetAllOrders } from "@/lib/actions/order.actions";
import Link from "next/link";
import AdminCharts from "./_component/AdminCharts";

export default async function Page() {
    const userResult = await handleWhoami();
    if (!userResult.success || !userResult.data) {
        notFound();
    }

    // Fetch stats for the dashboard
    const usersResult = await handleAdminGetAllUsers();
    const productsResult = await handleGetAllProducts();
    const ordersResult = await handleGetAllOrders();

    const userCount = usersResult.success ? usersResult.data.length : 0;
    const productCount = productsResult.success ? productsResult.data.length : 0;
    const adminCount = usersResult.success ? usersResult.data.filter((u: any) => u.role === 'admin').length : 0;
    const orderCount = ordersResult.success ? ordersResult.data.length : 0;
    const pendingOrders = ordersResult.success ? ordersResult.data.filter((o: any) => o.status === 'processing' || o.status === 'pending').length : 0;

    const StatCard = ({ label, value, href, highlight }: { label: string, value: string | number, href?: string, highlight?: boolean }) => (
        <div className={`p-8 border rounded-3xl space-y-2 transition-colors ${highlight ? 'bg-teal-500/10 border-teal-500/30 hover:bg-teal-500/20' : 'bg-neutral-900 border-white/10 hover:bg-neutral-800'}`}>
            <h3 className="text-gray-500 font-medium uppercase tracking-widest text-sm">{label}</h3>
            <p className="text-6xl font-light text-white" style={{ fontFamily: "serif" }}>{value}</p>
            {href && (
                <Link href={href} className="inline-block text-xs text-teal-400 font-bold uppercase tracking-widest hover:underline mt-1">
                    View all →
                </Link>
            )}
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <header className="mb-12">
                <h2 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "serif" }}>Dashboard Overview</h2>
                <p className="text-gray-500 mt-2">Welcome back, Admin.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard label="Total Users" value={userCount} href="/admin/users" />
                <StatCard label="Total Products" value={productCount} href="/admin/products" />
                <StatCard label="System Admins" value={adminCount} />
                <StatCard label="Total Orders" value={orderCount} href="/admin/orders" />
                <StatCard label="Pending / Processing" value={pendingOrders} href="/admin/orders" highlight={pendingOrders > 0} />
            </div>

            {/* Visual Analytics Section */}
            <AdminCharts />
        </div>
    );
}