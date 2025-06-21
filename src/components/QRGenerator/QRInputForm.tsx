
import React from 'react';
import { QRType, ContactData, WiFiData, EventData, LocationData } from '@/types/qr-types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface QRInputFormProps {
  type: QRType;
  data: any;
  onChange: (data: any) => void;
}

export const QRInputForm: React.FC<QRInputFormProps> = ({ type, data, onChange }) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const renderForm = () => {
    switch (type) {
      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={data.url || ''}
                onChange={(e) => updateField('url', e.target.value)}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                placeholder="Enter your text here..."
                value={data.text || ''}
                onChange={(e) => updateField('text', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={data.firstName || ''}
                  onChange={(e) => updateField('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={data.lastName || ''}
                  onChange={(e) => updateField('lastName', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={data.organization || ''}
                onChange={(e) => updateField('organization', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="url">Website</Label>
              <Input
                id="url"
                value={data.url || ''}
                onChange={(e) => updateField('url', e.target.value)}
              />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={data.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={data.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject (Optional)</Label>
              <Input
                id="subject"
                value={data.subject || ''}
                onChange={(e) => updateField('subject', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="body">Message (Optional)</Label>
              <Textarea
                id="body"
                value={data.body || ''}
                onChange={(e) => updateField('body', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={data.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={data.message || ''}
                onChange={(e) => updateField('message', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ssid">Network Name (SSID)</Label>
              <Input
                id="ssid"
                value={data.ssid || ''}
                onChange={(e) => updateField('ssid', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password || ''}
                onChange={(e) => updateField('password', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="security">Security Type</Label>
              <Select value={data.security || 'WPA'} onValueChange={(value) => updateField('security', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="hidden"
                checked={data.hidden || false}
                onCheckedChange={(checked) => updateField('hidden', checked)}
              />
              <Label htmlFor="hidden">Hidden Network</Label>
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={data.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date & Time</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={data.startDate || ''}
                  onChange={(e) => updateField('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date & Time</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={data.endDate || ''}
                  onChange={(e) => updateField('endDate', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location || ''}
                onChange={(e) => updateField('location', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  placeholder="40.7128"
                  value={data.latitude || ''}
                  onChange={(e) => updateField('latitude', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  placeholder="-74.0060"
                  value={data.longitude || ''}
                  onChange={(e) => updateField('longitude', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="query">Or Search Query</Label>
              <Input
                id="query"
                placeholder="New York, NY"
                value={data.query || ''}
                onChange={(e) => updateField('query', e.target.value)}
              />
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={data.platform || 'twitter'} onValueChange={(value) => updateField('platform', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="username">Username/Profile</Label>
              <Input
                id="username"
                placeholder="@username"
                value={data.username || ''}
                onChange={(e) => updateField('username', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-4">{renderForm()}</div>;
};
