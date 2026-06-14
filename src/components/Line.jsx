import "./Line.css";

function Line({ size = "medium" }) {
  return <div className={`section-line section-line--${size}`} aria-hidden="true" />;
}

export default Line;