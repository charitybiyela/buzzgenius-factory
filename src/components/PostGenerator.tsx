
import React, { useState } from "react";
import PlatformSelector from "./PlatformSelector";
import ToneSelector from "./ToneSelector";
import ThemeSelector from "./ThemeSelector";
import ContentGenerator from "./ContentGenerator";
import PostPreview from "./PostPreview";
import { Edit } from "lucide-react";

export default function PostGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedTone, setSelectedTone] = useState("casual");
  const [selectedTheme, setSelectedTheme] = useState("lifestyle");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  
  const handleContentGenerated = (caption: string, hashtags: string[]) => {
    setGeneratedCaption(caption);
    setGeneratedHashtags(hashtags);
  };
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Edit className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-medium">Customize Your Post</h2>
        </div>
        
        <PlatformSelector 
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
        
        <ToneSelector 
          selectedTone={selectedTone}
          onSelectTone={setSelectedTone}
        />
        
        <ThemeSelector
          selectedTheme={selectedTheme}
          onSelectTheme={setSelectedTheme}
        />
        
        <ContentGenerator 
          selectedTemplate=""
          selectedPlatform={selectedPlatform}
          selectedTone={selectedTone}
          selectedTheme={selectedTheme}
          onContentGenerated={handleContentGenerated}
        />
      </div>
      
      <div>
        {generatedCaption ? (
          <PostPreview 
            caption={generatedCaption}
            hashtags={generatedHashtags}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed text-gray-400">
            <p className="text-center">
              Generate a post to see the preview here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
