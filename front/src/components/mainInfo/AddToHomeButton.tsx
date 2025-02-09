import { useEffect, useState } from "react";

function AddToHomeButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      // Останавливаем показ баннера по умолчанию
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleAddToHomeScreen = async () => {
    if (!deferredPrompt) return;

    // Показываем нативное окно установки
    deferredPrompt.prompt();

    // Ждём, пока пользователь выберет: установить или отклонить
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("Пользователь установил приложение на главный экран");
    } else {
      console.log("Пользователь отказался");
    }
    // Чтобы нельзя было вызвать повторно
    setDeferredPrompt(null);
  };

  return (
    <div>
      <button onClick={handleAddToHomeScreen}>
        <h1>Мое PWA приложение</h1>
        Добавить на экран (Android Chrome)
      </button>
    </div>
  );
}

export default AddToHomeButton;
