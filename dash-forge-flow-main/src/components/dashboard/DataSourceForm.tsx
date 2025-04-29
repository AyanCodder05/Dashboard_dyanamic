
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const DataSourceForm = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleConnectApi = () => {
    if (!apiUrl) {
      toast('Please enter an API URL');
      return;
    }
    
    // In a real app, this would validate and connect to the API
    toast.success('Successfully connected to API');
  };

  const handleConnectSheets = () => {
    if (!sheetsUrl) {
      toast('Please enter a Google Sheets URL');
      return;
    }
    
    // In a real app, this would validate and connect to Google Sheets
    toast.success('Successfully connected to Google Sheets');
  };

  const handleUploadCSV = () => {
    if (!csvFile) {
      toast('Please select a CSV file');
      return;
    }
    
    // In a real app, this would process the CSV file
    toast.success(`Successfully uploaded ${csvFile.name}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
        <CardDescription>
          Connect your dashboard to external data sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="api">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api">REST API</TabsTrigger>
            <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">API Endpoint URL</Label>
              <Input 
                id="api-url" 
                placeholder="https://api.example.com/data" 
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key (Optional)</Label>
              <Input 
                id="api-key" 
                type="password" 
                placeholder="Your API key" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <Button onClick={handleConnectApi}>Connect API</Button>
          </TabsContent>
          
          <TabsContent value="sheets" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="sheets-url">Google Sheets URL</Label>
              <Input 
                id="sheets-url" 
                placeholder="https://docs.google.com/spreadsheets/d/..." 
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Make sure your Google Sheet is published to the web or has the appropriate sharing settings.
              </p>
            </div>
            <Button onClick={handleConnectSheets}>Connect Google Sheets</Button>
          </TabsContent>
          
          <TabsContent value="csv" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input 
                id="csv-file" 
                type="file" 
                accept=".csv" 
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Select a CSV file to import. Maximum file size: 10MB.
              </p>
            </div>
            <Button onClick={handleUploadCSV}>Upload & Parse CSV</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 mt-2">
        <p className="text-sm text-muted-foreground">
          Connected data sources will appear in widget settings
        </p>
      </CardFooter>
    </Card>
  );
};

export default DataSourceForm;
