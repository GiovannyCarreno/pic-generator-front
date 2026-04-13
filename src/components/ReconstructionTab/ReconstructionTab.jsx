import { useEffect, useMemo, useState } from 'react';
import { Download, Loader2, Upload } from 'lucide-react';
import { compareModels } from '../../api/imageApi';
import SectionHeading from '../ui/SectionHeading';

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

const inputLabelClass = 'text-sm font-semibold text-ink';

export default function ReconstructionTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
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

  const processFile = (file) => {
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

  const handleFileChange = (event) => {
    processFile(event.target.files?.[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    processFile(file);
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

  const dropzoneClass = `flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-5 py-6 text-center transition duration-200 ${
    isDragging
      ? 'border-accent bg-accent/10 scale-[1.01]'
      : 'border-cream-300 bg-cream-200/40 hover:border-accent/50 hover:bg-cream-200/70'
  }`;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <span className={inputLabelClass}>Imagen para comparar</span>
          <label
            htmlFor="reconstruction-image"
            className={dropzoneClass}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="size-7 text-accent" aria-hidden />
            <span className="font-semibold text-ink">Haz clic para seleccionar una imagen</span>
            <small className="text-sm text-ink-muted">También puedes arrastrar y soltarla aquí</small>
            {selectedFile && (
              <p className="mt-1 max-w-full truncate text-xs text-ink-muted" title={selectedFile.name}>
                {selectedFile.name}
              </p>
            )}
          </label>
          <input
            id="reconstruction-image"
            type="file"
            accept=".png,.jpg,.jpeg,.bmp,.webp"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <button
        type="button"
        className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover px-4 py-3.5 text-lg font-bold text-cream-50 shadow-lg shadow-ink/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={handleCompare}
        disabled={loading || !selectedFile}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden />
            Ejecutando reconstrucción…
          </>
        ) : (
          <>
            <Upload className="size-5" aria-hidden />
            Ejecutar reconstrucción
          </>
        )}
      </button>

      {error && (
        <div
          className="rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-ink"
          role="alert"
        >
          {error}
        </div>
      )}

      {previewUrl && !result && (
        <div className="flex flex-col gap-3">
          <p className={inputLabelClass}>Vista previa</p>
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-cream-300 bg-cream-100/80 p-4">
            <img
              src={previewUrl}
              alt="Vista previa del archivo seleccionado"
              className="max-h-[min(70vh,560px)] w-full object-contain"
            />
          </div>
        </div>
      )}

      {result && (
        <div className="mt-1 space-y-6">
          <SectionHeading as="h3">Resultados de comparación</SectionHeading>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-cream-300 bg-cream-100/90 p-4 text-ink">
              <p className="mb-1 text-sm text-ink-muted">Resolución 256×256 — cobertura</p>
              <strong className="text-lg tabular-nums text-ink">
                {result.metricas?.cobertura_modelo_1?.toFixed?.(2) ?? '-'}%
              </strong>
            </div>
            <div className="rounded-xl border border-cream-300 bg-cream-100/90 p-4 text-ink">
              <p className="mb-1 text-sm text-ink-muted">Resolución 512×512 — cobertura</p>
              <strong className="text-lg tabular-nums text-ink">
                {result.metricas?.cobertura_modelo_2?.toFixed?.(2) ?? '-'}%
              </strong>
            </div>
            <div className="rounded-xl border border-cream-300 bg-cream-100/90 p-4 text-ink sm:col-span-2 lg:col-span-1">
              <p className="mb-1 text-sm text-ink-muted">Threshold</p>
              <strong className="text-lg tabular-nums text-ink">{result.metricas?.threshold_modelo_1 ?? '-'}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {previewUrl && (
              <article className="rounded-xl border border-cream-300/80 bg-cream-50/90 p-3 sm:p-4">
                <p className="mb-2 text-center text-sm font-medium text-ink-muted">Imagen original</p>
                <img
                  src={previewUrl}
                  alt="Imagen original cargada"
                  className="aspect-square w-full object-contain bg-cream-200/50"
                />
              </article>
            )}
            {imageResults.modelo1 && (
              <article className="rounded-xl border border-cream-300/80 bg-cream-50/90 p-3 sm:p-4">
                <p className="mb-2 text-center text-sm font-medium text-ink-muted">Simulación — segmentado 256×256 px</p>
                <img
                  src={imageResults.modelo1}
                  alt="Simulación del modelo 1"
                  className="aspect-square w-full object-contain bg-cream-200/50"
                />
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-cream-50 transition hover:bg-sage-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                    onClick={() => downloadFromDataUrl(imageResults.modelo1, 'simulacion_modelo_1.png')}
                    aria-label="Descargar simulación modelo 1 (PNG)"
                  >
                    <Download className="size-4 shrink-0" aria-hidden />
                    Descargar
                  </button>
                </div>
              </article>
            )}
            {imageResults.modelo2 && (
              <article className="rounded-xl border border-cream-300/80 bg-cream-50/90 p-3 sm:p-4">
                <p className="mb-2 text-center text-sm font-medium text-ink-muted">Simulación — segmentado 512×512 px</p>
                <img
                  src={imageResults.modelo2}
                  alt="Simulación del modelo 2"
                  className="aspect-square w-full object-contain bg-cream-200/50"
                />
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-cream-50 transition hover:bg-sage-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                    onClick={() => downloadFromDataUrl(imageResults.modelo2, 'simulacion_modelo_2.png')}
                    aria-label="Descargar simulación modelo 2 (PNG)"
                  >
                    <Download className="size-4 shrink-0" aria-hidden />
                    Descargar
                  </button>
                </div>
              </article>
            )}
          </div>

          {imageResults.comparacion && (
            <article className="w-full rounded-xl border border-cream-300/80 bg-cream-50/90 p-3 sm:p-4">
              <p className="mb-3 text-center text-sm font-medium text-ink-muted">Comparación general</p>
              <div className="flex min-h-[min(55vh,520px)] w-full items-center justify-center rounded-lg border border-cream-200/90 bg-cream-200/45 p-2 sm:min-h-[min(60vh,640px)] sm:p-4">
                <img
                  src={imageResults.comparacion}
                  alt="Comparación de modelos"
                  className="h-auto max-h-[min(85vh,920px)] w-full object-contain"
                />
              </div>
            </article>
          )}
        </div>
      )}
    </div>
  );
}
