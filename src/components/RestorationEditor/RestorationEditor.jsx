import { EDITOR_URL } from '../../constants/config';

export default function RestorationEditor() {
  return (
    <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-cream-300/60">
      <div className="min-h-[55vh] flex-1 sm:min-h-[65vh]">
        <iframe
          src={EDITOR_URL}
          title="Editor de restauración de pictogramas"
          className="h-full min-h-[50vh] w-full rounded-b-xl border-0 bg-white sm:min-h-[55vh] md:min-h-[90vh]"
        />
      </div>
    </div>
  );
}
