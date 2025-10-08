export const statusBadge = (s: string) => {
  switch (s) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Inactive":
      return "bg-gray-100 text-gray-800";
    case "Discharged":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export const displayCondition = (conditions: string[]) => (conditions.length ? conditions.join(", ") : "Unknown");

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(new Date(iso));
