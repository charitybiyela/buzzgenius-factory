
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export type Platform = {
  id: string;
  name: string;
  icon: React.ElementType;
  characterLimit: number;
  hashtagLimit: number;
  supportEmojis: boolean;
  description: string;
  bestPractices: string[];
};

export const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    characterLimit: 2200,
    hashtagLimit: 30,
    supportEmojis: true,
    description: "Visual platform focused on photos and short videos",
    bestPractices: [
      "Use up to 30 relevant hashtags",
      "Include a call-to-action",
      "Keep captions scannable with line breaks",
      "Use emojis to add personality",
      "Tag relevant accounts when appropriate"
    ]
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    characterLimit: 280,
    hashtagLimit: 2,
    supportEmojis: true,
    description: "Short-form text platform for real-time updates",
    bestPractices: [
      "Keep tweets concise and direct",
      "Use only 1-2 highly relevant hashtags",
      "Include media for higher engagement",
      "Ask questions to encourage replies",
      "Create threads for longer content"
    ]
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    characterLimit: 3000,
    hashtagLimit: 5,
    supportEmojis: true,
    description: "Professional network for business content",
    bestPractices: [
      "Start with a strong hook in the first 3 lines",
      "Use line breaks for readability",
      "Include 3-5 relevant hashtags",
      "Share industry insights and professional achievements",
      "Maintain a professional but conversational tone"
    ]
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    characterLimit: 63206,
    hashtagLimit: 10,
    supportEmojis: true,
    description: "Community-focused platform for diverse content",
    bestPractices: [
      "Keep posts under 80 characters for optimal engagement",
      "Ask questions to encourage comments",
      "Use high-quality images or videos",
      "Create a conversational tone",
      "Limit hashtags to 1-2 for better performance"
    ]
  }
];

export const tones = [
  { id: "professional", name: "Professional", description: "Formal, authoritative and business-appropriate" },
  { id: "casual", name: "Casual", description: "Relaxed, friendly and conversational" },
  { id: "enthusiastic", name: "Enthusiastic", description: "Excited, energetic and passionate" },
  { id: "informative", name: "Informative", description: "Educational, detailed and helpful" },
  { id: "humorous", name: "Humorous", description: "Funny, light-hearted and playful" }
];

export const aiPrompts = {
  caption: (template: string, platform: string, tone: string, keywords: string) => {
    return `Create a ${platform} post using the ${template} template with a ${tone} tone. Focus on these keywords: ${keywords}.`;
  },
  hashtags: (platform: string, keywords: string, limit: number) => {
    return `Generate ${limit} relevant hashtags for a ${platform} post about ${keywords}.`;
  }
};

export const getPlatformById = (platformId: string): Platform | undefined => {
  return platforms.find(p => p.id === platformId);
};
