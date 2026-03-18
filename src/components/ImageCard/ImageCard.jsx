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
    <div className="image-card">
      <img
        src={`data:image/png;base64,${image}`}
        alt={`Generated seed ${seed}`}
      />
      <div className="image-seed">Seed: {seed}</div>
      <div className="image-actions">
        <button onClick={() => onCopySeed(seed)} className="small-btn">
          <Copy size={14} />
        </button>
        <button
          onClick={() => onDownload(image, seed, truncationPsi, noiseMode)}
          className="small-btn green"
        >
          <Download size={14} />
        </button>
      </div>
    </div>
  );
}
