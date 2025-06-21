
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QRCustomization } from '@/types/qr-types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRPreviewProps {
  content: string;
  customization: QRCustomization;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ content, customization }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!content || !canvasRef.current) return;

    const generateQR = async () => {
      try {
        await QRCode.toCanvas(canvasRef.current!, content, {
          width: customization.size,
          margin: customization.margin,
          errorCorrectionLevel: customization.errorCorrectionLevel,
          color: {
            dark: customization.color.dark,
            light: customization.color.light
          }
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [content, customization]);

  const downloadQR = (format: 'png' | 'svg') => {
    if (!canvasRef.current) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "Success!",
        description: "QR code downloaded as PNG.",
      });
    }
  };

  if (!content) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">Enter content to generate QR code</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <canvas
        ref={canvasRef}
        className="mx-auto rounded-lg shadow-lg border"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          filter: customization.pattern === 'circle' ? 'none' : undefined
        }}
      />
      
      <div className="flex gap-2 justify-center">
        <Button onClick={() => downloadQR('png')} size="sm">
          <Download className="h-4 w-4 mr-2" />
          PNG
        </Button>
        <Button onClick={() => downloadQR('svg')} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          SVG
        </Button>
      </div>
    </div>
  );
};
