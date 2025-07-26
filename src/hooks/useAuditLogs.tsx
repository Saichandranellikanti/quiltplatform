import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface AuditLog {
  id: string;
  table_name: string;
  record_id: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  old_values?: any;
  new_values?: any;
  changed_fields?: string[];
  user_id: string;
  user_email?: string;
  user_role?: string;
  created_at: string;
}

export const useAuditLogs = (recordId?: string) => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Only admins can view audit logs
      if (profile?.role !== 'Admin') {
        setAuditLogs([]);
        return;
      }

      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      // If recordId is provided, filter by it
      if (recordId) {
        query = query.eq('record_id', recordId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAuditLogs(data as AuditLog[] || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch audit logs';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [profile, recordId]);

  return {
    auditLogs,
    loading,
    error,
    fetchAuditLogs,
    refetch: fetchAuditLogs
  };
};