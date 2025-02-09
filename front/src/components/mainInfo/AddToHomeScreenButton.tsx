import { useEffect, useState } from "react";

const AddToHomeScreenButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true); // Show the button when the prompt is available
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAddToHomeScreen = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("App added to home screen");
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  return (
    isVisible && (
      <button
        onClick={handleAddToHomeScreen}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Add to Home Screen
      </button>
    )
  );
};

export default AddToHomeScreenButton;
