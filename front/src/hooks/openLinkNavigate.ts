export const openLinkNavigate = (url: string) => {
  try {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(url, { try_instant_view: true });
    } else {
      window.open(url, "_blank");
    }
  } catch (error) {
    console.error("Ошибка при открытии ссылки:", error);
    alert("Не удалось открыть ссылку. Попробуйте еще раз.");
  }
};
