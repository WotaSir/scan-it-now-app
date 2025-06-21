
import { QRData } from '@/types/qr-types';

export interface SavedQRCode {
  id: string;
  data: QRData;
  content: string;
  createdAt: string;
  scans: number;
  lastScanned?: string;
  name?: string;
}

const STORAGE_KEY = 'saved-qr-codes';
const ANALYTICS_KEY = 'qr-analytics';

export const saveQRCode = (qrCode: Omit<SavedQRCode, 'id' | 'createdAt' | 'scans'>): SavedQRCode => {
  const savedQRCode: SavedQRCode = {
    ...qrCode,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    scans: 0,
  };

  const saved = getSavedQRCodes();
  saved.push(savedQRCode);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  
  return savedQRCode;
};

export const getSavedQRCodes = (): SavedQRCode[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const deleteQRCode = (id: string): void => {
  const saved = getSavedQRCodes().filter(qr => qr.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
};

export const updateQRCode = (id: string, updates: Partial<SavedQRCode>): void => {
  const saved = getSavedQRCodes();
  const index = saved.findIndex(qr => qr.id === id);
  if (index !== -1) {
    saved[index] = { ...saved[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
};

export const recordScan = (id: string): void => {
  const saved = getSavedQRCodes();
  const qr = saved.find(qr => qr.id === id);
  if (qr) {
    qr.scans += 1;
    qr.lastScanned = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
};
