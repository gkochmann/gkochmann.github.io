interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <span className={`cc-logo-mark ${className}`} aria-hidden="true">
      <img src="/codecounsel-logo.svg" alt="" />
    </span>
  );
}
