import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  trackEvent,
  resetAnalytics,
  AnalyticsState,
} from "../app/features/analyticsSlice";
import { useUpdateAnalyticsMutation } from "../app/api/companySlice";

const useAnalyticsTracker = (companyId: string) => {
  const dispatch = useDispatch();
  const analyticsData = useSelector((state: RootState) => state.analytics);
  const [updateAnalytics] = useUpdateAnalyticsMutation();
  const timeoutRef = useRef<any>(null);

  const track = (event: keyof AnalyticsState) => {
    dispatch(trackEvent({ event }));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      sendAnalytics();
    }, 10_00);
  };

  const sendAnalytics = async () => {
    if (!companyId) return;

    try {
      let res = await updateAnalytics({
        company_id: companyId,
        data: analyticsData,
      }).unwrap();
      console.log(res);

      if (res?.status == "success") {
        dispatch(resetAnalytics());
      }
    } catch (error) {
      console.error("Ошибка отправки аналитики:", error);
    }
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
