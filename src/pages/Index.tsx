
import React from "react";
import Header from "@/components/Header";
import PostGenerator from "@/components/PostGenerator";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Index = () => {
  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Craft perfect social media posts in seconds
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Generate engaging, platform-optimized content with customizable templates, trending hashtags, and AI-powered suggestions.
          </p>
          <Button onClick={scrollToContent} size="lg" className="rounded-full px-8">
            Get Started
          </Button>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
          <Button variant="ghost" size="icon" onClick={scrollToContent}>
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </section>
      
      {/* Content Section */}
      <section id="content" className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Social Media Post Generator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create platform-specific content that drives engagement using our AI-powered tools.
            </p>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-xl shadow-sm">
            <PostGenerator />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PostCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
