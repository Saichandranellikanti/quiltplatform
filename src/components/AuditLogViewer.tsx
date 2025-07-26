import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuditLogs } from '@/hooks/useAuditLogs';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { format } from 'date-fns';

interface AuditLogViewerProps {
  recordId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({
  recordId,
  isOpen,
  onClose
}) => {
  const { auditLogs, loading } = useAuditLogs(recordId);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFieldChanges = (log: any) => {
    if (!log.changed_fields || log.changed_fields.length === 0) {
      return null;
    }

    return (
      <div className="mt-2 space-y-1">
        <div className="text-sm font-medium text-muted-foreground">Changed Fields:</div>
        <div className="flex flex-wrap gap-1">
          {log.changed_fields.map((field: string) => (
            <Badge key={field} variant="outline" className="text-xs">
              {field}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const formatValues = (values: any) => {
    if (!values) return null;
    
    try {
      return (
        <div className="mt-2 p-2 bg-muted rounded text-xs font-mono max-h-32 overflow-y-auto">
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      );
    } catch {
      return (
        <div className="mt-2 p-2 bg-muted rounded text-xs">
          {String(values)}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Audit Trail</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found for this record.
            </div>
          ) : (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                      <span className="text-sm font-medium">
                        {log.user_email} ({log.user_role})
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm:ss')}
                    </span>
                  </div>

                  {formatFieldChanges(log)}

                  {log.action === 'UPDATE' && (
                    <div className="mt-4 space-y-3">
                      {log.old_values && (
                        <div>
                          <div className="text-sm font-medium text-red-600 mb-1">Before:</div>
                          {formatValues(log.old_values)}
                        </div>
                      )}
                      {log.new_values && (
                        <div>
                          <div className="text-sm font-medium text-green-600 mb-1">After:</div>
                          {formatValues(log.new_values)}
                        </div>
                      )}
                    </div>
                  )}

                  {log.action === 'INSERT' && log.new_values && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-green-600 mb-1">Created:</div>
                      {formatValues(log.new_values)}
                    </div>
                  )}

                  {log.action === 'DELETE' && log.old_values && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-red-600 mb-1">Deleted:</div>
                      {formatValues(log.old_values)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};