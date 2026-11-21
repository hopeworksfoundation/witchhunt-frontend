import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Navigation links
const hackathonLinks = [
	{ label: "Tracks & Themes", href: "#tracks" },
	{ label: "Event Roadmap", href: "#roadmap" },
	{ label: "Awards & Recognition", href: "#awards" },
	{ label: "Winners", href: "#winners" },
	{ label: "FAQs", href: "#faqs" },
	{ label: "Bootcamp Recordings", href: "#recordings" },
];

const communityLinks = [
	{ label: "Team", href: "#team" },
	{ label: "Mentors", href: "#mentors" },
	{ label: "Volunteers", href: "#volunteers" },
	{ label: "Contribute", href: "#contribute" },
	{ label: "Partners & Collaborators", href: "#partners" },
];

// Dropdown component
type NavDropdownProps = {
	label: string;
	links: typeof hackathonLinks;
	mobile?: boolean;
	onSelect?: () => void;
};

const NavDropdown = ({
	label,
	links,
	mobile = false,
	onSelect,
}: NavDropdownProps) => {
	const [expanded, setExpanded] = useState(false);

	if (mobile) {
		return (
			<li>
				<button
					type="button"
					className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm font-bold text-foreground transition-colors hover:bg-secondary"
					aria-expanded={expanded}
					onClick={() => setExpanded((value) => !value)}
				>
					{label}
					<ChevronDown
						className={cn(
							"size-4 transition-transform",
							expanded && "rotate-180",
						)}
					/>
				</button>

				{expanded && (
					<ul className="grid gap-0.5 pb-1 pl-3 pt-1">
						{links.map((item) => (
							<li key={item.label}>
								<a
									href={item.href}
									onClick={onSelect}
									className="flex min-h-10 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				)}
			</li>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-10 gap-1.5 px-3 text-[0.8125rem] font-bold text-muted-foreground hover:bg-secondary hover:text-primary data-[state=open]:bg-secondary data-[state=open]:text-primary"
				>
					{label}
					<ChevronDown className="size-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				sideOffset={9}
				className="w-64 rounded-lg border-border/80 p-1.5 shadow-lg"
			>
				{links.map((item) => (
					<DropdownMenuItem
						key={item.label}
						asChild
						className="min-h-10 cursor-pointer rounded-md px-3 text-sm font-semibold"
					>
						<a href={item.href}>{item.label}</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const RegistrationButton = () => {
	return (
		<Button
			type="button"
			className="btn-base btn-brand hidden min-h-11 px-5 sm:inline-flex"
		>
			Registration Open
		</Button>
	);
};

// Main Navbar component
export const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);

		onScroll();

		window.addEventListener("scroll", onScroll, { passive: true });

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const closeMobile = () => setMobileOpen(false);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
				scrolled || mobileOpen
					? "border-border/70 bg-background/95 shadow-sm backdrop-blur-xl"
					: "border-transparent bg-background/75 backdrop-blur-md",
			)}
		>
			<nav
				aria-label="Main navigation"
				className="shell flex min-h-[4.5rem] items-center justify-between gap-3 px-5 md:min-h-[5rem] md:px-8"
			>
				{/* Brand */}
				<a
					href="#top"
					onClick={closeMobile}
					className="flex shrink-0 items-center gap-2.5 rounded-sm font-display font-extrabold text-foreground"
					aria-label="WitchHunt, back to top"
				>
					<span className="grid size-9 place-items-center rounded-lg bg-primary text-sm text-primary-foreground">
						WH
					</span>
					<span className="text-base sm:text-lg">WitchHunt</span>
				</a>

				{/* Desktop navigation */}
				<ul className="hidden items-center gap-0.5 lg:flex">
					<li>
						<a
							href="#about"
							className="flex min-h-10 items-center rounded-md px-3 text-[0.8125rem] font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
						>
							About
						</a>
					</li>

					<li>
						<NavDropdown label="Hackathon" links={hackathonLinks} />
					</li>

					<li>
						<NavDropdown label="Community" links={communityLinks} />
					</li>

					<li>
						<a
							href="#editions"
							className="flex min-h-10 items-center rounded-md px-3 text-[0.8125rem] font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
						>
							Past Editions
						</a>
					</li>
				</ul>

				{/* Registration button and Mobile Menu*/}
				<div className="flex shrink-0 items-center gap-2">
					<RegistrationButton />

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => setMobileOpen((value) => !value)}
						className="size-11 border-border bg-background text-foreground lg:hidden"
						aria-expanded={mobileOpen}
						aria-controls="mobile-main-menu"
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? (
							<X className="size-5" />
						) : (
							<Menu className="size-5" />
						)}
					</Button>
				</div>
			</nav>

			{/* Mobile navigation */}
			{mobileOpen && (
				<div
					id="mobile-main-menu"
					className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 pt-3 lg:hidden"
				>
					<ul className="grid gap-0.5">
						<li>
							<a
								href="#about"
								onClick={closeMobile}
								className="flex min-h-11 items-center rounded-md px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
							>
								About
							</a>
						</li>

						<NavDropdown
							label="Hackathon"
							links={hackathonLinks}
							mobile
							onSelect={closeMobile}
						/>

						<NavDropdown
							label="Community"
							links={communityLinks}
							mobile
							onSelect={closeMobile}
						/>

						<li>
							<a
								href="#editions"
								onClick={closeMobile}
								className="flex min-h-11 items-center rounded-md px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
							>
								Past Editions
							</a>
						</li>
					</ul>

					<div className="pt-4">
						<Button
							type="button"
							className="btn-base btn-brand min-h-11 w-full"
						>
							Registration Open
						</Button>
					</div>
				</div>
			)}
		</header>
	);
};
