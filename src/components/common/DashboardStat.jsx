export default function DashboardStat({ icon: Icon, label, value, helper, tone = "orange" }) {
  const tones = {
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    neutral: "bg-neutral-100 text-neutral-700",
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${tones[tone] || tones.orange}`}>
          <Icon size={20} />
        </span>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <p className="mt-4 text-sm font-semibold text-neutral-700">{label}</p>
      {helper && <p className="mt-1 text-xs text-neutral-500">{helper}</p>}
    </div>
  );
}
