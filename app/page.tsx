import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-5">
          <h1 className="mb-4 font-['Ndot57Caps'] text-xs tracking-[0.15em] text-[#f0ece4]">
            DASHBOARD <span className="text-[#d42b2b]">HOME</span>
          </h1>
          <p>Review orders, catalog, and API status from the dashboard home.</p>
        </div>

        <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-5">
          <h2 className="mb-4 font-['Ndot57Caps'] text-xs tracking-[0.15em] text-[#f0ece4]">
            QUICK LINKS
          </h2>
          <div className="flex flex-col gap-1.5">
            <Link href="/dashboard/orders">Orders</Link>
            <Link href="/dashboard/catalog">Catalog</Link>
            <Link href="/dashboard/apim">API Management</Link>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-px border border-[#1a1a1a] bg-[#1a1a1a]">
        <div className="flex flex-col gap-2 bg-[#0f0f0f] px-4 py-5">
          <div className="font-['Inter'] text-[0.6rem] uppercase tracking-[0.2em] text-[#444]">
            Total Orders
          </div>
          <div className="font-['Ndot57Caps'] text-[1.4rem] text-[#f0ece4]">12</div>
        </div>

        <div className="flex flex-col gap-2 bg-[#0f0f0f] px-4 py-5">
          <div className="font-['Inter'] text-[0.6rem] uppercase tracking-[0.2em] text-[#444]">
            Open Catalog Items
          </div>
          <div className="font-['Ndot57Caps'] text-[1.4rem] text-[#f0ece4]">8</div>
        </div>

        <div className="flex flex-col gap-2 bg-[#0f0f0f] px-4 py-5">
          <div className="font-['Inter'] text-[0.6rem] uppercase tracking-[0.2em] text-[#444]">
            API Uptime
          </div>
          <div className="font-['Ndot57Caps'] text-[1.4rem] text-[#f0ece4]">99.9%</div>
        </div>

        <div className="flex flex-col gap-2 bg-[#0f0f0f] px-4 py-5">
          <div className="font-['Inter'] text-[0.6rem] uppercase tracking-[0.2em] text-[#444]">
            Pending Tasks
          </div>
          <div className="font-['Ndot57Caps'] text-[1.4rem] text-[#f0ece4]">3</div>
        </div>
      </section>
    </div>
  );
}