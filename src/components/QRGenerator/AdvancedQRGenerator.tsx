
import React, { useState, useMemo } from 'react';
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

export const AdvancedQRGenerator: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Advanced QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create professional QR codes for any purpose with extensive customization options
          </p>
        </div>

        <QRTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <Card className="lg:col-span-1">
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
          <Card className="lg:col-span-1">
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
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <QRPreview 
                content={qrContent} 
                customization={customization} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
