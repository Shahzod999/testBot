import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { trackEvent, resetAnalytics } from "../app/features/analyticsSlice";
import { useUpdateAnalyticsMutation } from "../app/api/companySlice";

const useAnalyticsTracker = (companyId: string) => {
  const dispatch = useDispatch();
  const analyticsData = useSelector((state: RootState) => state.analytics);
  const [updateAnalytics] = useUpdateAnalyticsMutation();
  const timeoutRef = useRef<any>(null);

  const track = (event: keyof typeof analyticsData) => {
    dispatch(trackEvent({ event }));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      sendAnalytics();
    }, 10_000);
  };

  const sendAnalytics = () => {
    if (!companyId) return;

    updateAnalytics({ company_id: companyId, data: analyticsData })
      .unwrap()
      .then(() => {
        dispatch(resetAnalytics());
      })
      .catch((error) => console.error("Ошибка отправки аналитики:", error));
  };

  useEffect(() => {
    const handleUnload = () => {
      if (
        !companyId ||
        Object.values(analyticsData).every((count) => count === 0)
      )
        return;

      navigator.sendBeacon(
        `/delivery/bot/analytic/${companyId}`,
        JSON.stringify(analyticsData),
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [analyticsData, companyId]);

  return { track };
};

export default useAnalyticsTracker;
