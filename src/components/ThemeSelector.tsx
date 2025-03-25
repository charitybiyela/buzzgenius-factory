
import React from "react";
import { themes } from "@/utils/templates";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeSelector({ selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="w-full animate-fade-in">
      <h3 className="text-sm font-medium mb-2">Theme</h3>
      
      <Select value={selectedTheme} onValueChange={onSelectTheme}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
