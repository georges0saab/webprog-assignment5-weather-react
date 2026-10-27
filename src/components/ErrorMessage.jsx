export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error">
      <p className="status status-error">{message}</p>
      <button type="button" className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}