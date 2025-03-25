
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPlatformById } from "@/utils/platformData";
import { getThemeById } from "@/utils/templates";

interface ContentGeneratorProps {
  selectedTemplate: string;
  selectedPlatform: string;
  selectedTone: string;
  selectedTheme: string;
  onContentGenerated: (caption: string, hashtags: string[]) => void;
}

export default function ContentGenerator({ 
  selectedPlatform, 
  selectedTone,
  selectedTheme,
  onContentGenerated
}: ContentGeneratorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const apiKey = "AIzaSyD8vLsygBw3wN0kyybXHnWP30Qs-E-Zo1g";

  const generateContent = async () => {
    if (!selectedPlatform || !selectedTone || !selectedTheme) {
      toast({
        title: "Incomplete selection",
        description: "Please select all options to generate content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const platform = getPlatformById(selectedPlatform);
      const theme = getThemeById(selectedTheme);
      
      if (!platform || !theme) {
        throw new Error("Invalid platform or theme selection");
      }

      // Create a prompt based on the selected options
      const prompt = `Create a social media post for ${platform.name} with a ${selectedTone} tone about ${theme.name}. 
                      Include a caption and relevant hashtags. 
                      Make the caption engaging and appropriate for the platform.`;

      // Make the API call
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No content generated");
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract caption and hashtags
      let caption = '';
      let hashtags: string[] = [];
      
      // Process the generated text to separate caption and hashtags
      const parts = generatedText.split(/(\s*#\w+)/g);
      
      if (parts.length > 1) {
        // Join all non-hashtag parts as the caption
        caption = parts.filter(part => !part.trim().startsWith('#')).join('').trim();
        
        // Extract hashtags
        hashtags = parts
          .filter(part => part.trim().startsWith('#'))
          .map(tag => tag.trim())
          .filter(tag => tag.length > 1); // Filter out empty hashtags
      } else {
        // If no hashtags found, use the whole text as caption
        caption = generatedText;
      }
      
      onContentGenerated(caption, hashtags);
      
      toast({
        title: "Content generated",
        description: "Your post has been created successfully",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "An error occurred while generating content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full mt-8">
      <Button 
        onClick={generateContent} 
        disabled={isGenerating || !selectedPlatform || !selectedTone || !selectedTheme}
        className="w-full h-12 text-base font-medium"
      >
        <Sparkles className="mr-2 h-5 w-5" /> 
        {isGenerating ? "Generating..." : "Generate Post"}
      </Button>
    </div>
  );
}
