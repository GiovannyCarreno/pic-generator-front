import { useEffect, useMemo, useState } from 'react';
import { Download, Loader2, Upload } from 'lucide-react';
import { compareModels } from '../../api/imageApi';

function asDataUrl(base64Value) {
  if (!base64Value) return null;
  return `data:image/png;base64,${base64Value}`;
}

function downloadFromDataUrl(dataUrl, filename) {
  if (!dataUrl) return;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

export default function ReconstructionTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const imageResults = useMemo(
    () => ({
      comparacion: asDataUrl(result?.imagenes?.comparacion),
      modelo1: asDataUrl(result?.imagenes?.simulacion_modelo_1),
      modelo2: asDataUrl(result?.imagenes?.simulacion_modelo_2),
    }),
    [result]
  );

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setError(null);
    setResult(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    const acceptedTypes = ['image/png', 'image/jpeg', 'image/bmp', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError('Selecciona una imagen válida (png, jpg, jpeg, bmp o webp).');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      return URL.createObjectURL(file);
    });
  };

  const handleCompare = async () => {
    if (!selectedFile) {
      setError('Selecciona una imagen para continuar.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await compareModels(selectedFile);
      setResult(data);
    } catch (err) {
      setError(err.message || 'No se pudo completar la comparación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reconstruction-container">
      <div className="controls-grid reconstruction-grid">
        <div className="control-group">
          <label className="control-label" htmlFor="reconstruction-image">
            Imagen para comparar
          </label>
          <input
            id="reconstruction-image"
            type="file"
            accept=".png,.jpg,.jpeg,.bmp,.webp"
            className="input-field reconstruction-file-input"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <button
        type="button"
        className="generate-btn"
        onClick={handleCompare}
        disabled={loading || !selectedFile}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="spinning" />
            Comparando modelos...
          </>
        ) : (
          <>
            <Upload size={20} />
            Ejecutar reconstrucción
          </>
        )}
      </button>

      {error && <div className="error-message">{error}</div>}

      {previewUrl && !result && (
        <div className="reconstruction-preview">
          <p className="control-label">Vista previa</p>
          <img src={previewUrl} alt="Vista previa" className="result-image reconstruction-image" />
        </div>
      )}

      {result && (
        <div className="reconstruction-results">
          <h3 className="section-title">Resultados de comparación</h3>
          <div className="reconstruction-metrics">
            <div className="reconstruction-metric-card">
              <p>Modelo 1 - Cobertura</p>
              <strong>{result.metricas?.cobertura_modelo_1?.toFixed?.(2) ?? '-'}%</strong>
            </div>
            <div className="reconstruction-metric-card">
              <p>Modelo 2 - Cobertura</p>
              <strong>{result.metricas?.cobertura_modelo_2?.toFixed?.(2) ?? '-'}%</strong>
            </div>
            <div className="reconstruction-metric-card">
              <p>Threshold modelo 1</p>
              <strong>{result.metricas?.threshold_modelo_1 ?? '-'}</strong>
            </div>
            <div className="reconstruction-metric-card">
              <p>Threshold modelo 2</p>
              <strong>{result.metricas?.threshold_modelo_2 ?? '-'}</strong>
            </div>
          </div>

          <div className="reconstruction-comparison-row">
            {previewUrl && (
              <div className="image-card">
                <p className="image-seed">Imagen original</p>
                <img src={previewUrl} alt="Vista previa original" />
              </div>
            )}
            {imageResults.modelo1 && (
              <div className="image-card">
                <p className="image-seed">Simulación - Modelo 1</p>
                <img src={imageResults.modelo1} alt="Simulación del modelo 1" />
                <div className="image-actions">
                  <button
                    type="button"
                    className="small-btn green"
                    onClick={() => downloadFromDataUrl(imageResults.modelo1, 'simulacion_modelo_1.png')}
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            )}
            {imageResults.modelo2 && (
              <div className="image-card">
                <p className="image-seed">Simulación - Modelo 2</p>
                <img src={imageResults.modelo2} alt="Simulación del modelo 2" />
                <div className="image-actions">
                  <button
                    type="button"
                    className="small-btn green"
                    onClick={() => downloadFromDataUrl(imageResults.modelo2, 'simulacion_modelo_2.png')}
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="reconstruction-images-grid">
            {imageResults.comparacion && (
              <div className="image-card">
                <p className="image-seed">Comparación general</p>
                <img src={imageResults.comparacion} alt="Comparación de modelos" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
