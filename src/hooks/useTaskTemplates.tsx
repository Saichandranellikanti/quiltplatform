import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  type: 'GRIMALDI_SHIPPING' | 'ORIENT_SHIPPING' | 'GENERAL_SHIPPING' | 'LABELS' | 'BLC' | 'DELIVERY_PERMITS';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTaskTemplates = () => {
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch templates';
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

  const createTemplate = async (template: Omit<TaskTemplate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template created successfully"
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create template';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<TaskTemplate>) => {
    try {
      const { error } = await supabase
        .from('task_templates')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template updated successfully"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update template';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('task_templates')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template deactivated successfully"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate template';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchTemplates();

    const channel = supabase
      .channel('task-templates-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'task_templates'
        },
        (payload) => {
          console.log('Task template change detected:', payload);
          fetchTemplates(); // Refetch to ensure consistency
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    refetch: fetchTemplates
  };
};