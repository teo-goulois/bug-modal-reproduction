"use client";

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { Loader } from "./loader";
import { focusStyles } from "./primitive";

const buttonStyles = tv({
  extend: focusStyles,
  base: [
    "kbt32x relative inline-flex items-center justify-center gap-x-2 border font-medium",
    "forced-colors:[--button-icon:ButtonText] forced-colors:data-hovered:[--button-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60",
    "*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0",
  ],
  variants: {
    intent: {
      primary: [
        "outline-primary [--btn-bg:theme(--color-primary/95%)] [--btn-border:var(--color-primary)] [--btn-fg:var(--color-primary-fg)]",
        "[--btn-bg-hovered:theme(--color-primary/87%)] [--btn-border-hovered:theme(--color-primary/87%)]",
        "",
      ],
      secondary: [
        "[--btn-bg:theme(--color-secondary/95%)] [--btn-border:theme(--color-secondary-fg/10%)] [--btn-fg:var(--color-secondary-fg)] dark:[--btn-bg:theme(--color-secondary/85%)] dark:[--btn-border:theme(--color-secondary-fg/7%)]",
        "[--btn-bg-hovered:color-mix(in_oklab,var(--color-secondary)_60%,white_20%)] dark:[--btn-bg-hovered:color-mix(in_oklab,var(--color-secondary)_96%,white_4%)]",
        "inset-shadow-white/15 data-hovered:inset-shadow-white/20 data-pressed:inset-shadow-white/15",
      ],
      warning: [
        "[--btn-warning:theme(--color-warning/97%)]",
        "[--btn-warning-hovered:color-mix(in_oklab,var(--color-warning)_85%,white_15%)]",
        "dark:[--btn-warning-hovered:color-mix(in_oklab,var(--color-warning)_90%,white_10%)]",
        "outline-warning [--btn-bg:var(--btn-warning)] [--btn-border:var(--btn-warning)] [--btn-fg:var(--color-warning-fg)]",
        "[--btn-bg-hovered:var(--btn-warning-hovered)] [--btn-border-hovered:var(--btn-warning-hovered)]",
        "inset-shadow-white/25 data-hovered:inset-shadow-white/30 data-pressed:inset-shadow-white/25",
      ],
      danger: [
        "outline-danger [--btn-bg:var(--color-danger)] [--btn-border:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] dark:[--btn-bg:var(--color-danger)]",
        "[--btn-danger-hovered:color-mix(in_oklab,var(--color-danger)_93%,white_7%)]",
        "dark:[--btn-danger-hovered:color-mix(in_oklab,var(--color-danger)_96%,white_4%)]",
        "[--btn-bg-hovered:var(--btn-danger-hovered)] [--btn-border-hovered:var(--btn-danger-hovered)]",
        "inset-shadow-danger-fg/30 data-hovered:inset-shadow-danger-fg/35 data-pressed:inset-shadow-danger-fg/30",
      ],
      dark: [
        "outline-primary  [--btn-bg:theme(--color-gray-800/95%)] [--btn-border:var(--color-gray-800)] [--btn-fg:var(--color-bg)]",
        "[--btn-bg-hovered:theme(--color-gray-800/87%)] [--btn-border-hovered:theme(--color-gray-800/87%)]",
      ],
    },
    appearance: {
      solid: [
        "inset-ring-0 ",
        "inset-ring-(--btn-border) border-(--btn-border) bg-(--btn-bg) text-(--btn-fg)",
        "data-hovered:bg-(--btn-bg-hovered) data-hovered:ring-(--btn-border-hovered) data-hovered:*:data-[slot=icon]:text-current/90",
        "data-pressed:bg-(--btn-bg) data-pressed:*:data-[slot=icon]:text-current",
      ],
      light: [
        "bg-secondary data-hovered:bg-secondary/95 data-pressed:bg-secondary/95",
      ],
      outline: ["border data-hovered:bg-secondary data-pressed:bg-secondary"],
      plain: [
        "border-transparent data-hovered:bg-secondary data-pressed:bg-secondary",
      ],
      unstyled: [""],
    },
    size: {
      "extra-small":
        "h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 lg:text-[0.800rem]/4",
      small: "h-9 px-3.5 text-sm/5 sm:text-sm/5",
      medium: "h-10 px-4 text-base sm:text-sm/6",
      large:
        "h-11 px-4.5 text-base *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5 lg:text-base/7",
      "square-petite": "size-9 shrink-0 **:data-[slot=icon]:text-current",
      "square-medium": "size-10 shrink-0 **:data-[slot=icon]:text-current",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
    isDisabled: {
      false: "cursor-pointer forced-colors:data-disabled:text-[GrayText]",
      true: "inset-shadow-none cursor-default border-0 opacity-50 ring-0 dark:inset-ring-0 forced-colors:data-disabled:text-[GrayText]",
    },
    isPending: {
      true: "cursor-default opacity-50",
    },
  },
  defaultVariants: {
    intent: "primary",
    appearance: "solid",
    size: "medium",
    shape: "square",
  },
  compoundVariants: [
    {
      isDisabled: true,
      intent: "dark",
      appearance: "solid",
      className: ["bg-gray-100 text-muted-fg opacity-100"],
    },
    {
      appearance: "unstyled",
      intent: ["primary", "secondary", "warning", "danger", "dark"],
      shape: ["square", "circle"],
      size: [
        "extra-small",
        "small",
        "medium",
        "large",
        "square-petite",
        "square-medium",
      ],
      className: ["rounded-none", "border-0"],
    },
  ],
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  intent,
  appearance,
  size,
  shape,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          appearance,
          size,
          shape,
          className,
        })
      )}
    >
      {(values) => {
        const children =
          typeof props.children === "function"
            ? props.children(values)
            : props.children;
        if (props.isPending) {
          const childrenArray = React.Children.toArray(children);
          // return children if it's a string or if it has more than 1 child
          if (typeof children === "string" || childrenArray.length > 1) {
            return (
              <>
                <Loader variant="spin" />
                {children}
              </>
            );
          }
          // else it mean it's a single SVG element
          return (
            <>
              <Loader variant="spin" />
            </>
          );
        }

        return children;
      }}
    </ButtonPrimitive>
  );
};

export type { ButtonProps };
export { Button, ButtonPrimitive };
