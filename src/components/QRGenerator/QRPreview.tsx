
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { QRCustomization } from '@/types/qr-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Image, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveQRCode } from '@/utils/storage';

interface QRPreviewProps {
  content: string;
  customization: QRCustomization;
  qrData?: any;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ content, customization, qrData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [saveName, setSaveName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!content || !canvasRef.current) return;

    const generateQR = async () => {
      try {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Generate QR code
        await QRCode.toCanvas(canvas, content, {
          width: customization.size,
          margin: customization.margin,
          errorCorrectionLevel: customization.errorCorrectionLevel,
          color: {
            dark: customization.color.dark,
            light: customization.color.light
          }
        });

        // Add logo if present
        if (logoImage) {
          const logoSize = customization.size * 0.15;
          const logoX = (customization.size - logoSize) / 2;
          const logoY = (customization.size - logoSize) / 2;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
          ctx.restore();
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [content, customization, logoImage]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => setLogoImage(img);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Logo Uploaded!",
        description: "Logo has been added to your QR code.",
      });
    }
  };

  const downloadQR = (format: 'png' | 'pdf') => {
    if (!canvasRef.current) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `${saveName || 'qrcode'}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    } else if (format === 'pdf') {
      const pdf = new jsPDF();
      const imgData = canvasRef.current.toDataURL('image/png');
      const imgWidth = 100;
      const imgHeight = 100;
      const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
      const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`${saveName || 'qrcode'}.pdf`);
    }
    
    toast({
      title: "Success!",
      description: `QR code downloaded as ${format.toUpperCase()}.`,
    });
  };

  const saveQR = () => {
    if (!content || !qrData) return;
    
    const saved = saveQRCode({
      data: { ...qrData, customization },
      content,
      name: saveName || undefined,
    });
    
    toast({
      title: "QR Code Saved!",
      description: "QR code has been saved to your collection.",
    });
    
    setSaveName('');
  };

  if (!content) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600">
        <p className="text-gray-500">Enter content to generate QR code</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <canvas
        ref={canvasRef}
        className="mx-auto rounded-lg shadow-lg border bg-white"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
        }}
      />
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Name your QR code (optional)"
            className="flex-1"
          />
          <Button onClick={saveQR} variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        
        <div className="flex gap-2">
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <Button
            onClick={() => logoInputRef.current?.click()}
            variant="outline"
            size="sm"
          >
            <Image className="h-4 w-4 mr-2" />
            Add Logo
          </Button>
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button onClick={() => downloadQR('png')} size="sm">
            <Download className="h-4 w-4 mr-2" />
            PNG
          </Button>
          <Button onClick={() => downloadQR('pdf')} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
