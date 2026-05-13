import clsx from "clsx";

const variants = {
  primary: "bg-orange-600 text-white hover:bg-orange-700",
  secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
  outline: "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}