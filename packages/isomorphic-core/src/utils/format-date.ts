import dayjs from "dayjs";
import "dayjs/locale/fr"; // Import French locale

// Set the locale globally to French
dayjs.locale("fr");

export function formatDate(date?: Date, format: string = "DD MMM YYYY"): string {
  if (!date) return "";
  return dayjs(date).format(format);
}
