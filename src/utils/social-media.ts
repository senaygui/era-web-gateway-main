import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

export type SocialMediaType = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'other';

export interface SocialMediaInfo {
  type: SocialMediaType;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const getSocialMediaInfo = (url: string): SocialMediaInfo => {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('facebook.com')) {
    return {
      type: 'facebook',
      icon: Facebook,
      label: 'Facebook'
    };
  }
  
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
    return {
      type: 'twitter',
      icon: Twitter,
      label: 'Twitter'
    };
  }
  
  if (lowerUrl.includes('instagram.com')) {
    return {
      type: 'instagram',
      icon: Instagram,
      label: 'Instagram'
    };
  }
  
  if (lowerUrl.includes('linkedin.com')) {
    return {
      type: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn'
    };
  }
  
  return {
    type: 'other',
    icon: Globe,
    label: 'Website'
  };
}; 