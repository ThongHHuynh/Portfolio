import { useEffect } from "react";

const SITE_NAME = "Thong Huynh";

/**
 * Keeps the document title and meta description in step with the route.
 * Without this every page would share index.html's tags, which hurts both
 * browser history and anything that scrapes the page.
 */
function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  }, [title]);

  useEffect(() => {
    if (!description) {
      return;
    }

    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? null;

    meta?.setAttribute("content", description);

    return () => {
      if (meta && previous !== null) {
        meta.setAttribute("content", previous);
      }
    };
  }, [description]);
}

export default usePageTitle;
