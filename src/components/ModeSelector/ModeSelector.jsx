import { Wand2, Grid3x3, Paintbrush, RefreshCw } from 'lucide-react';

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <div className="mode-buttons">
      <button
        onClick={() => onModeChange('single')}
        className={`mode-btn ${mode === 'single' ? 'active' : 'inactive'}`}
      >
        <Wand2 size={20} />
        Imagen Individual
      </button>
      <button
        onClick={() => onModeChange('multiple')}
        className={`mode-btn ${mode === 'multiple' ? 'active' : 'inactive'}`}
      >
        <Grid3x3 size={20} />
        Múltiples Imágenes
      </button>
      <button
        onClick={() => onModeChange('restoration')}
        className={`mode-btn ${mode === 'restoration' ? 'active' : 'inactive'}`}
      >
        <Paintbrush size={20} />
        Restauración de pictogramas
      </button>
      <button
        onClick={() => onModeChange('reconstruction')}
        className={`mode-btn ${mode === 'reconstruction' ? 'active' : 'inactive'}`}
      >
        <RefreshCw size={20} />
        Reconstrucción
      </button>
    </div>
  );
}
