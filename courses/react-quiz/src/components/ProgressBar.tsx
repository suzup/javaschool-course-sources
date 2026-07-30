interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`진행률 ${String(percentage)}%`}
    >
      <div className="progress-bar__fill" style={{ width: `${String(percentage)}%` }} />
    </div>
  );
}
