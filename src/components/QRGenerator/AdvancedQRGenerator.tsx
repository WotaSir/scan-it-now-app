
import React, { useState, useMemo, useEffect } from 'react';
import { QRType, QRCustomization } from '@/types/qr-types';
import { QRTypeSelector } from './QRTypeSelector';
import { QRInputForm } from './QRInputForm';
import { QRCustomizationPanel } from './QRCustomization';
import { QRPreview } from './QRPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  generateURLQR, 
  generateContactQR, 
  generatePhoneQR, 
  generateEmailQR, 
  generateSMSQR, 
  generateWiFiQR, 
  generateEventQR, 
  generateLocationQR 
} from '@/utils/qr-generators';

interface AdvancedQRGeneratorProps {
  initialContent?: string;
}

export const AdvancedQRGenerator: React.FC<AdvancedQRGeneratorProps> = ({ initialContent }) => {
  const [selectedType, setSelectedType] = useState<QRType>('url');
  const [formData, setFormData] = useState<any>({});
  const [customization, setCustomization] = useState<QRCustomization>({
    size: 200,
    errorCorrectionLevel: 'M',
    margin: 2,
    color: {
      dark: '#1f2937',
      light: '#ffffff'
    },
    pattern: 'square'
  });

  // Handle initial content from scanner
  useEffect(() => {
    if (initialContent) {
      // Try to detect QR type and populate form
      if (initialContent.startsWith('http') || initialContent.startsWith('www')) {
        setSelectedType('url');
        setFormData({ url: initialContent });
      } else if (initialContent.startsWith('tel:')) {
        setSelectedType('phone');
        setFormData({ phone: initialContent.replace('tel:', '') });
      } else if (initialContent.startsWith('mailto:')) {
        setSelectedType('email');
        setFormData({ email: initialContent.replace('mailto:', '') });
      } else if (initialContent.startsWith('WIFI:')) {
        setSelectedType('wifi');
        // Parse WiFi QR format
        const parts = initialContent.split(';');
        const wifiData: any = {};
        parts.forEach(part => {
          if (part.startsWith('S:')) wifiData.ssid = part.substring(2);
          if (part.startsWith('P:')) wifiData.password = part.substring(2);
          if (part.startsWith('T:')) wifiData.security = part.substring(2);
        });
        setFormData(wifiData);
      } else {
        setSelectedType('text');
        setFormData({ text: initialContent });
      }
    }
  }, [initialContent]);

  const qrContent = useMemo(() => {
    try {
      switch (selectedType) {
        case 'url':
          return formData.url ? generateURLQR(formData.url) : '';
        case 'text':
          return formData.text || '';
        case 'contact':
          return generateContactQR(formData);
        case 'phone':
          return formData.phone ? generatePhoneQR(formData.phone) : '';
        case 'email':
          return formData.email ? generateEmailQR(formData.email, formData.subject, formData.body) : '';
        case 'sms':
          return formData.phone ? generateSMSQR(formData.phone, formData.message) : '';
        case 'wifi':
          return formData.ssid ? generateWiFiQR(formData) : '';
        case 'event':
          return formData.title ? generateEventQR(formData) : '';
        case 'location':
          return generateLocationQR(formData);
        case 'social':
          const platforms = {
            twitter: 'https://twitter.com/',
            facebook: 'https://facebook.com/',
            instagram: 'https://instagram.com/',
            linkedin: 'https://linkedin.com/in/',
            youtube: 'https://youtube.com/@'
          };
          return formData.username ? 
            `${platforms[formData.platform as keyof typeof platforms] || platforms.twitter}${formData.username.replace('@', '')}` : '';
        default:
          return '';
      }
    } catch (error) {
      console.error('Error generating QR content:', error);
      return '';
    }
  }, [selectedType, formData]);

  const handleTypeChange = (type: QRType) => {
    setSelectedType(type);
    setFormData({});
  };

  const qrData = {
    type: selectedType,
    content: qrContent,
    customization,
  };

  return (
    <div className="space-y-8">
      <QRTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <Card className="lg:col-span-1 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <QRInputForm 
              type={selectedType} 
              data={formData} 
              onChange={setFormData} 
            />
          </CardContent>
        </Card>

        {/* Customization Panel */}
        <Card className="lg:col-span-1 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <QRCustomizationPanel 
              customization={customization} 
              onChange={setCustomization} 
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="lg:col-span-1 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Preview & Download</CardTitle>
          </CardHeader>
          <CardContent>
            <QRPreview 
              content={qrContent} 
              customization={customization}
              qrData={qrData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
