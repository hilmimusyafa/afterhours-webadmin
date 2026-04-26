"use client"
import React, { useState } from "react";

export default function OrderViewPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState("Pending");
    const [resi, setResi] = useState("");

    return (
        <div className="flex flex-col gap-8 w-full relative">
            
            {/* Header Standar */}
            <div className="flex flex-col gap-2 w-full text-left">
                <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
                    ORDER <span className="text-[#d42b2b]">DETAILS</span>
                </h1>
                <div className="w-fit mx-auto px-3 py-1 bg-[#0f0f0f] border border-[#1a1a1a] text-[#d42b2b] text-[0.65rem] tracking-[0.2em] uppercase font-mono rounded-sm text-center">
                    Status: {status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch">
                
                {/* Visual Kotak Kiri (Peta/Foto) */}
                <div className="relative overflow-hidden rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] w-full min-h-[350px]">
                    <img
                        src="/images/map-placeholder.jpg"
                        alt="Location Map"
                        className="absolute inset-0 w-full h-full object-cover block opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 pointer-events-none opacity-20" 
                        style={{ backgroundImage: 'radial-gradient(#d42b2b 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />
                    
                    <div className="absolute bottom-6 left-6 flex flex-col gap-1 bg-[#0f0f0f]/90 p-4 border border-[#1a1a1a] backdrop-blur-md rounded-sm">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Destination</p>
                        <p className="text-sm text-[#f0ece4] font-mono">Jl. Asia Afrika No. 123, Bandung</p>
                    </div>
                </div>

                {/* Detail Informasi Kotak Kanan */}
                <div className="flex flex-col gap-8 p-8 rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] text-[#f0ece4] h-full">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#d42b2b] font-mono">Customer Info</p>
                            <h3 className="text-xl font-semibold tracking-wide">Jane Doe</h3>
                            <div className="text-sm text-[#888] font-mono space-y-1">
                                <p>jane@example.com</p>
                                <p>+62 812-3456-7890</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#d42b2b] font-mono">Shipping to</p>
                            <p className="text-sm text-[#888] leading-relaxed font-mono">
                                Kec. Sumur Bandung, <br/>
                                Kota Bandung, 40111
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Ordered Items</p>
                        <div className="space-y-3 font-mono text-sm border-t border-b border-[#1a1a1a] py-4">
                            <div className="flex justify-between items-center text-[#cfcfcf]">
                                <span>1x NEO STUDIO 60HE+</span>
                                <span>Rp 15.000.000</span>
                            </div>
                            <div className="flex justify-between items-center text-[#cfcfcf]">
                                <span>1x Deskmat Space Edition</span>
                                <span>Rp 350.000</span>
                            </div>
                        </div>
                    </div>

                    {resi && (
                        <div className="bg-[#111] p-4 border border-[#1a1a1a] rounded-sm flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Tracking Number</p>
                            <p className="text-sm font-mono text-[#f0ece4] tracking-wider">{resi}</p>
                        </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Grand Total</p>
                            <p className="text-2xl font-semibold text-[#f0ece4]">Rp 15.350.000</p>
                        </div>

                        {/* Tombol Standar */}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto px-8 py-3 bg-[#d42b2b] text-white font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#b02020] transition-colors"
                        >
                            Manage Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Sisa modal bisa menggunakan desain border-[#1a1a1a] bg-[#0f0f0f] dan font label yang sama persis */}
        </div>
    )
}