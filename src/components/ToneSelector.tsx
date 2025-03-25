
import React from "react";
import { tones } from "@/utils/platformData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (toneId: string) => void;
}

export default function ToneSelector({ selectedTone, onSelectTone }: ToneSelectorProps) {
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-xl font-medium mb-4">Select Tone</h2>
      
      <RadioGroup 
        value={selectedTone} 
        onValueChange={onSelectTone}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {tones.map((tone) => (
          <div key={tone.id} className="flex items-start space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value={tone.id} id={tone.id} className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor={tone.id} className="font-medium cursor-pointer">{tone.name}</Label>
              <p className="text-xs text-muted-foreground">{tone.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
