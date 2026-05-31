"use client";

import { useState, useEffect } from "react";
import { LoginAction } from "@/src/actions/auth.action";

export default function Login() {
	const [moved, setMoved] = useState(false);
	const [formVisible, setFormVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const t1 = setTimeout(() => setMoved(true), 2000);
		const t2 = setTimeout(() => setFormVisible(true), 2700);
		return () => {
		clearTimeout(t1);
		clearTimeout(t2);
		};
	}, []);

	return (
		<div className=" overflow-hidden">
		<div
			className="fixed inset-0 pointer-events-none z-10"
			style={{
			background:
				"repeating-linear-gradient(0deg, transparent, transparent 2px)",
			}}
		/>

		<div
			className={
			"absolute flex flex-col items-center gap-0.5 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] z-20 " +
			(moved
				? "left-[25%] top-[50%] max-sm:left-[50%] max-sm:top-[30%]"
				: "left-[50%] top-[50%]")
			}
		>
			<div className="font-[Ndot57Caps] text-[clamp(2.5rem,5vw,3.5rem)] tracking-[0.22em] text-[#f0ece4] leading-none">
			AFTER
			</div>
			<div className="font-[Ndot57Caps] text-[clamp(2.5rem,5vw,3.5rem)] tracking-[0.22em] text-[#d42b2b] leading-none">
			HOURS
			</div>
			<div className="font-mono text-sm tracking-[0.45em] text-white mt-4 uppercase">
			Admin
			</div>
		</div>

		<div
			className={
			"absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-px h-[250px] bg-gradient-to-b from-transparent via-[#333] to-transparent transition-opacity duration-500 delay-100 z-10 " +
			(formVisible ? "opacity-100" : "opacity-0") +
			" max-sm:hidden"
			}
		/>

		<form
			action={async (formData) => {
				setLoading(true);
				setError("");
				const res = await LoginAction(formData);
				if (res?.error) {
					setError(res.error);
					setLoading(false);
				}
			}}
			className={
			"absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col transition-opacity duration-500 z-20 w-[300px] max-sm:w-[85vw] " +
			(formVisible ? "opacity-100" : "opacity-0") +
			" " +
			(moved
				? "left-[75%] top-[50%] max-sm:left-[50%] max-sm:top-[65%]"
				: "left-[50%] top-[50%]")
			}
		>
			<div className="font-[Ndot57Caps] text-[clamp(1.2rem,2.5vw,1.5rem)] tracking-[0.08em] text-[#f0ece4] mb-10 max-sm:text-center">
			<span className="text-[#d42b2b]">*ADMIN </span>LOGIN
			</div>

			<div className="flex flex-col gap-6 mb-12">
			<div>
				<div className="text-[0.65rem] tracking-[0.3em] text-white uppercase mb-2 font-mono">
				Email
				</div>
				<input
				name="email"
				className="w-full bg-transparent border-b border-[#333] text-[#f0ece4] font-mono text-sm py-2 outline-none placeholder:text-[#444] focus:border-b-[#d42b2b] transition-colors"
				type="email"
				placeholder="your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div>
				<div className="text-[0.65rem] tracking-[0.3em] text-white uppercase mb-2 font-mono">
				Password
				</div>
				<input
				name="password"
				className="w-full bg-transparent border-b border-[#333] text-[#f0ece4] font-mono text-sm py-2 outline-none placeholder:text-[#444] focus:border-b-[#d42b2b] transition-colors"
				type="password"
				placeholder="••••••••"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			</div>

			{error && (
				<div className="text-[#d42b2b] font-mono text-xs tracking-wider mb-6 text-center">
					{error}
				</div>
			)}

			<button
			type="submit"
			disabled={loading}
			className="w-full bg-[#d42b2b] text-white font-mono text-[0.8rem] tracking-[0.35em] uppercase py-3.5 cursor-pointer hover:bg-[#b02020] transition-colors disabled:opacity-50"
			>
			{loading ? "PROCESSING..." : "Proceed"}
			</button>
		</form>
		</div>
	);
}