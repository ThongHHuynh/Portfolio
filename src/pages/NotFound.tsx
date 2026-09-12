import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import "./NotFound.css";

function NotFound() {
  usePageTitle("Page not found");

  return (
    <div className="page not-found">
      <div className="shell not-found-inner">
        <p className="eyebrow">404</p>
        <h1>That page doesn't exist.</h1>
        <p className="lead">
          The link may be out of date, or the page may have moved. Here's the way
          back.
        </p>
        <div className="not-found-actions">
          <Link className="button" to="/">
            Back home
          </Link>
          <Link className="button button--ghost" to="/projects">
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
