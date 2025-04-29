
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Draggable } from './Draggable';
import { MoreHorizontal, Download, Settings, Move } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WidgetProps {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'metric';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onSettingsClick?: () => void;
  onExport?: () => void;
  onRemove?: () => void;
}

const Widget = ({ 
  id, 
  title, 
  type, 
  size, 
  children, 
  onSettingsClick, 
  onExport,
  onRemove 
}: WidgetProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      toast('Export functionality coming soon');
    }
  };

  // Size classes mapping
  const sizeClasses = {
    sm: 'col-span-1',
    md: 'col-span-2',
    lg: 'col-span-3'
  };

  const heightClasses = {
    sm: 'h-64',
    md: 'h-64',
    lg: 'h-64'
  };

  return (
    <Draggable
      id={id}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <Card className={`${sizeClasses[size]} ${heightClasses[size]} relative transition-shadow hover:shadow-md ${isDragging ? 'shadow-lg ring-2 ring-primary/50 z-50' : ''}`}>
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              className="cursor-grab active:cursor-grabbing p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Move widget"
            >
              <Move size={16} className="text-muted-foreground" />
            </button>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                <span>Export</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onRemove}
                className="text-destructive focus:text-destructive"
              >
                Remove widget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-3 pt-0 h-[calc(100%-48px)] overflow-hidden">
          {children}
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default Widget;
