const ErrorBlock = ({ error }) => {
  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{error.name}</h2>
        <p>{error.code}</p>
      </div>
    </div>
  );
};

export default ErrorBlock