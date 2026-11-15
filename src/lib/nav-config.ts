"use client";

import { useEffect, useState } from "react";

/**
 * Google Sheet layout (one row per nav item), first row = headers:
 *
 *   label                  | href        | parent    | enabled | order
 *   About                  | #about      |           | 1       | 1
 *   Tracks & Themes        | #tracks     | Hackathon | 1       | 2
 *   FAQs                   | #faqs       | Hackathon | 0       | 3
 *   Team                   | #team       | Community | 1       | 4
 *   Past Editions          | #editions   |           | 1       | 5
 *
 * - parent empty      -> plain top-level link
 * - parent "Hackathon" -> shown inside the "Hackathon" dropdown
 * - enabled = 1        -> shown, anything else -> hidden
 * - a dropdown with no enabled children is hidden entirely
 * - order              -> ascending sort (optional; sheet order is used if blank)
 */

export type NavLink = { label: string; href: string };

export type NavEntry =
	| { type: "link"; label: string; href: string }
	| { type: "dropdown"; label: string; links: NavLink[] };

type Row = {
	label: string;
	href: string;
	parent: string;
	enabled: boolean;
	order: number;
};

// Publish-to-web CSV URL of your sheet (see setup notes)
const SHEET_CSV_URL =
	"https://docs.google.com/spreadsheets/d/e/2PACX-1vS1gMya_nftoubDukJf7p3ltH2_7rM5Mu7zkbvWnNf_aJYKRQLVxNR9OeaFqK2nei2XGu4DeSUxNs2_/pub?gid=0&single=true&output=csv";
const CACHE_KEY = "nav-config-v1";
const CACHE_TTL_MS = 5 * 60 * 1000;

// Used only if the sheet cannot be fetched
export const FALLBACK_NAV: NavEntry[] = [
	{ type: "link", label: "About", href: "#about" },
	{
		type: "dropdown",
		label: "Hackathon",
		links: [
			{ label: "Tracks & Themes", href: "#tracks" },
			{ label: "Event Roadmap", href: "#roadmap" },
			{ label: "Awards & Recognition", href: "#awards" },
			{ label: "Winners", href: "#winners" },
			{ label: "FAQs", href: "#faqs" },
			{ label: "Bootcamp Recordings", href: "#recordings" },
		],
	},
	{
		type: "dropdown",
		label: "Community",
		links: [
			{ label: "Team", href: "#team" },
			{ label: "Mentors", href: "#mentors" },
			{ label: "Volunteers", href: "#volunteers" },
			{ label: "Contribute", href: "#contribute" },
			{ label: "Partners & Collaborators", href: "#partners" },
		],
	},
	{ type: "link", label: "Past Editions", href: "#editions" },
];

/** Minimal CSV parser (handles quotes, commas and newlines inside quotes). */
function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let cell = "";
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (inQuotes) {
			if (ch === '"' && text[i + 1] === '"') {
				cell += '"';
				i++;
			} else if (ch === '"') {
				inQuotes = false;
			} else {
				cell += ch;
			}
		} else if (ch === '"') {
			inQuotes = true;
		} else if (ch === ",") {
			row.push(cell);
			cell = "";
		} else if (ch === "\n" || ch === "\r") {
			if (ch === "\r" && text[i + 1] === "\n") i++;
			row.push(cell);
			rows.push(row);
			row = [];
			cell = "";
		} else {
			cell += ch;
		}
	}
	if (cell !== "" || row.length) {
		row.push(cell);
		rows.push(row);
	}
	return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

function toRows(csv: string): Row[] {
	const [header, ...body] = parseCsv(csv);
	if (!header) return [];
	const idx = (name: string) =>
		header.findIndex((h) => h.trim().toLowerCase() === name);
	const iLabel = idx("label");
	const iHref = idx("href");
	const iParent = idx("parent");
	const iEnabled = idx("enabled");
	const iOrder = idx("order");

	return body.map((r, n) => ({
		label: (r[iLabel] ?? "").trim(),
		href: (r[iHref] ?? "").trim(),
		parent: (r[iParent] ?? "").trim(),
		enabled: (r[iEnabled] ?? "").trim() === "1",
		order: Number.parseFloat(r[iOrder] ?? "") || n + 1,
	}));
}

export function buildNav(rows: Row[]): NavEntry[] {
	const visible = rows
		.filter((r) => r.enabled && r.label && r.href)
		.sort((a, b) => a.order - b.order);

	const entries: NavEntry[] = [];
	for (const r of visible) {
		if (!r.parent) {
			entries.push({ type: "link", label: r.label, href: r.href });
			continue;
		}
		let group = entries.find(
			(e): e is Extract<NavEntry, { type: "dropdown" }> =>
				e.type === "dropdown" && e.label === r.parent,
		);
		if (!group) {
			group = { type: "dropdown", label: r.parent, links: [] };
			entries.push(group);
		}
		group.links.push({ label: r.label, href: r.href });
	}
	return entries;
}

function readCache(): NavEntry[] | null {
	try {
		const raw = sessionStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const { at, data } = JSON.parse(raw);
		return Date.now() - at < CACHE_TTL_MS ? data : null;
	} catch {
		return null;
	}
}

/**
 * Returns the nav entries, or null while loading.
 * Falls back to FALLBACK_NAV if the sheet can't be fetched.
 */
export function useNavConfig(): NavEntry[] | null {
	const [nav, setNav] = useState<NavEntry[] | null>(null);

	useEffect(() => {
		const cached = readCache();
		if (cached) {
			setNav(cached);
			return;
		}
		if (!SHEET_CSV_URL) {
			setNav(FALLBACK_NAV);
			return;
		}

		const controller = new AbortController();
		fetch(SHEET_CSV_URL, { signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error(`Sheet request failed: ${res.status}`);
				return res.text();
			})
			.then((csv) => {
				const data = buildNav(toRows(csv));
				setNav(data);
				try {
					sessionStorage.setItem(
						CACHE_KEY,
						JSON.stringify({ at: Date.now(), data }),
					);
				} catch {
					/* storage unavailable, ignore */
				}
			})
			.catch((err) => {
				if (err.name !== "AbortError") setNav(FALLBACK_NAV);
			});

		return () => controller.abort();
	}, []);

	return nav;
}
