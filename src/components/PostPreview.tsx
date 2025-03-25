
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Send, Bookmark, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { platforms } from "@/utils/platformData";

interface PostPreviewProps {
  selectedPlatform: string;
  caption: string;
  hashtags: string[];
}

export default function PostPreview({ selectedPlatform, caption, hashtags }: PostPreviewProps) {
  const { toast } = useToast();
  const platform = platforms.find(p => p.id === selectedPlatform);
  
  const platformStyles = {
    instagram: {
      iconColor: "text-pink-600",
      gradient: "from-purple-500 to-pink-500"
    },
    twitter: {
      iconColor: "text-blue-400",
      gradient: "from-blue-400 to-blue-500"
    },
    linkedin: {
      iconColor: "text-blue-700",
      gradient: "from-blue-600 to-blue-700"
    },
    facebook: {
      iconColor: "text-blue-600",
      gradient: "from-blue-600 to-blue-700"
    }
  };
  
  const platformStyle = platformStyles[selectedPlatform as keyof typeof platformStyles] || 
    platformStyles.instagram;
  
  const copyToClipboard = () => {
    const fullContent = `${caption}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullContent);
    toast({
      description: "Full post copied to clipboard",
    });
  };
  
  if (!platform) return null;
  
  return (
    <div className="w-full animate-fade-in space-y-4">
      <h2 className="text-xl font-medium mb-4">Post Preview</h2>
      
      <Card className="max-w-md mx-auto shadow-md overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className={`bg-gradient-to-r ${platformStyle.gradient} text-white`}>
                U
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">YourUsername</p>
              <p className="text-xs text-muted-foreground">Your Location</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="aspect-square mb-4 bg-muted rounded-md flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Post image would appear here</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <Heart className="h-5 w-5 hover:text-red-500 cursor-pointer transition-colors" />
              <MessageSquare className="h-5 w-5 cursor-pointer" />
              <Send className="h-5 w-5 cursor-pointer" />
              <div className="flex-1"></div>
              <Bookmark className="h-5 w-5 cursor-pointer" />
            </div>
            
            <p className="text-sm font-medium">123 likes</p>
            
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-medium">YourUsername</span>{" "}
                <span>{caption}</span>
              </p>
              
              <p className="text-sm text-blue-500">
                {hashtags.join(' ')}
              </p>
              
              <p className="text-xs text-muted-foreground">View all 12 comments</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-center">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Full Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
