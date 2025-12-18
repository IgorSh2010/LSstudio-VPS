import clsx from "clsx";

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all focus:outline-none disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    primary:
      // сакура-рожевий з делікатним градієнтом
      "text-black bg-accentPrimary hover:bg-accentPrimaryHover active:scale-[0.98] shadow-[0_4px_10px_rgba(43,58,103,0.12)]",

    secondary:
      //легко-приємний сакура-рожевий з затемненим градієнтом
      "border border-[#F2BFA3] text-[#2B3A67] bg-[#FBE9DD] hover:bg-[#F6D3BE] hover:border-[#E89BC6] active:scale-[0.98] shadow-[0_4px_10px_rgba(43,58,103,0.08)]",
    
    ghost:
      // майже невидима, тільки жест
      "text-[#2B3A67] bg-transparent hover:bg-[#F7D4E9]/60 active:scale-[0.98]",

    danger:
      // небезпека без крику — глибокий японський червоний
      "text-white bg-[#B4475A] hover:bg-[#9E3A4B] active:scale-[0.98] shadow-[0_4px_10px_rgba(158,58,75,0.25)]",
    };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
