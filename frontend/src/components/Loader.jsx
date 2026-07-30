import { useEffect, useState } from "react";
import loaderImage from "../assets/img/logo/loader.png";

function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideLoader = () => setIsVisible(false);

    if (document.readyState === "complete") {
      const timeoutId = window.setTimeout(hideLoader, 150);
      return () => window.clearTimeout(timeoutId);
    }

    window.addEventListener("load", hideLoader, { once: true });
    return () => window.removeEventListener("load", hideLoader);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div id="mn-overlay">
      <div className="loader">
        <img src={loaderImage} alt="loader" />
        <span className="shape"></span>
      </div>
    </div>
  );
}
export default Loader;
