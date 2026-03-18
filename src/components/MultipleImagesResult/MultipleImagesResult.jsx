import ImageCard from '../ImageCard/ImageCard';

export default function MultipleImagesResult({
  results,
  truncationPsi,
  noiseMode,
  onCopySeed,
  onDownload,
}) {
  return (
    <div className="card">
      <h2 className="section-title">{results.number} Imágenes Generadas</h2>
      <div className="images-grid">
        {results.images.map((img, idx) => (
          <ImageCard
            key={idx}
            image={img}
            seed={results.seeds[idx]}
            truncationPsi={truncationPsi}
            noiseMode={noiseMode}
            onCopySeed={onCopySeed}
            onDownload={onDownload}
          />
        ))}
      </div>
    </div>
  );
}
