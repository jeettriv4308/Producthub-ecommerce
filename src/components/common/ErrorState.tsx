import "./ErrorState.css";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      className="error-state"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="error-state-icon"
        aria-hidden="true"
      >
        !
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          className="error-state-btn"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </section>
  );
}
