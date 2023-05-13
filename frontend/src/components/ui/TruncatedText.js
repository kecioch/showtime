const TruncatedText = ({ children, maxLength = 200, className }) => {
  let content = children;

  if (children.length > maxLength) {
    content = children.slice(0, maxLength).trim() + "...";
  }
  return <p className={className}>{content}</p>;
};

export default TruncatedText;
