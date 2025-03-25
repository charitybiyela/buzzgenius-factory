
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPlatformById } from "@/utils/platformData";
import { getTemplateById, getThemeById } from "@/utils/templates";

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

  // In a real app, this would call an AI API
  const generateContent = () => {
    if (!selectedPlatform || !selectedTone || !selectedTheme) {
      toast({
        title: "Incomplete selection",
        description: "Please select all options to generate content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const platform = getPlatformById(selectedPlatform);
      const theme = getThemeById(selectedTheme);
      
      if (!platform || !theme) {
        toast({
          title: "Error",
          description: "Please select a platform and theme",
          variant: "destructive"
        });
        setIsGenerating(false);
        return;
      }

      // Sample lifestyle captions
      const lifestyleCaptions = [
        "✨ Living the dream, one day at a time!\n\n✨ Whether it's a cozy coffee date ☕ with friends, diving into a new book 📚, or soaking up the sun ☀️ during a lazy afternoon, it's all about those little moments that make life beautiful. 🧡\n\nWhat's your favorite way to unwind and enjoy life? Let's share some good vibes! 👇💕",
        "Finding joy in the simple things today ✨\n\nSometimes it's the quiet moments that speak the loudest. A perfect morning with sunshine, good coffee, and time to breathe. What small joy are you grateful for today? ☀️☕",
        "Monday motivation: Create a life you don't need a vacation from ✨\n\nStarting the week with intention and positivity. What's one small step you're taking today toward your goals? Share below! 💫"
      ];
      
      // Generate hashtags based on theme
      let hashtags = [];
      if (selectedTheme === "lifestyle") {
        hashtags = ["#Lifestyle", "#GoodVibesOnly", "#ChillOut", "#EverydayMoments", "#LivingMyBestLife"];
      } else if (selectedTheme === "business") {
        hashtags = ["#BusinessGrowth", "#Entrepreneurship", "#Success", "#Leadership", "#BusinessTips"];
      } else if (selectedTheme === "food") {
        hashtags = ["#FoodLover", "#Foodie", "#Delicious", "#Yummy", "#FoodPhotography"];
      } else {
        hashtags = ["#Trending", "#FollowMe", "#SocialMedia", "#ContentCreation", "#Engagement"];
      }
      
      // Random selection for demo purposes
      const randomIndex = Math.floor(Math.random() * lifestyleCaptions.length);
      const caption = lifestyleCaptions[randomIndex];
      
      onContentGenerated(caption, hashtags);
      setIsGenerating(false);
      
      toast({
        title: "Content generated",
        description: "Your post has been created successfully",
      });
    }, 1500);
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
