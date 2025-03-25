
import React from "react";
import { tones } from "@/utils/platformData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (toneId: string) => void;
}

export default function ToneSelector({ selectedTone, onSelectTone }: ToneSelectorProps) {
  return (
    <div className="w-full animate-fade-in">
      <h3 className="text-sm font-medium mb-2">Tone</h3>
      
      <Select value={selectedTone} onValueChange={onSelectTone}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tone" />
        </SelectTrigger>
        <SelectContent>
          {tones.map((tone) => (
            <SelectItem key={tone.id} value={tone.id}>
              {tone.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
