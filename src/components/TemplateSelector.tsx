
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { templateCategories, TemplateCategory, Template } from "@/utils/templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-xl font-medium mb-4">Choose a Template</h2>
      
      <Tabs defaultValue="promotional" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          {templateCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-sm">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {templateCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.templates.map((template) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={() => onSelectTemplate(template.id)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <Card 
      className={`cursor-pointer hover-scale ${
        isSelected ? "ring-2 ring-primary" : "hover:shadow-md"
      }`}
      onClick={onSelect}
    >
      <CardHeader className="py-4 px-5">
        <CardTitle className="text-base">{template.name}</CardTitle>
        <CardDescription className="text-xs">{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-5 pt-0 pb-4">
        <p className="text-xs text-muted-foreground mb-2">{template.structure}</p>
        <p className="text-xs line-clamp-3">{template.example}</p>
      </CardContent>
    </Card>
  );
}
