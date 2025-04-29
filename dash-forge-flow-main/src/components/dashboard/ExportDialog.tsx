import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportDialog = ({ open, onOpenChange }: ExportDialogProps) => {
  
  const handleExportPDF = () => {
    toast('Exporting as PDF...');
    setTimeout(() => {
      toast('PDF export complete!');
      onOpenChange(false);
    }, 1500);
  };
  
  const handleExportCSV = () => {
    toast('Exporting as CSV...');
    setTimeout(() => {
      toast('CSV export complete!');
      onOpenChange(false);
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Dashboard</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="pdf" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              PDF
            </TabsTrigger>
            <TabsTrigger value="csv" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              CSV
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pdf" className="space-y-4 py-4">
            <div className="space-y-4">
              <div>
                <Label className="text-base">What to include</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="all-widgets" defaultChecked />
                    <label
                      htmlFor="all-widgets"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      All widgets
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-data-tables" defaultChecked />
                    <label
                      htmlFor="include-data-tables"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include data tables
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-base">Paper size</Label>
                <RadioGroup defaultValue="a4" className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a4" id="a4" />
                    <Label htmlFor="a4">A4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="letter" id="letter" />
                    <Label htmlFor="letter">Letter</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleExportPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-4 py-4">
            <div className="space-y-4">
              <div>
                <Label className="text-base">Export options</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="all-data" defaultChecked />
                    <label
                      htmlFor="all-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Export all data
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-headers" defaultChecked />
                    <label
                      htmlFor="include-headers"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include column headers
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleExportCSV} className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
