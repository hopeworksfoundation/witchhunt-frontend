import { Navbar } from "./components/layout/Navbar";

const keyMetrics = [
	{ value: "6,151", label: "Participants registered" },
	{ value: "668", label: "Locations reached" },
	{ value: "23", label: "States represented" },
	{ value: "76%", label: "Women representation" },
	{ value: "373", label: "AI prototypes built" },
	{ value: "779", label: "Ideas submitted" },
	{ value: "20,168", label: "Hours of training delivered" },
	{ value: "70+", label: "Jury members" },
];

const supportPoints = [
	"Access to quality AI learning for thousands of young innovators.",
	"Mentorship and guidance from 300+ industry leaders & experts.",
	"Real-world support to turn ideas into working AI prototypes.",
	"Recognition, seed funding, and a stage to showcase their innovations.",
];

const App = () => {
	return (
		<main className="min-h-screen bg-[#f7f5fb] text-slate-900">
			<Navbar />

			<section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
				<div className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white shadow-[0_25px_80px_-35px_rgba(124,58,237,0.35)]">
					<div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
						<div className="bg-gradient-to-br from-[#1c1630] via-[#2d1d4d] to-[#5a1a5a] p-8 text-white sm:p-10 lg:p-12">
							<p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-200">
								HopeWorks FOUNDATION
							</p>
							<h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
								WITCHHUNT 2026 • IMPACT REPORT
							</h1>
							<p className="mt-4 text-lg font-medium text-violet-100/90">
								2026 IMPACT SNAPSHOT
							</p>
							<p className="mt-3 text-base font-medium text-violet-100/80">
								EDITION 1 | JUNE 2026
							</p>
							<p className="mt-8 max-w-xl text-lg leading-8 text-violet-50/90">
								One of India's largest women-led hackathons — leveraging AI to turn ideas into real, working solutions.
							</p>
						</div>

						<div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_transparent_45%),linear-gradient(135deg,#f5d7ff,#fff7ed)] p-6 sm:p-8">
							<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02))]" />
							<div className="relative flex h-full items-end">
								<div className="w-full rounded-[1.5rem] border border-white/40 bg-white/45 p-4 backdrop-blur-sm shadow-xl">
									<p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
										Caption
									</p>
									<p className="mt-2 text-sm leading-6 text-slate-700">
										Young innovators at work — turning ideas into real, working AI prototypes.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
				<div className="mb-8 flex items-center justify-between gap-4">
					<p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600">
						Key metrics
					</p>
					<div className="hidden h-px flex-1 bg-gradient-to-r from-violet-200 to-transparent sm:block" />
				</div>

				<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
					{keyMetrics.map((metric) => (
						<div
							key={metric.label}
							className="rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5 shadow-[0_18px_40px_-24px_rgba(124,58,237,0.5)] ring-1 ring-violet-100"
						>
							<p className="text-3xl font-black tracking-[-0.06em] text-slate-900 sm:text-4xl">
								{metric.value}
							</p>
							<p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
								{metric.label}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
				<div className="rounded-[2rem] bg-[#fffaf4] p-8 shadow-sm ring-1 ring-amber-100 sm:p-10">
					<p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">
						How Your Support Makes a Difference
					</p>
					<div className="mt-7 grid gap-5 md:grid-cols-2">
						{supportPoints.map((point) => (
							<div
								key={point}
								className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm"
							>
								<span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet-600 to-orange-400" />
								<p className="text-base leading-7 text-slate-700">{point}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<footer className="mt-8 bg-[#20172f] text-white">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-200">
						YOUR SUPPORT. THEIR JOURNEY. REAL IMPACT.
					</p>
					<h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
						Want to know exactly how your contribution helped young innovators learn, build, and bring their ideas to life?
					</h2>
					<div className="mt-8">
						<button
							type="button"
							className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-violet-500/25 transition hover:opacity-95"
						>
							<span aria-hidden="true">→</span>
							READ THE FULL WITCHHUNT 2026 IMPACT REPORT
						</button>
					</div>
				</div>
			</footer>
		</main>
	);
};

export default App;
