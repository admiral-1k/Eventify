export default function Input({ label, error, ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-neutral-800">
          {label}
        </label>
      )}

      <input
        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-neutral-200 focus:border-orange-500"
        }`}
        {...props}
      />

      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}