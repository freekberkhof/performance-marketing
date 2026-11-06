import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "outline";
type Size = "md" | "sm";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  iconOnly?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
  };

type CutButtonProps = ButtonProps | AnchorProps;

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wide transition-colors duration-200 focus-ring";

const SIZES: Record<
  Size,
  { box: string; pad: string; text: string; radius: string; inner: string }
> = {
  md: {
    box: "h-10",
    pad: "px-5",
    text: "text-sm",
    radius: "rounded-[4px]",
    inner: "rounded-[4px]",
  },
  sm: {
    box: "h-9",
    pad: "px-3.5",
    text: "text-[13px]",
    radius: "rounded-[4px]",
    inner: "rounded-[4px]",
  },
};

export function CutButton({
  variant = "solid",
  size: sizeName = "md",
  iconOnly = false,
  fullWidth = false,
  className = "",
  children,
  ...props
}: CutButtonProps): ReactNode {
  const s = SIZES[sizeName];
  const isAnchor = "href" in props && props.href !== undefined;

  if (variant === "solid") {
    const size = iconOnly
      ? `${s.box} aspect-square`
      : `${s.box} ${s.pad} ${fullWidth ? "w-full" : ""}`;
    const cls = `${BASE} ${s.text} ${s.radius} ${size} bg-foreground text-background hover:bg-foreground/85 ${className}`;

    if (isAnchor) {
      const { href, ...rest } = props as AnchorProps;
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <button className={cls} {...(props as ButtonProps)}>
        {children}
      </button>
    );
  }

  const wrapperSize = iconOnly
    ? `${s.box} aspect-square`
    : `${s.box} ${fullWidth ? "w-full" : ""}`;
  const wrapper = `inline-flex ${wrapperSize} ${s.radius} bg-border p-px ${className}`;
  const innerSize = iconOnly ? "w-full" : `flex-1 ${s.pad}`;
  const inner = `${BASE} ${s.text} ${s.inner} h-full ${innerSize} bg-background text-foreground hover:bg-muted`;

  if (isAnchor) {
    const { href, ...rest } = props as AnchorProps;
    return (
      <span className={wrapper}>
        <a href={href} className={inner} {...rest}>
          {children}
        </a>
      </span>
    );
  }
  return (
    <span className={wrapper}>
      <button className={inner} {...(props as ButtonProps)}>
        {children}
      </button>
    </span>
  );
}
