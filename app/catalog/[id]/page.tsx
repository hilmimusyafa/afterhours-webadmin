"use client"


export default function CatalogItemPage() {
    return (
        <div className="flex flex-col gap-8 w-full relative">
            {/* Header */}
            <div className="flex flex-col gap-2 w-full text-left">
                <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
                    CATALOG <span className="text-[#d42b2b]">ITEM</span>
                </h1>
                <div className="w-fit mx-auto px-3 py-1 bg-[#0f0f0f] border border-[#1a1a1a] text-[#d42b2b] text-[0.65rem] tracking-[0.2em] uppercase font-mono rounded-sm text-center">
                    Details
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
                {/* Kontainer Foto */}
                <div className="relative overflow-hidden rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] w-full h-full min-h-[300px]">
                    <img
                        src="/images/catalog-item.jpg"
                        alt="Catalog item"
                        className="absolute inset-0 w-full h-full object-cover block opacity-90"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(#d42b2b 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}
                    />
                    <div className="absolute bottom-6 left-6 flex flex-col gap-1 bg-[#0f0f0f]/90 p-3 border border-[#1a1a1a] backdrop-blur-md rounded-sm">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Preview</p>
                        <p className="text-sm text-[#f0ece4] font-mono">NEO STUDIO 60HE+</p>
                    </div>
                </div>

                {/* Kotak Teks */}
                <div className="flex flex-col gap-6 p-8 rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] text-[#f0ece4] min-h-[500px] md:min-h-[600px] justify-start h-full">
                    {/* Judul & Badge Kategori */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-semibold tracking-wide">NEO STUDIO 60HE+</h2>
                        <div>
                            <span className="px-3 py-1.5 bg-[#1a1a1a] border border-[#333] text-[#a0a0a0] text-[0.65rem] tracking-[0.2em] uppercase font-mono rounded-sm">
                                Category: Keyboard
                            </span>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <p className="text-sm md:text-md text-[#cfcfcf] font-mono leading-relaxed mt-2">
                        The NEO STUDIO 60HE+ is a high-performance desktop computer designed for professionals and gamers alike. With its powerful hardware and sleek design, it delivers exceptional performance for demanding tasks and immersive gaming experiences.
                    </p>

                    {/* Area Bawah: Harga, Stok, dan Tombol */}
                    <div className="mt-auto pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        {/* Grup Harga & Stok */}
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Price</p>
                                <p className="text-2xl font-semibold text-[#f0ece4]">Rp 15.000.000</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Stock</p>
                                <p className="text-2xl font-semibold text-[#f0ece4]">10</p>
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <button className="w-full sm:w-auto px-8 py-3 bg-[#d42b2b] text-white font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#b02020] transition-colors">
                            Edit Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}