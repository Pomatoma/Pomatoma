import { useEffect } from "react";

export default function useBeforeUnload(message = "페이지를 떠나시겠습니까?") {
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [message]);
}
