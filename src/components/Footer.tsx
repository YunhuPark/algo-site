export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] mt-8">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-zinc-600">알고 — AI 자동화 카드뉴스</p>
          <p className="text-xs text-zinc-700 mt-1">
            GPT-4o · Tavily · DALL-E 3 · Instagram Graph API
          </p>
        </div>
        <a
          href="https://instagram.com/algo__kr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
        >
          @algo__kr ↗
        </a>
      </div>
    </footer>
  );
}
