declare global {
  interface WebApp {
    lockOrientation: () => void;
    unlockOrientation: () => void;
    onEvent<K extends keyof WebAppEventsMap>(
      event: K,
      callback: WebAppEventsMap[K],
    ): void;
    offEvent<K extends keyof WebAppEventsMap>(
      event: K,
      callback: WebAppEventsMap[K],
    ): void;
  }

  interface WebAppEventsMap {
    activated: () => void;
    deactivated: () => void;
  }
}

const OrientationLock = () => {
  const isSupported = typeof screen.orientation !== "undefined";

  const lock = () => Telegram?.WebApp?.lockOrientation?.();
  const unlock = () => Telegram?.WebApp?.unlockOrientation?.();

  const check = () => {
    if (!Telegram?.WebApp?.platform) return;

    const isPortrait = screen.orientation?.type?.startsWith("portrait") ?? true;

    if (isPortrait) {
      lock();
    } else {
      unlock();
    }
  };

  const enableListeners = () => {
    if (!isSupported) return;
    window.addEventListener("orientationchange", check);
    Telegram?.WebApp?.onEvent("activated", check);
    Telegram?.WebApp?.onEvent("deactivated", unlock);
  };

  const disableListeners = () => {
    if (!isSupported) return;
    window.removeEventListener("orientationchange", check);
    Telegram?.WebApp?.offEvent("activated", check);
    Telegram?.WebApp?.offEvent("deactivated", unlock);
  };

  const init = () => {
    check();
    enableListeners();
  };

  return { init, disableListeners };
};

export default OrientationLock;
