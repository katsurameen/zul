'use client';

export default function LayoutShell({ children }) {
  return (
    <div className="relative z-10 flex flex-col h-[calc(100dvh-1rem)] sm:h-[calc(100dvh-4rem)] border-2 border-neutral-700/60 bg-[#222]/95 overflow-hidden">
      {/* top HUD strip */}
      <div className="shrink-0 flex items-center justify-between gap-2 border-b-2 border-neutral-700/60 px-3 sm:px-6 py-2 text-[8px] sm:text-[10px] text-neutral-400 overflow-hidden">
        <span className="truncate">ZUMA.WAHIB</span>
        <span className="hidden sm:inline">BANDUNG, ID (6.9175S, 107.6191E)</span>
        <span className="flex items-center gap-2 shrink-0">
          <span className="inline-block w-2 h-2 bg-green-400" />
          OPEN TO DISCUSS
        </span>
      </div>
      {children}
      {/* bottom HUD strip */}
      <div className="shrink-0 flex items-center justify-between gap-2 border-t-2 border-neutral-700/60 px-3 sm:px-6 py-2 text-[8px] sm:text-[10px] text-neutral-500 overflow-hidden">
        <span className="shrink-0">© 2026 ZULFA</span>
        <span className="truncate">SCROLL TO EXPLORE ↓</span>
      </div>
    </div>
  );
}
