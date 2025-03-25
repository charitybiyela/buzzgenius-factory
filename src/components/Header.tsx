
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-border/30 glass-card bg-background/80 backdrop-blur-lg fixed top-0 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-xl font-medium tracking-tight">PostCraft</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="button-effect">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
