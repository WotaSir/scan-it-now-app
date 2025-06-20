
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState('200');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRCode = async (inputText: string, qrSize: string) => {
    if (!inputText.trim()) {
      setQrCodeUrl('');
      return;
    }

    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, inputText, {
          width: parseInt(qrSize),
          margin: 2,
          color: {
            dark: '#1f2937',
            light: '#ffffff'
          }
        });
        
        const url = canvas.toDataURL();
        setQrCodeUrl(url);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode(text, size);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [text, size]);

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    link.click();

    toast({
      title: "Success!",
      description: "QR code downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QR Code Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful QR codes instantly. Enter any text, URL, or message and generate a high-quality QR code ready for download.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Generate QR Code</CardTitle>
              <CardDescription>
                Enter the text or URL you want to encode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text-input" className="text-sm font-medium text-gray-700">
                  Text or URL
                </Label>
                <Input
                  id="text-input"
                  placeholder="Enter text, URL, or any message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-12 text-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size-select" className="text-sm font-medium text-gray-700">
                  QR Code Size
                </Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150">Small (150x150)</SelectItem>
                    <SelectItem value="200">Medium (200x200)</SelectItem>
                    <SelectItem value="300">Large (300x300)</SelectItem>
                    <SelectItem value="400">Extra Large (400x400)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {qrCodeUrl && (
                <Button 
                  onClick={downloadQRCode}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download QR Code
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Preview</CardTitle>
              <CardDescription>
                Your QR code will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center min-h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Generating QR code...</p>
                  </div>
                ) : qrCodeUrl ? (
                  <div className="text-center">
                    <canvas
                      ref={canvasRef}
                      className="mx-auto mb-4 rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-500">QR Code generated successfully!</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Enter text above to generate QR code</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Generation</h3>
            <p className="text-gray-600 text-sm">Generate QR codes instantly as you type</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">High Quality</h3>
            <p className="text-gray-600 text-sm">Download crisp, high-resolution PNG files</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Multiple Sizes</h3>
            <p className="text-gray-600 text-sm">Choose from various sizes for different uses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
