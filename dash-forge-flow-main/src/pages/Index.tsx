
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataSourceForm from '@/components/dashboard/DataSourceForm';
import { LayoutDashboard, Database, Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dashboard-blue">Dashboard Generator</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Help</Button>
            <Button size="sm">Save Dashboard</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 bg-dashboard-background">
        <div className="container mx-auto py-6 px-6">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="dashboard" className="flex-1 flex items-center justify-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="data-sources" className="flex-1 flex items-center justify-center gap-2">
                <Database className="h-4 w-4" />
                Data Sources
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 flex items-center justify-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="bg-white rounded-lg shadow-sm border">
              <DashboardLayout />
            </TabsContent>
            
            <TabsContent value="data-sources" className="bg-white rounded-lg shadow-sm p-6 border">
              <DataSourceForm />
            </TabsContent>
            
            <TabsContent value="settings" className="bg-white rounded-lg shadow-sm p-6 border">
              <h2 className="text-lg font-semibold mb-4">Dashboard Settings</h2>
              <p className="text-muted-foreground">
                Configure dashboard settings, appearance, and preferences.
              </p>
              <div className="mt-4">
                <Button variant="outline">Reset Dashboard</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
        <p>Dashboard Generator | Made with Lovable</p>
      </footer>
    </div>
  );
};

export default Index;
