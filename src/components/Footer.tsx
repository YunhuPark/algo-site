export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] mt-8">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-zinc-500">ALGO PIPELINE — RELIABILITY CONSOLE</p>
          <p className="text-xs text-zinc-700 mt-1">
            Draft hardening branch · offline verification · publish disabled
          </p>
        </div>
        <a
          href="https://github.com/YunhuPark/algo-pipeline"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
        >
          Source repository ↗
        </a>
      </div>
    </footer>
  );
}
