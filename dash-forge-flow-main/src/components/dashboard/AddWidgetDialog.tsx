
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WidgetData } from './DashboardLayout';

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget: (widget: WidgetData) => void;
}

export const AddWidgetDialog = ({ open, onOpenChange, onAddWidget }: AddWidgetDialogProps) => {
  const [widgetTitle, setWidgetTitle] = useState('');
  const [widgetType, setWidgetType] = useState<'chart' | 'table' | 'metric'>('chart');
  const [widgetSize, setWidgetSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'area'>('bar');
  const [dataSource, setDataSource] = useState<'mock' | 'api' | 'sheets'>('mock');

  const handleAddWidget = () => {
    if (!widgetTitle.trim()) {
      return;
    }

    onAddWidget({
      id: '',  // Will be filled in by the parent component
      title: widgetTitle,
      type: widgetType,
      size: widgetSize,
      chartType: widgetType === 'chart' ? chartType : undefined,
      dataSource,
    });

    // Reset form
    setWidgetTitle('');
    setWidgetType('chart');
    setWidgetSize('md');
    setChartType('bar');
    setDataSource('mock');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="widget-title" className="text-right">
              Title
            </Label>
            <Input
              id="widget-title"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter widget title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="widget-type" className="text-right">
              Type
            </Label>
            <Select 
              value={widgetType} 
              onValueChange={(value) => setWidgetType(value as any)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select widget type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chart">Chart</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="metric">Metric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="widget-size" className="text-right">
              Size
            </Label>
            <Select 
              value={widgetSize} 
              onValueChange={(value) => setWidgetSize(value as any)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select widget size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small (1 column)</SelectItem>
                <SelectItem value="md">Medium (2 columns)</SelectItem>
                <SelectItem value="lg">Large (3 columns)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {widgetType === 'chart' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chart-type" className="text-right">
                Chart Type
              </Label>
              <Select 
                value={chartType} 
                onValueChange={(value) => setChartType(value as any)}
              >
                <SelectTrigger className="col-span-3">
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="data-source" className="text-right">
              Data Source
            </Label>
            <Select 
              value={dataSource} 
              onValueChange={(value) => setDataSource(value as any)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mock">Mock Data</SelectItem>
                <SelectItem value="api">API Endpoint</SelectItem>
                <SelectItem value="sheets">Google Sheets</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAddWidget}>
            Add Widget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
