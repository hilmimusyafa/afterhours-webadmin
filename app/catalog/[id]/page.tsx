import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/services/product.service";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const isLowStock = product.stock <= 5;

  return (
    <div className="text-[#f0ece4] flex flex-col gap-10 w-full">

      {/* Back */}
      <Link
        href="/catalog"
        className="w-fit flex items-center gap-2 px-4 py-2 border border-[#1e1e1e] font-mono text-[11px] tracking-widest text-[#555] uppercase hover:text-[#d42b2b] hover:border-[#3a0d0d] transition-all"
      >
        ← catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Image */}
        <div className="relative w-full aspect-square bg-[#111] border border-[#1e1e1e] overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Detail */}
        <div className="flex flex-col gap-8">

          {/* Badge + Name */}
          <div className="flex flex-col gap-3">
            <span className="inline-block font-mono text-[10px] tracking-[.12em] uppercase text-[#d42b2b] bg-[#1a0505] border border-[#3a0d0d] px-3 py-1.5 w-fit">
              {product.category.replace("_", " ")}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-[#888] text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="font-mono text-5xl font-bold text-[#d42b2b] leading-none">
            ${product.price}
            <span className="text-base text-[#555] font-normal ml-2">USD</span>
          </div>

          <div className="h-px bg-[#1a1a1a]" />

          {/* Stock */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-5 flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#444] block mb-2">
                Stock
              </span>
              <div className="flex items-center gap-2 text-lg text-[#c5c0b8]">
                <span className={`w-2 h-2 rounded-full ${isLowStock ? "bg-amber-500" : "bg-emerald-500"}`} />
                {product.stock} units
                {isLowStock && (
                  <span className="font-mono text-[10px] text-amber-400 border border-amber-900 bg-amber-950 px-2 py-0.5 ml-1">
                    Low Stock
                  </span>
                )}
              </div>
            </div>
            <button className="font-mono text-[11px] tracking-widest uppercase text-[#888] border border-[#1e1e1e] hover:border-emerald-700 hover:text-emerald-400 px-5 py-2.5 transition-all">
              Restock
            </button>
          </div>

          {/* Tags */}
          {product.tags && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] tracking-wider text-[#555] border border-[#1e1e1e] px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="h-px bg-[#1a1a1a]" />

          {/* Admin Actions */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#d42b2b] hover:text-[#d42b2b] text-[#888] font-mono text-[11px] tracking-widest uppercase py-4 transition-all">
              Edit Product
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-[#0f0f0f] border border-[#1e1e1e] hover:border-amber-600 hover:text-amber-400 text-[#888] font-mono text-[11px] tracking-widest uppercase py-4 transition-all">
                Toggle Visibility
              </button>
              <button className="bg-[#0f0f0f] border border-[#1a0505] hover:bg-[#1a0505] hover:text-[#d42b2b] text-[#555] font-mono text-[11px] tracking-widest uppercase py-4 transition-all">
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}