
import { useState } from 'react';
import DropZone from './DropZone';
import Widget from './Widget';
import { AddWidgetDialog } from './AddWidgetDialog';
import { SettingsPanel } from './SettingsPanel';
import { ExportDialog } from './ExportDialog';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Download } from 'lucide-react';

export interface WidgetData {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'metric';
  size: 'sm' | 'md' | 'lg';
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  dataSource?: 'mock' | 'api' | 'sheets';
  data?: any;
}

const DashboardLayout = () => {
  const [widgets, setWidgets] = useState<WidgetData[]>([
    { id: '1', title: 'Revenue Overview', type: 'chart', size: 'md', chartType: 'bar' },
    { id: '2', title: 'Monthly Visitors', type: 'chart', size: 'md', chartType: 'line' },
    { id: '3', title: 'Top Products', type: 'table', size: 'md' },
    { id: '4', title: 'Conversion Rate', type: 'metric', size: 'sm' },
    { id: '5', title: 'Customer Satisfaction', type: 'chart', size: 'md', chartType: 'pie' },
  ]);
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState<WidgetData | null>(null);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const handleWidgetDrop = (id: string) => {
    // Implement widget position swapping logic
    toast('Widget position updated');
  };

  const handleWidgetSettings = (widget: WidgetData) => {
    setCurrentWidget(widget);
    setIsSettingsPanelOpen(true);
  };

  const handleWidgetRemove = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
    toast('Widget removed');
  };

  const handleWidgetAdd = (widget: WidgetData) => {
    setWidgets([...widgets, { ...widget, id: `widget-${Date.now()}` }]);
    setAddWidgetOpen(false);
    toast('New widget added');
  };

  const handleWidgetUpdate = (updatedWidget: WidgetData) => {
    setWidgets(widgets.map(w => 
      w.id === updatedWidget.id ? updatedWidget : w
    ));
    setIsSettingsPanelOpen(false);
    setCurrentWidget(null);
    toast('Widget updated');
  };

  const handleExportDashboard = () => {
    setIsExportDialogOpen(true);
  };

  const handleSaveDashboard = () => {
    // In a real application, this would save the dashboard configuration to a database
    toast('Dashboard saved');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveDashboard}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportDashboard}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setAddWidgetOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
        </div>
      </div>
      
      <DropZone 
        onDrop={handleWidgetDrop}
        className="flex-1 p-6 bg-dashboard-background"
      >
        <div className="grid grid-cols-3 gap-4 auto-rows-min">
          {widgets.map(widget => (
            <Widget
              key={widget.id}
              id={widget.id}
              title={widget.title}
              type={widget.type}
              size={widget.size}
              onSettingsClick={() => handleWidgetSettings(widget)}
              onRemove={() => handleWidgetRemove(widget.id)}
            >
              <WidgetContent widget={widget} />
            </Widget>
          ))}
        </div>
      </DropZone>
      
      <AddWidgetDialog 
        open={addWidgetOpen}
        onOpenChange={setAddWidgetOpen}
        onAddWidget={handleWidgetAdd}
      />
      
      {currentWidget && (
        <SettingsPanel
          open={isSettingsPanelOpen}
          onOpenChange={setIsSettingsPanelOpen}
          widget={currentWidget}
          onUpdate={handleWidgetUpdate}
        />
      )}
      
      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
      />
    </div>
  );
};

// Placeholder component to render different widget content based on type
const WidgetContent = ({ widget }: { widget: WidgetData }) => {
  switch (widget.type) {
    case 'chart':
      return <ChartWidget chartType={widget.chartType || 'bar'} />;
    case 'table':
      return <TableWidget />;
    case 'metric':
      return <MetricWidget />;
    default:
      return <div>Unknown widget type</div>;
  }
};

// Placeholder chart component
const ChartWidget = ({ chartType }: { chartType: string }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 rounded">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-1">{chartType} Chart</div>
        <div className="h-32 bg-gradient-to-r from-dashboard-blue to-dashboard-purple rounded opacity-70"></div>
      </div>
    </div>
  );
};

// Placeholder table component
const TableWidget = () => {
  return (
    <div className="h-full overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-right">Revenue</th>
            <th className="p-2 text-right">Sales</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="p-2">Product {i}</td>
              <td className="p-2 text-right">${(Math.random() * 1000).toFixed(2)}</td>
              <td className="p-2 text-right">{Math.floor(Math.random() * 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Placeholder metric component
const MetricWidget = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-3xl font-bold text-dashboard-blue">87%</div>
      <div className="text-sm text-muted-foreground mt-1">Compared to 74% last month</div>
    </div>
  );
};

export default DashboardLayout;
