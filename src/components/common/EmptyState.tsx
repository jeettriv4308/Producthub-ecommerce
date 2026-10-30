
import "./EmptyState.css";

type EmptyStateProps = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        ◇
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
