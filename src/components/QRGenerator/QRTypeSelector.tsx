
import React from 'react';
import { QRType } from '@/types/qr-types';
import { Button } from '@/components/ui/button';
import { Globe, MessageSquare, User, Phone, Mail, MessageCircle, Wifi, Calendar, MapPin, Share2 } from 'lucide-react';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onTypeChange: (type: QRType) => void;
}

const qrTypes = [
  { type: 'url' as QRType, label: 'URL', icon: Globe },
  { type: 'text' as QRType, label: 'Text', icon: MessageSquare },
  { type: 'contact' as QRType, label: 'Contact', icon: User },
  { type: 'phone' as QRType, label: 'Phone', icon: Phone },
  { type: 'email' as QRType, label: 'Email', icon: Mail },
  { type: 'sms' as QRType, label: 'SMS', icon: MessageCircle },
  { type: 'wifi' as QRType, label: 'WiFi', icon: Wifi },
  { type: 'event' as QRType, label: 'Event', icon: Calendar },
  { type: 'location' as QRType, label: 'Location', icon: MapPin },
  { type: 'social' as QRType, label: 'Social', icon: Share2 }
];

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
      {qrTypes.map(({ type, label, icon: Icon }) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "outline"}
          onClick={() => onTypeChange(type)}
          className="flex flex-col items-center gap-2 p-4 h-auto"
        >
          <Icon className="h-5 w-5" />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
};
