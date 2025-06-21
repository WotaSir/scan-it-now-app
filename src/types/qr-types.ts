
export type QRType = 'url' | 'text' | 'contact' | 'phone' | 'email' | 'sms' | 'wifi' | 'event' | 'location' | 'social';

export interface QRData {
  type: QRType;
  content: string;
  customization: QRCustomization;
}

export interface QRCustomization {
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  logo?: string;
  pattern: 'square' | 'circle' | 'rounded';
}

export interface ContactData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  url: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EventData {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  query: string;
}
