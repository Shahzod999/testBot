export const hapticVibration = (
  type: "error" | "success" | "warning",
  style: "light" | "medium" | "heavy" | "rigid" | "soft",
) => {
  const webApp = window.Telegram.WebApp;
  console.log(type);
  if (webApp && webApp.HapticFeedback) {
    webApp.HapticFeedback.impactOccurred(style);
    // webApp.HapticFeedback.notificationOccurred(type);
  } else {
    console.warn("Telegram WebApp HapticFeedback is not available.");
  }
};
