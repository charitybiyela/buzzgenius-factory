
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, RefreshCw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiPrompts, getPlatformById } from "@/utils/platformData";
import { getTemplateById } from "@/utils/templates";

interface ContentGeneratorProps {
  selectedTemplate: string;
  selectedPlatform: string;
  selectedTone: string;
  onContentGenerated: (caption: string, hashtags: string[]) => void;
}

export default function ContentGenerator({ 
  selectedTemplate, 
  selectedPlatform, 
  selectedTone,
  onContentGenerated
}: ContentGeneratorProps) {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

  // In a real app, this would call an AI API
  const generateContent = () => {
    if (!keywords.trim()) {
      toast({
        title: "Keywords required",
        description: "Please enter keywords to generate content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const template = getTemplateById(selectedTemplate);
      const platform = getPlatformById(selectedPlatform);
      
      if (!template || !platform) {
        toast({
          title: "Error",
          description: "Please select a template and platform",
          variant: "destructive"
        });
        setIsGenerating(false);
        return;
      }

      // Mock AI-generated caption based on template example
      const keywordsList = keywords.split(',').map(k => k.trim());
      let caption = template.example;
      
      // Insert some keywords
      keywordsList.forEach(keyword => {
        caption = caption.replace('[benefit]', keyword).replace('[key feature]', keyword);
      });
      
      // Generate some mock hashtags
      const mockHashtags = keywordsList.map(k => `#${k.replace(/\s+/g, '')}`);
      // Add some generic hashtags
      mockHashtags.push('#trending', '#innovation', '#growth', '#social');
      
      setGeneratedCaption(caption);
      setGeneratedHashtags(mockHashtags.slice(0, platform.hashtagLimit));
      onContentGenerated(caption, mockHashtags.slice(0, platform.hashtagLimit));
      setIsGenerating(false);
      
      toast({
        title: "Content generated",
        description: "Your post has been created successfully",
      });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  };

  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-xl font-medium mb-4">Generate Content</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (separated by commas)</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., productivity, time management, efficiency"
            className="w-full"
          />
        </div>
        
        <Button 
          onClick={generateContent} 
          disabled={isGenerating || !selectedTemplate || !selectedPlatform || !selectedTone}
          className="w-full"
        >
          {isGenerating ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <>Generate Content</>
          )}
        </Button>
        
        {generatedCaption && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="caption">Caption</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(generatedCaption)}
                  className="h-8 px-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                id="caption"
                value={generatedCaption}
                onChange={(e) => setGeneratedCaption(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="hashtags">Hashtags</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(generatedHashtags.join(' '))}
                  className="h-8 px-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3 bg-muted/30 rounded-md max-h-[100px] overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {generatedHashtags.map((hashtag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex bg-secondary px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={generateContent} 
              disabled={isGenerating}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
