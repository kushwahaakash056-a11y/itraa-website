import { Link } from "@tanstack/react-router";

type BrandLogoProps = {
  className?: string;
  onClick?: () => void;
};

export function BrandLogo({ className = "h-16 w-auto", onClick }: BrandLogoProps) {
  return (
    <Link to="/" aria-label="ITRAA home" onClick={onClick} className="inline-flex shrink-0">
      <img
        src="/itraa-logo-light.png"
        alt="ITRAA — Pure Essence. Lasting Memories."
        className={`${className} object-contain dark:hidden`}
      />
      <img
        src="/itraa-logo-dark.png"
        alt="ITRAA — Pure Essence. Lasting Memories."
        className={`${className} hidden object-contain dark:block`}
      />
    </Link>
  );
}
