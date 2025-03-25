
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Send, Bookmark, Instagram } from "lucide-react";

interface PostPreviewProps {
  caption: string;
  hashtags: string[];
}

export default function PostPreview({ caption, hashtags }: PostPreviewProps) {
  const formatCaption = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className={index > 0 ? "mt-2" : ""}>{paragraph}</p>
    ));
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center mb-4">
        <Instagram className="h-5 w-5 mr-2" />
        <h2 className="text-lg font-medium">Post Preview</h2>
      </div>
      
      <Card className="overflow-hidden border shadow-sm">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">yourusername</span>
          </div>
          <div className="flex items-center">
            <button className="text-slate-600 hover:text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <img 
            src="/lovable-uploads/636f5b91-4e3f-4461-bd59-0dcbded05ed0.png" 
            alt="Post image" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 hover:text-red-500 cursor-pointer" />
              <MessageCircle className="h-6 w-6 cursor-pointer" />
              <Send className="h-6 w-6 cursor-pointer" />
            </div>
            <Bookmark className="h-6 w-6 cursor-pointer" />
          </div>
          
          <p className="text-sm font-medium mb-1">123 likes</p>
          
          <div className="text-sm mb-1">
            <span className="font-medium mr-1">yourusername</span>
            <span>{formatCaption(caption)}</span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {hashtags.map((hashtag, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
