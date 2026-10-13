import { formatINR, getDiscountPercent } from "@/lib/itraa-data";

export function PriceDisplay({
  oldPrice,
  price,
  prefix,
  size = "sm",
  className = "",
}: {
  oldPrice: number;
  price: number;
  prefix?: string;
  size?: "xs" | "sm" | "lg";
  className?: string;
}) {
  const discount = getDiscountPercent(oldPrice, price);
  const currentClass =
    size === "lg" ? "font-display text-4xl" : size === "xs" ? "text-[10px]" : "text-xs";

  return (
    <span className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      {prefix && <span className="text-muted-foreground">{prefix}</span>}
      <span className={`${currentClass} text-foreground`}>{formatINR(price)}</span>
      <span className="text-[0.82em] text-muted-foreground line-through">
        {formatINR(oldPrice)}
      </span>
      <span className="rounded-full bg-gold/12 px-2 py-0.5 font-button text-[9px] font-medium tracking-[0.08em] text-gold">
        {discount}% OFF
      </span>
    </span>
  );
}
