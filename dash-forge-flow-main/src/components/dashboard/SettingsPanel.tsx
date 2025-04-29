
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WidgetData } from './DashboardLayout';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widget: WidgetData;
  onUpdate: (widget: WidgetData) => void;
}

export const SettingsPanel = ({ open, onOpenChange, widget, onUpdate }: SettingsPanelProps) => {
  const [editedWidget, setEditedWidget] = useState<WidgetData>({ ...widget });
  const [activeTab, setActiveTab] = useState('general');

  // Reset the form when the widget changes
  useEffect(() => {
    setEditedWidget({ ...widget });
  }, [widget]);

  const handleUpdateWidget = () => {
    onUpdate(editedWidget);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Widget Settings</SheetTitle>
        </SheetHeader>

        <div className="py-6">
          <Tabs defaultValue="general" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
              <TabsTrigger value="data" className="flex-1">Data</TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widget-title">Widget Title</Label>
                <Input
                  id="widget-title"
                  value={editedWidget.title}
                  onChange={(e) => setEditedWidget({ ...editedWidget, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-size">Widget Size</Label>
                <Select 
                  value={editedWidget.size} 
                  onValueChange={(value) => setEditedWidget({ ...editedWidget, size: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select widget size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small (1 column)</SelectItem>
                    <SelectItem value="md">Medium (2 columns)</SelectItem>
                    <SelectItem value="lg">Large (3 columns)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-source">Data Source</Label>
                <Select 
                  value={editedWidget.dataSource || 'mock'} 
                  onValueChange={(value) => setEditedWidget({ ...editedWidget, dataSource: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mock">Mock Data</SelectItem>
                    <SelectItem value="api">API Endpoint</SelectItem>
                    <SelectItem value="sheets">Google Sheets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {editedWidget.dataSource === 'api' && (
                <div className="space-y-2">
                  <Label htmlFor="api-endpoint">API Endpoint</Label>
                  <Input
                    id="api-endpoint"
                    placeholder="https://api.example.com/data"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of the API endpoint that will provide data for this widget.
                  </p>
                </div>
              )}
              
              {editedWidget.dataSource === 'sheets' && (
                <div className="space-y-2">
                  <Label htmlFor="sheets-url">Google Sheets URL</Label>
                  <Input
                    id="sheets-url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                  <Button variant="secondary" size="sm" className="mt-2">
                    Connect to Google Sheets
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Make sure your sheet is publicly accessible or shared with the appropriate permissions.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-4">
              {editedWidget.type === 'chart' && (
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Chart Type</Label>
                  <Select 
                    value={editedWidget.chartType || 'bar'} 
                    onValueChange={(value) => setEditedWidget({ ...editedWidget, chartType: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpdateWidget}>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
