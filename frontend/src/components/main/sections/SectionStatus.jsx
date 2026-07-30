function SectionStatus({ message, onRetry }) {
  return (
    <div className="mn-section-status" role="status">
      <p>{message}</p>
      {onRetry && (
        <button className="mn-btn-2" onClick={onRetry} type="button">
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

export default SectionStatus;
