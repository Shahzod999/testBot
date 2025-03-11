import { useEffect, useRef } from "react";
import { RootState } from "../app/store";
import {
  trackEvent,
  resetAnalytics,
  AnalyticsState,
} from "../app/features/analyticsSlice";
import { useUpdateAnalyticsMutation } from "../app/api/companySlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useAnalyticsTracker = (companyId: string) => {
  const dispatch = useAppDispatch();
  const analyticsData = useAppSelector((state: RootState) => state.analytics);
  const [updateAnalytics] = useUpdateAnalyticsMutation();
  const timeoutRef = useRef<any>(null);

  const track = (event: keyof AnalyticsState) => {
    dispatch(trackEvent({ event }));

    const updatedAnalytics = {
      ...analyticsData,
      [event]: (analyticsData[event] || 0) + 1,
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      sendAnalytics(updatedAnalytics);
    }, 10_00);
  };

  const sendAnalytics = async (updatedData: AnalyticsState) => {
    if (!companyId) return;

    try {
      let res = await updateAnalytics({
        company_id: companyId,
        data: updatedData,
      }).unwrap();
      console.log(
        {
          company_id: companyId,
          data: updatedData,
        },
        "analytics",
      );

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
