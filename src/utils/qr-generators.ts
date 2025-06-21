
import { ContactData, WiFiData, EventData, LocationData } from '@/types/qr-types';

export const generateURLQR = (url: string): string => {
  return url.startsWith('http') ? url : `https://${url}`;
};

export const generateContactQR = (contact: ContactData): string => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.url}
END:VCARD`;
};

export const generatePhoneQR = (phone: string): string => {
  return `tel:${phone}`;
};

export const generateEmailQR = (email: string, subject?: string, body?: string): string => {
  let result = `mailto:${email}`;
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length > 0) result += `?${params.join('&')}`;
  return result;
};

export const generateSMSQR = (phone: string, message?: string): string => {
  return `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
};

export const generateWiFiQR = (wifi: WiFiData): string => {
  return `WIFI:T:${wifi.security};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden ? 'true' : 'false'};;`;
};

export const generateEventQR = (event: EventData): string => {
  return `BEGIN:VEVENT
DTSTART:${event.startDate.replace(/[-:]/g, '')}00Z
DTEND:${event.endDate.replace(/[-:]/g, '')}00Z
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT`;
};

export const generateLocationQR = (location: LocationData): string => {
  if (location.latitude && location.longitude) {
    return `geo:${location.latitude},${location.longitude}`;
  }
  return `geo:0,0?q=${encodeURIComponent(location.query)}`;
};
