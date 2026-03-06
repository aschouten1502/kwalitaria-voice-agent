let idCounter = 0;

export function generateId(): string {
  idCounter++;
  return `${Date.now()}-${idCounter}`;
}

export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function formatEuro(cents: number): string {
  return `EUR ${formatPrice(cents)}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
