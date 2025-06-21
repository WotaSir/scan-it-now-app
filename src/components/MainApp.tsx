
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdvancedQRGenerator } from './QRGenerator/AdvancedQRGenerator';
import { QRScanner } from './QRScanner/QRScanner';
import { QRDashboard } from './QRDashboard/QRDashboard';
import { useTheme } from '@/contexts/ThemeContext';
import { QrCode, Camera, BarChart3, Moon, Sun } from 'lucide-react';

type TabType = 'generator' | 'scanner' | 'dashboard';

export const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [scannedContent, setScannedContent] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleScanSuccess = (result: string) => {
    setScannedContent(result);
    setActiveTab('generator');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-300">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QR Master Pro
            </h1>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional QR code generator with advanced features, scanning capabilities, and analytics
          </p>
        </div>

        {/* Navigation */}
        <Card className="mb-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={() => setActiveTab('generator')}
                variant={activeTab === 'generator' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                Generator
              </Button>
              <Button
                onClick={() => setActiveTab('scanner')}
                variant={activeTab === 'scanner' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Scanner
              </Button>
              <Button
                onClick={() => setActiveTab('dashboard')}
                variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                My QR Codes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'generator' && (
            <AdvancedQRGenerator initialContent={scannedContent} />
          )}
          {activeTab === 'scanner' && (
            <div className="max-w-2xl mx-auto">
              <QRScanner onScanSuccess={handleScanSuccess} />
            </div>
          )}
          {activeTab === 'dashboard' && <QRDashboard />}
        </div>
      </div>
    </div>
  );
};
