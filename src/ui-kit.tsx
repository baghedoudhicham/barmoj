import { Link, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";

export type ActionVariant = "primary" | "secondary" | "quiet" | "danger";
export type ActionSize = "regular" | "compact";

export function ActionLink({
  children,
  variant = "primary",
  size = "regular",
  className = "",
  ...props
}: LinkProps & {
  children: ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
}) {
  return (
    <Link
      className={`brkar-action brkar-action--${variant} brkar-action--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "primary",
  size = "regular",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
}) {
  return (
    <button
      className={`brkar-action brkar-action--${variant} brkar-action--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export function LearningSteps({
  steps,
  label,
  className = "",
}: {
  steps: { title: string; detail?: string; state?: "done" | "current" | "upcoming" }[];
  label: string;
  className?: string;
}) {
  return (
    <ol className={`brkar-learning-steps ${className}`.trim()} aria-label={label}>
      {steps.map((step, index) => (
        <li className={`brkar-learning-step is-${step.state || "upcoming"}`} aria-current={step.state === "current" ? "step" : undefined} key={`${index}-${step.title}`}>
          <span className="brkar-learning-step__index" aria-hidden="true">{index + 1}</span>
          <span className="brkar-learning-step__copy">
            <b>{step.title}</b>
            {step.detail && <small>{step.detail}</small>}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ChoiceCard({
  title,
  description,
  selected,
  disabled = false,
  onClick,
}: {
  title: string;
  description?: string;
  selected: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="brkar-choice-card"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="brkar-choice-card__indicator" aria-hidden="true" />
      <span className="brkar-choice-card__copy">
        <b>{title}</b>
        {description && <small>{description}</small>}
      </span>
    </button>
  );
}

export function StatusTag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "learn" | "explore" | "challenge";
}) {
  return <span className={`brkar-status-tag is-${tone}`}>{children}</span>;
}
