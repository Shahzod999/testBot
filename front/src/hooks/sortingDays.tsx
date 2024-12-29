import { useMemo } from "react";
import { WorkingHours } from "../app/types/companyType";

const useSortedWorkingHours = (workingHours: WorkingHours): WorkingHours => {
  return useMemo(() => {
    if (!workingHours) return {};

    const daysOrder: (keyof WorkingHours)[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return Object.keys(workingHours)
      .sort((a, b) => daysOrder.indexOf(a as keyof WorkingHours) - daysOrder.indexOf(b as keyof WorkingHours))
      .reduce((sortedObj, day) => {
        sortedObj[day as keyof WorkingHours] = workingHours[day as keyof WorkingHours];
        return sortedObj;
      }, {} as WorkingHours);
  }, [workingHours]);
};


export default useSortedWorkingHours;
