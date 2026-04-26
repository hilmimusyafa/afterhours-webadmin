import Link from "next/link";
import { getOrders } from "../lib/services/order.service";
import { getProducts } from "../lib/services/product.service";

export default function Page() {
  const orders = getOrders();
  const products = getProducts();
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const lowStockItems = products.filter((product) => product.stock <= 5).length;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header seragam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-6 rounded-sm flex flex-col justify-center">
          <p className="text-[#cfcfcf] font-mono text-sm leading-relaxed">
            Manage storefront orders, catalog inventory, and product updates from the admin dashboard.
          </p>
        </div>

        <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-6 rounded-sm flex flex-col gap-4">
          <h2 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">
            QUICK LINKS
          </h2>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <Link href="/orders" className="text-[#f0ece4] hover:text-[#d42b2b] transition-colors">~ Orders</Link>
            <Link href="/catalog" className="text-[#f0ece4] hover:text-[#d42b2b] transition-colors">~ Catalog</Link>
            <Link href="/catalog/new" className="text-[#f0ece4] hover:text-[#d42b2b] transition-colors">~ Add Product</Link>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", val: orders.length },
          { label: "Catalog Products", val: products.length },
          { label: "Pending Orders", val: pendingOrders },
          { label: "Low Stock Items", val: lowStockItems },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-3 bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded-sm">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888]">
              {stat.label}
            </div>
            <div className="font-['Ndot57Caps'] text-[1.8rem] text-[#f0ece4]">{stat.val}</div>
          </div>
        ))}
      </section>
    </div>
  );
}