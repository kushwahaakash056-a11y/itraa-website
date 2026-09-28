import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  strength?: number;
  onClick?: () => void;
  [key: string]: unknown;
};

/** Magnetic hover wrapper — pulls the element gently toward the cursor. */
export function Magnetic({
  children,
  className,
  as = "button",
  strength = 0.35,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const Comp = motion(as as ElementType);

  return (
    <Comp
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
