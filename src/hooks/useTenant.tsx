import { useAuth } from './useAuth';

export interface TenantInfo {
  isMKY: boolean;
  company: string | null;
  domain: string | null;
}

export const useTenant = (): TenantInfo => {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return {
      isMKY: false,
      company: null,
      domain: null
    };
  }

  const domain = user.email?.split('@')[1] || null;
  const company = profile.company || null;
  
  const isMKY = domain === 'mky.com' || company === 'MKY';

  return {
    isMKY,
    company,
    domain
  };
};