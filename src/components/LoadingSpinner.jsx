// The spinner itself is drawn by CSS (.status-loading::before).
export default function LoadingSpinner({ message }) {
  return <p className="status status-loading">{message}</p>;
}