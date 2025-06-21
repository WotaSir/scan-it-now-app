
import React from 'react';
import { QRCustomization } from '@/types/qr-types';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QRCustomizationProps {
  customization: QRCustomization;
  onChange: (customization: QRCustomization) => void;
}

export const QRCustomizationPanel: React.FC<QRCustomizationProps> = ({ customization, onChange }) => {
  const updateCustomization = (field: keyof QRCustomization, value: any) => {
    onChange({ ...customization, [field]: value });
  };

  const updateColor = (colorType: 'dark' | 'light', color: string) => {
    onChange({
      ...customization,
      color: { ...customization.color, [colorType]: color }
    });
  };

  return (
    <div className="space-y-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800">Customize QR Code</h3>
      
      {/* Size */}
      <div className="space-y-2">
        <Label>Size: {customization.size}px</Label>
        <Slider
          value={[customization.size]}
          onValueChange={([value]) => updateCustomization('size', value)}
          min={100}
          max={500}
          step={10}
          className="w-full"
        />
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2">
        <Label>Error Correction Level</Label>
        <Select 
          value={customization.errorCorrectionLevel} 
          onValueChange={(value) => updateCustomization('errorCorrectionLevel', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (~7%)</SelectItem>
            <SelectItem value="M">Medium (~15%)</SelectItem>
            <SelectItem value="Q">Quartile (~25%)</SelectItem>
            <SelectItem value="H">High (~30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Margin */}
      <div className="space-y-2">
        <Label>Margin: {customization.margin}</Label>
        <Slider
          value={[customization.margin]}
          onValueChange={([value]) => updateCustomization('margin', value)}
          min={0}
          max={10}
          step={1}
          className="w-full"
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Foreground Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={customization.color.dark}
              onChange={(e) => updateColor('dark', e.target.value)}
              className="w-12 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              value={customization.color.dark}
              onChange={(e) => updateColor('dark', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={customization.color.light}
              onChange={(e) => updateColor('light', e.target.value)}
              className="w-12 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              value={customization.color.light}
              onChange={(e) => updateColor('light', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="space-y-2">
        <Label>Pattern Style</Label>
        <Select 
          value={customization.pattern} 
          onValueChange={(value) => updateCustomization('pattern', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Color Presets */}
      <div className="space-y-2">
        <Label>Color Presets</Label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { dark: '#000000', light: '#ffffff', name: 'Classic' },
            { dark: '#1f2937', light: '#f9fafb', name: 'Modern' },
            { dark: '#7c3aed', light: '#faf5ff', name: 'Purple' },
            { dark: '#dc2626', light: '#fef2f2', name: 'Red' }
          ].map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => updateCustomization('color', { dark: preset.dark, light: preset.light })}
              className="h-8 text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
