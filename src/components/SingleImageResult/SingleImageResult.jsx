import { Copy, Download } from 'lucide-react';

export default function SingleImageResult({
  result,
  truncationPsi,
  noiseMode,
  onCopySeed,
  onDownload,
}) {
  return (
    <div className="card">
      <h2 className="section-title">Resultado</h2>
      <div className="result-container">
        <img
          src={`data:image/png;base64,${result.image}`}
          alt="Generated"
          className="result-image"
        />
        <div className="result-info">
          <span className="seed-badge">Seed: {result.seed}</span>
          <button onClick={() => onCopySeed(result.seed)} className="action-btn btn-purple">
            <Copy size={16} />
            Copiar
          </button>
        </div>
        <button
          onClick={() => onDownload(result.image, result.seed, truncationPsi, noiseMode)}
          className="action-btn btn-green"
        >
          <Download size={16} />
          Descargar
        </button>
      </div>
    </div>
  );
}
