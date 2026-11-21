"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { type NavEntry, useNavConfig } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navLinkClasses =
	"inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900";

function NavLinkItem({ href, label }: { href: string; label: string }) {
	return (
		<a href={href} className={navLinkClasses}>
			{label}
		</a>
	);
}

function NavDropdownItem({ label, links }: { label: string; links: { label: string; href: string }[] }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn(
						navLinkClasses,
						"border border-transparent bg-transparent text-slate-700",
					)}
				>
					{label}
					<ChevronDown className="h-4 w-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-64 rounded-2xl p-2">
				{links.map((link) => (
					<DropdownMenuItem key={link.href} asChild>
						<a
							href={link.href}
							className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
						>
							{link.label}
						</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function renderNavItem(entry: NavEntry) {
	if (entry.type === "link") {
		return <NavLinkItem key={entry.href} href={entry.href} label={entry.label} />;
	}

	return <NavDropdownItem key={entry.label} label={entry.label} links={entry.links} />;
}

export function Navbar() {
	const nav = useNavConfig();
	const [mobileOpen, setMobileOpen] = useState(false);
	const items = nav ?? [];

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
				<a href="#top" className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 text-lg font-black text-white shadow-lg shadow-pink-500/20">
						W
					</div>
					<div>
						<p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
							WitchHunt
						</p>
						<p className="text-sm font-medium text-slate-500">Hackathon</p>
					</div>
				</a>

				<nav className="hidden items-center gap-2 md:flex">
					{items.map(renderNavItem)}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<Button variant="outline" className="rounded-full border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100">
						Join the waitlist
					</Button>
					<Button className="rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/20 hover:opacity-95">
						Apply now
					</Button>
				</div>

				<button
					type="button"
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
					className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
					onClick={() => setMobileOpen((open) => !open)}
				>
					{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{mobileOpen ? (
				<div className="border-t border-slate-200 bg-white md:hidden">
					<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
						{items.map((entry) => {
							if (entry.type === "link") {
								return (
									<a
										key={entry.href}
										href={entry.href}
										className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
										onClick={() => setMobileOpen(false)}
									>
										{entry.label}
									</a>
								);
							}

							return (
								<div key={entry.label} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
									<p className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
										{entry.label}
									</p>
									{entry.links.map((link) => (
										<a
											key={link.href}
											href={link.href}
											className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-white"
											onClick={() => setMobileOpen(false)}
										>
											{link.label}
										</a>
									))}
								</div>
							);
						})}
					</div>
				</div>
			) : null}
		</header>
	);
}
