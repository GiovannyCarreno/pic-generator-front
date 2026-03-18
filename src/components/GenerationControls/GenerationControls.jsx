import { Loader2, Wand2, RefreshCw } from 'lucide-react';

export default function GenerationControls({
  mode,
  seedInput,
  onSeedInputChange,
  onSeedBlur,
  onRandomizeSeed,
  numberOfImages,
  onNumberOfImagesChange,
  truncationPsi,
  onTruncationPsiChange,
  noiseMode,
  onNoiseModeChange,
  onGenerate,
  loading,
  error,
}) {
  return (
    <>
      <div className="controls-grid">
        {mode === 'single' && (
          <div className="control-group">
            <label className="control-label">Seed</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={seedInput}
                onChange={onSeedInputChange}
                onBlur={onSeedBlur}
                className="input-field"
              />
              <button onClick={onRandomizeSeed} className="icon-btn">
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        )}

        {mode === 'multiple' && (
          <div className="control-group">
            <label className="control-label">Número de Imágenes</label>
            <input
              type="number"
              min="1"
              max="10"
              value={numberOfImages}
              onChange={(e) => onNumberOfImagesChange(Number(e.target.value))}
              className="input-field"
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        )}

        <div className="control-group">
          <label className="control-label">
            Truncation PSI: {truncationPsi.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={truncationPsi}
            onChange={(e) => onTruncationPsiChange(Number(e.target.value))}
            className="range-input"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Noise Mode</label>
          <select
            value={noiseMode}
            onChange={(e) => onNoiseModeChange(e.target.value)}
            className="input-field"
          >
            <option value="random">Random</option>
            <option value="const">Const</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="spinning" />
            Generando...
          </>
        ) : (
          <>
            <Wand2 size={20} />
            Generar {mode === 'single' ? 'Imagen' : 'Imágenes'}
          </>
        )}
      </button>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
    </>
  );
}
