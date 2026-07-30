import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function useApiCollection(endpoint, fallbackMessage) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadItems() {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await axiosInstance.get(endpoint, {
          signal: controller.signal,
        });

        setItems(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setItems([]);
          setErrorMessage(error.response?.data?.message || fallbackMessage);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      controller.abort();
    };
  }, [endpoint, fallbackMessage, reloadKey]);

  return {
    items,
    loading,
    errorMessage,
    retry: () => setReloadKey((currentKey) => currentKey + 1),
  };
}

export default useApiCollection;
