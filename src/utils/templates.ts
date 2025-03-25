
export type Template = {
  id: string;
  name: string;
  description: string;
  structure: string;
  example: string;
};

export type TemplateCategory = {
  id: string;
  name: string;
  templates: Template[];
};

export type Theme = {
  id: string;
  name: string;
  description: string;
};

export const themes: Theme[] = [
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Content about daily life, wellness, and personal experiences"
  },
  {
    id: "business",
    name: "Business",
    description: "Professional content focused on career, entrepreneurship, and industry trends"
  },
  {
    id: "food",
    name: "Food",
    description: "Content about recipes, restaurants, cooking tips, and food experiences"
  },
  {
    id: "travel",
    name: "Travel",
    description: "Content about destinations, travel tips, and adventure experiences"
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Content about workouts, health tips, and fitness journeys"
  }
];

export const templateCategories: TemplateCategory[] = [
  {
    id: "promotional",
    name: "Promotional",
    templates: [
      {
        id: "product-launch",
        name: "Product Launch",
        description: "Announce a new product or feature",
        structure: "Exciting news + Product info + Call to action",
        example: "Introducing our revolutionary new product that will transform how you [benefit]. Experience [key feature] like never before. Learn more at the link in bio."
      },
      {
        id: "limited-offer",
        name: "Limited Offer",
        description: "Create urgency with a limited-time offer",
        structure: "Offer + Timeframe + Value proposition + Call to action",
        example: "Flash sale alert! Get 25% off our premium collection for the next 48 hours only. Elevate your experience with top-tier quality. Shop now before time runs out."
      },
      {
        id: "testimonial",
        name: "Testimonial",
        description: "Share customer feedback",
        structure: "Quote + Customer info + Product context + Call to action",
        example: "\"This changed everything for me. I can't imagine going back.\" - Sarah, who's been using our solution for 3 months. Join the thousands of satisfied customers today."
      }
    ]
  },
  {
    id: "inspirational",
    name: "Inspirational",
    templates: [
      {
        id: "quote",
        name: "Quote",
        description: "Share an inspiring quote",
        structure: "Quote + Source + Reflection + Question",
        example: "\"The only way to do great work is to love what you do.\" - Steve Jobs. This principle guides everything we create. What drives your passion?"
      },
      {
        id: "success-story",
        name: "Success Story",
        description: "Highlight a success story",
        structure: "Challenge + Journey + Outcome + Lesson",
        example: "When we started, everyone said it couldn't be done. Two years and countless late nights later, we've helped 10,000+ customers achieve their goals. The lesson? Persistence pays off."
      },
      {
        id: "milestone",
        name: "Milestone",
        description: "Celebrate a milestone",
        structure: "Achievement + Gratitude + Journey + Future",
        example: "One million customers served! We're incredibly grateful for your support on this amazing journey. From our humble beginnings to where we are today—we couldn't have done it without you. Here's to the next million!"
      }
    ]
  },
  {
    id: "informative",
    name: "Informative",
    templates: [
      {
        id: "how-to",
        name: "How-To",
        description: "Provide a useful tutorial",
        structure: "Problem + Solution steps + Result + Resource",
        example: "Struggling with [common problem]? Here's how to solve it in 3 simple steps: 1. [Step one] 2. [Step two] 3. [Step three]. You'll see immediate results in [benefit]. Check out our complete guide for more tips."
      },
      {
        id: "industry-insight",
        name: "Industry Insight",
        description: "Share industry knowledge",
        structure: "Trend + Analysis + Implication + Perspective",
        example: "The latest data shows [industry trend] is growing by 40% year over year. This signals a major shift in how [industry] operates. For businesses, this means [implication]. Our take: those who adapt now will lead tomorrow."
      },
      {
        id: "myth-buster",
        name: "Myth Buster",
        description: "Debunk common misconceptions",
        structure: "Myth + Truth + Evidence + Takeaway",
        example: "Myth: [common misconception]. Truth: [actual fact]. Studies consistently show that [evidence]. The bottom line? Don't let outdated information hold you back from [benefit]."
      }
    ]
  }
];

export const getTemplateById = (templateId: string): Template | undefined => {
  for (const category of templateCategories) {
    const template = category.templates.find(t => t.id === templateId);
    if (template) return template;
  }
  return undefined;
};

export const getCategoryById = (categoryId: string): TemplateCategory | undefined => {
  return templateCategories.find(c => c.id === categoryId);
};

export const getThemeById = (themeId: string): Theme | undefined => {
  return themes.find(t => t.id === themeId);
};
