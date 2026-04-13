import { Copy, Download } from 'lucide-react';

export default function ImageCard({
  image,
  seed,
  truncationPsi,
  noiseMode,
  onCopySeed,
  onDownload,
}) {
  return (
    <article className="rounded-xl border border-cream-300/80 bg-cream-50/90 p-3 shadow-md transition duration-200 hover:border-cream-300 hover:shadow-lg sm:p-4">
      <img
        src={`data:image/png;base64,${image}`}
        alt={`Imagen generada, seed ${seed}`}
        className="mb-3 w-full rounded-lg border border-cream-200 shadow-md"
      />
      <p className="mb-3 text-center text-sm tabular-nums text-ink-muted">Seed: {seed}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onCopySeed(seed)}
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg bg-accent py-2 text-cream-50 transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`Copiar seed ${seed}`}
        >
          <Copy className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => onDownload(image, seed, truncationPsi, noiseMode)}
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg bg-sage py-2 text-cream-50 transition hover:bg-sage-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          aria-label={`Descargar imagen seed ${seed}`}
        >
          <Download className="size-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
