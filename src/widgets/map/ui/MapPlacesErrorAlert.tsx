const ALERT_CLASS_NAME =
  'pointer-events-none absolute right-4 bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] z-50 max-w-xs rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-left text-xs leading-snug text-amber-900 shadow-sm';

type MapPlacesErrorAlertProps = {
  message: string;
};

export function MapPlacesErrorAlert({ message }: MapPlacesErrorAlertProps) {
  return (
    <div role="alert" className={ALERT_CLASS_NAME}>
      {message}
    </div>
  );
}
