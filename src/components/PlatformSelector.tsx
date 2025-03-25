
import React from "react";
import { platforms } from "@/utils/platformData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelectPlatform: (platformId: string) => void;
}

export default function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  return (
    <div className="w-full animate-fade-in">
      <h3 className="text-sm font-medium mb-2">Platform</h3>
      
      <Select value={selectedPlatform} onValueChange={onSelectPlatform}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a platform" />
        </SelectTrigger>
        <SelectContent>
          {platforms.map((platform) => (
            <SelectItem key={platform.id} value={platform.id}>
              {platform.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
