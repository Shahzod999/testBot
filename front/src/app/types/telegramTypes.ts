export interface TelegramTypes {
  initData: string;
  initDataUnsafe: InitDataUnsafe;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  safeAreaInset: SafeAreaInset;
  contentSafeAreaInset: ContentSafeAreaInset;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  isFullscreen: boolean;
  isOrientationLocked: boolean;
  isActive: boolean;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;
  BackButton: BackButton;
  MainButton: MainButton;
  SecondaryButton: SecondaryButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  BiometricManager: BiometricManager;
  Accelerometer: Accelerometer;
  DeviceOrientation: DeviceOrientation;
  Gyroscope: Gyroscope;
  LocationManager: any;
}

export interface InitDataUnsafe {
  user: User;
  chat_instance: string;
  chat_type: string;
  start_param: string;
  auth_date: string;
  signature: string;
  hash: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
  photo_url: string;
}

export interface ThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
  header_bg_color: string;
  accent_text_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  subtitle_text_color: string;
  destructive_text_color: string;
}

export interface SafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ContentSafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface BackButton {
  isVisible: boolean;
}

export interface MainButton {
  type: string;
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isProgressVisible: boolean;
  isActive: boolean;
  hasShineEffect: boolean;
}

export interface SecondaryButton {
  type: string;
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isProgressVisible: boolean;
  isActive: boolean;
  hasShineEffect: boolean;
  position: string;
}

export interface SettingsButton {
  isVisible: boolean;
}

export interface HapticFeedback {}

export interface CloudStorage {}

export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: string;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;
}

export interface Accelerometer {
  isStarted: boolean;
  x: any;
  y: any;
  z: any;
}

export interface DeviceOrientation {
  isStarted: boolean;
  absolute: boolean;
  alpha: any;
  beta: any;
  gamma: any;
}

export interface Gyroscope {
  isStarted: boolean;
  x: any;
  y: any;
  z: any;
}

export interface LocationManager {
  isInited: boolean;
  isLocationAvailable: boolean;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  getLocation: () => void;
}
