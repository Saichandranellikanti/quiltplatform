import { useToast } from '@/hooks/use-toast';

interface ExportData {
  [key: string]: any;
}

export const useExport = () => {
  const { toast } = useToast();

  const exportToCSV = (data: ExportData[], filename: string = 'export') => {
    try {
      if (!data.length) {
        toast({
          title: "No data to export",
          description: "There is no data available to export",
          variant: "destructive",
        });
        return;
      }

      // Get headers from the first object
      const headers = Object.keys(data[0]);
      
      // Create CSV content
      const csvContent = [
        headers.join(','), // Header row
        ...data.map(row => 
          headers.map(header => {
            const value = row[header];
            // Handle null/undefined values and escape commas
            if (value === null || value === undefined) return '';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value).includes(',') ? `"${value}"` : String(value);
          }).join(',')
        )
      ].join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export successful",
          description: `${data.length} records exported to CSV`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const exportToJSON = (data: ExportData[], filename: string = 'export') => {
    try {
      if (!data.length) {
        toast({
          title: "No data to export",
          description: "There is no data available to export",
          variant: "destructive",
        });
        return;
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export successful",
          description: `${data.length} records exported to JSON`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    exportToCSV,
    exportToJSON,
  };
};