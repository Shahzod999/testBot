export const hapticVibration = (
  style: "light" | "medium" | "heavy" | "rigid" | "soft",
) => {
  const webApp = window.Telegram.WebApp;

  if (webApp && webApp.HapticFeedback) {
    webApp.HapticFeedback.impactOccurred(style);
  } else {
    console.warn("Telegram WebApp HapticFeedback is not available.");
  }
};

export const hapticVibrationByType = (
  type: "error" | "success" | "warning",
) => {
  const webApp = window.Telegram.WebApp;

  if (webApp && webApp.HapticFeedback) {
    webApp.HapticFeedback.notificationOccurred(type);
  } else {
    console.warn("Telegram WebApp HapticFeedback is not available.");
  }
};
