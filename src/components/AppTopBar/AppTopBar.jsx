import { Menu } from 'lucide-react';
import { getModeLabel } from '../../constants/navModes';
import { LOGO_SRC } from '../../constants/config';

export default function AppTopBar({ mode, onOpenSidebar, sidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-cream-300/80 bg-cream-50/90 px-4 py-3 shadow-sm backdrop-blur-md md:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-cream-300 bg-cream-100 text-ink transition hover:border-terracotta/50 hover:bg-cream-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
        aria-label="Abrir menú de navegación"
        aria-controls="app-sidebar"
        aria-expanded={sidebarOpen}
      >
        <Menu className="size-6" aria-hidden />
      </button>
      <img
        src={LOGO_SRC}
        alt=""
        width={40}
        height={40}
        className="h-9 w-auto max-h-9 shrink-0 object-contain object-left lg:hidden"
        decoding="async"
      />
      <div className="min-w-0 flex-1">
        <h1 className="font-heading truncate text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {getModeLabel(mode)}
        </h1>
      </div>
    </header>
  );
}
