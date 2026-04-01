/** NL / 中文 voor boekingstatus in het adminpaneel */
export function adminBookingStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "In afwachting / 待确认";
    case "bevestigd":
      return "Bevestigd / 已确认";
    case "geannuleerd":
      return "Geannuleerd / 已取消";
    case "voltooid":
      return "Voltooid / 已完成";
    default:
      return status;
  }
}

/** WordPress / BookingPress-achtige statuswaarden */
export function adminWpBookingStatusLabel(raw: string): string {
  const s = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (s === "approved" || s === "approve")
    return "Bevestigd / 已确认";
  if (s === "cancelled" || s === "canceled")
    return "Geannuleerd / 已取消";
  if (s === "pending") return "In afwachting / 待确认";
  return raw;
}
