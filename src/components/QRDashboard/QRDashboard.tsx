
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SavedQRCode, getSavedQRCodes, deleteQRCode, updateQRCode } from '@/utils/storage';
import { Trash2, Download, Eye, Edit3, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

export const QRDashboard: React.FC = () => {
  const [savedQRs, setSavedQRs] = useState<SavedQRCode[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setSavedQRs(getSavedQRCodes());
  }, []);

  const handleDelete = (id: string) => {
    deleteQRCode(id);
    setSavedQRs(getSavedQRCodes());
    toast({
      title: "QR Code Deleted",
      description: "QR code removed from your collection.",
    });
  };

  const handleDownload = async (qr: SavedQRCode) => {
    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, qr.content, {
        width: qr.data.customization.size,
        margin: qr.data.customization.margin,
        color: qr.data.customization.color,
        errorCorrectionLevel: qr.data.customization.errorCorrectionLevel,
      });
      
      const link = document.createElement('a');
      link.download = `${qr.name || qr.data.type}-qr.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "QR code downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code.",
        variant: "destructive",
      });
    }
  };

  const handleEditName = (qr: SavedQRCode) => {
    setEditingId(qr.id);
    setEditName(qr.name || '');
  };

  const saveName = (id: string) => {
    updateQRCode(id, { name: editName });
    setSavedQRs(getSavedQRCodes());
    setEditingId(null);
    toast({
      title: "Name Updated",
      description: "QR code name has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            My QR Codes ({savedQRs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedQRs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No QR codes saved yet. Generate your first QR code to get started!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedQRs.map((qr) => (
                <Card key={qr.id} className="bg-white/50 dark:bg-gray-700/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{qr.data.type}</Badge>
                        <span className="text-sm text-gray-500">
                          {qr.scans} scans
                        </span>
                      </div>
                      
                      {editingId === qr.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="QR name"
                            className="text-sm"
                          />
                          <Button size="sm" onClick={() => saveName(qr.id)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">
                            {qr.name || `${qr.data.type} QR`}
                          </h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditName(qr)}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 truncate">
                        {qr.content.length > 50 ? `${qr.content.substring(0, 50)}...` : qr.content}
                      </p>
                      
                      <div className="text-xs text-gray-500">
                        Created: {new Date(qr.createdAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(qr)}
                          className="flex-1"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(qr.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
