import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#090909]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-100 hover:text-zinc-300 transition-colors duration-200"
        >
          ALGO / RELIABILITY
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            Verification log
          </Link>
          <a
            href="https://github.com/YunhuPark/algo-pipeline/pull/1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            Draft PR ↗
          </a>
          <a
            href="https://github.com/YunhuPark/algo-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </header>
  );
}
