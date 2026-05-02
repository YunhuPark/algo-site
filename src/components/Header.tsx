export default function Header() {
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#090909]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-zinc-100">알고</span>
        <div className="flex items-center gap-5">
          {dashboardUrl && (
            <a
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-700 hover:text-zinc-400 transition-colors duration-200"
            >
              대시보드 ↗
            </a>
          )}
          <a
            href="https://instagram.com/algo__kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            @algo__kr ↗
          </a>
        </div>
      </div>
    </header>
  );
}
