import { Info } from 'lucide-react';
import { getModeInstructions } from '../../constants/navModes';

export default function TabInstructions({ mode }) {
  const steps = getModeInstructions(mode);
  if (!steps?.length) return null;

  return (
    <section
      className="mb-6 rounded-xl border border-cream-300/80 bg-cream-100/50 px-4 py-4 sm:px-5 sm:py-5"
      aria-labelledby={`tab-instructions-${mode}`}
    >
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
          <Info className="size-5 sm:size-[1.35rem]" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`tab-instructions-${mode}`} className="mb-2 text-sm font-semibold text-ink sm:text-base">
            Cómo usar esta pantalla
          </h2>
          <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
            {steps.map((line, i) => (
              <li key={i} className="text-pretty pl-0.5 marker:text-ink-muted">
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
