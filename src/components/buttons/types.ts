interface PrimaryButtonProps {
  title: string;
  textClassName?: string;
  onClick?: () => void;
  href?: string;
  newTab?: boolean;
}

interface ButtonProps {
  textClassName?: string;
  onClick?: () => void;
}
interface HamburgerButtonProps {
  textClassName?: string;
  onClick?: () => void;
  clicked: boolean;
}

export type {PrimaryButtonProps, ButtonProps, HamburgerButtonProps};
