import { useMemo } from "react";

export const useTimeSheetStatus = (trackedHours, totalHours) => {
  const statusInfo = useMemo(() => {
    if (trackedHours === totalHours) {
      return {
        status: "COMPLETED",
        statusClasses: "text-[#03543F] bg-[#DEF7EC]",
        actionTitle: "View",
      };
    } else if (trackedHours > 0) {
      return {
        status: "INCOMPLETE",
        statusClasses: "text-[#723B13] bg-[#FDF6B2]",
        actionTitle: "Update",
      };
    } else {
      return {
        status: "MISSING",
        statusClasses: "text-[#99154B] bg-[#FCE8F3]",
        actionTitle: "Create",
      };
    }
  }, [trackedHours, totalHours]);

  return statusInfo;
};
