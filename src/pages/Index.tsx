
import React from "react";
import Header from "@/components/Header";
import PostGenerator from "@/components/PostGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto py-16 px-4 md:px-6 lg:px-8 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            AI Social Media Post Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging posts with AI-powered content and images
          </p>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
          <PostGenerator />
        </div>
      </main>
      
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
