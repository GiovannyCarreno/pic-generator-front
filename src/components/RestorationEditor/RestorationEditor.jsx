import { EDITOR_URL } from '../../constants/config';

export default function RestorationEditor() {
  return (
    <div className="card restoration-card">
      <div className="restoration-iframe-container">
        <iframe
          src={EDITOR_URL}
          title="Restauración de pictogramas"
          className="restoration-iframe"
        />
      </div>
    </div>
  );
}
