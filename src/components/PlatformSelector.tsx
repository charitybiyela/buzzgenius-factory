
import React from "react";
import { platforms, Platform } from "@/utils/platformData";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelectPlatform: (platformId: string) => void;
}

export default function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-xl font-medium mb-4">Choose Platform</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            isSelected={selectedPlatform === platform.id}
            onSelect={() => onSelectPlatform(platform.id)}
          />
        ))}
      </div>
      
      {selectedPlatform && (
        <PlatformTips platform={platforms.find(p => p.id === selectedPlatform)!} />
      )}
    </div>
  );
}

interface PlatformCardProps {
  platform: Platform;
  isSelected: boolean;
  onSelect: () => void;
}

function PlatformCard({ platform, isSelected, onSelect }: PlatformCardProps) {
  const Icon = platform.icon;
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden",
        isSelected ? "ring-2 ring-primary" : "",
        "hover-scale"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <Icon className={cn(
          "h-8 w-8 mb-2",
          isSelected ? "text-primary" : "text-muted-foreground"
        )} />
        <p className="text-sm font-medium">{platform.name}</p>
      </CardContent>
    </Card>
  );
}

interface PlatformTipsProps {
  platform: Platform;
}

function PlatformTips({ platform }: PlatformTipsProps) {
  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50 animate-fade-in">
      <h3 className="text-sm font-medium mb-2">{platform.name} Best Practices</h3>
      <ul className="text-xs text-muted-foreground space-y-1">
        {platform.bestPractices.map((practice, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{practice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
