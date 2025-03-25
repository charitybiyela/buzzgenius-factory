
import React, { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import PlatformSelector from "./PlatformSelector";
import ToneSelector from "./ToneSelector";
import ContentGenerator from "./ContentGenerator";
import PostPreview from "./PostPreview";
import { Separator } from "@/components/ui/separator";

export default function PostGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  
  const handleContentGenerated = (caption: string, hashtags: string[]) => {
    setGeneratedCaption(caption);
    setGeneratedHashtags(hashtags);
  };
  
  return (
    <div className="w-full space-y-8">
      <section>
        <TemplateSelector 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
      </section>
      
      <Separator />
      
      <section>
        <PlatformSelector 
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
      </section>
      
      <Separator />
      
      <section>
        <ToneSelector 
          selectedTone={selectedTone}
          onSelectTone={setSelectedTone}
        />
      </section>
      
      <Separator />
      
      <section>
        <ContentGenerator 
          selectedTemplate={selectedTemplate}
          selectedPlatform={selectedPlatform}
          selectedTone={selectedTone}
          onContentGenerated={handleContentGenerated}
        />
      </section>
      
      {generatedCaption && (
        <>
          <Separator />
          
          <section>
            <PostPreview 
              selectedPlatform={selectedPlatform}
              caption={generatedCaption}
              hashtags={generatedHashtags}
            />
          </section>
        </>
      )}
    </div>
  );
}
