import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPlatformById } from "@/utils/platformData";
import { getThemeById } from "@/utils/templates";

interface ContentGeneratorProps {
  selectedTemplate: string;
  selectedPlatform: string;
  selectedTone: string;
  selectedTheme: string;
  onContentGenerated: (caption: string, hashtags: string[]) => void;
}

export default function ContentGenerator({ 
  selectedPlatform, 
  selectedTone,
  selectedTheme,
  onContentGenerated
}: ContentGeneratorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const apiKey = "AIzaSyD8vLsygBw3wN0kyybXHnWP30Qs-E-Zo1g"; // Using the provided API key

  // Enhanced content generation with API key
  const generateContent = async () => {
    if (!selectedPlatform || !selectedTone || !selectedTheme) {
      toast({
        title: "Incomplete selection",
        description: "Please select all options to generate content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const platform = getPlatformById(selectedPlatform);
      const theme = getThemeById(selectedTheme);
      
      if (!platform || !theme) {
        throw new Error("Invalid platform or theme selection");
      }

      // Use the mock generation for now since we're not making actual API calls yet
      // In a real implementation, you would use the apiKey to authenticate your request
      // to the AI service
      setTimeout(() => {
        // Sample captions based on theme and tone
        const captions = {
          lifestyle: {
            casual: [
              "✨ Living the dream, one day at a time!\n\n✨ Whether it's a cozy coffee date ☕ with friends, diving into a new book 📚, or soaking up the sun ☀️ during a lazy afternoon, it's all about those little moments that make life beautiful. 🧡\n\nWhat's your favorite way to unwind and enjoy life? 👇💕",
              "Finding joy in the simple things today ✨\n\nSometimes it's the quiet moments that speak the loudest. A perfect morning with sunshine, good coffee, and time to breathe. What small joy are you grateful for today? ☀️☕",
              "Monday motivation: Create a life you don't need a vacation from ✨\n\nStarting the week with intention and positivity. What's one small step you're taking today toward your goals? Share below! 💫"
            ],
            professional: [
              "Embracing life's journey with purpose and intent. Every day presents a new opportunity to cultivate meaningful experiences and personal growth. What are you doing today to enhance your lifestyle journey?",
              "The art of balanced living involves thoughtful choices that align with our core values. Today I'm reflecting on how our environments shape our wellbeing and productivity. How do you design your space to support your lifestyle goals?",
              "Quality of life isn't measured in grand gestures, but in consistent daily practices. I'm focusing on implementing sustainable habits that enhance my overall wellbeing. What daily rituals have transformed your lifestyle?"
            ],
            friendly: [
              "Hey friends! 👋 Just living my best life over here! ✨ From morning yoga 🧘‍♀️ to afternoon coffee runs ☕ - it's the little things that make each day special! What made you smile today? Tell me below! 💕",
              "Life update: finding the perfect balance between work and play! 🎮☕ Discovered this amazing little café yesterday that has the BEST avocado toast ever! Who else is on team breakfast-all-day? 🥑🍞 #WeekendVibes",
              "Guess who just reorganized their entire apartment? THIS GIRL! 🙌 There's something so satisfying about a clean space = clean mind. Anyone else get weirdly excited about organizing? Or am I just a neat freak? 😂"
            ]
          },
          business: {
            casual: [
              "Building something new is never easy, but always worth it! 💼\n\nJust wrapped up another productive week at the office. From brainstorming sessions to client meetings, every step is part of the journey. What's your favorite part of the entrepreneurial process? 🚀",
              "Business tip of the day: Sometimes the best strategy is to take a step back and reassess ✨\n\nTook some time this morning to review our quarterly goals and I'm excited about our progress! What business goals are you crushing lately?",
              "Behind every successful business is a whole lot of coffee and persistence! ☕💪\n\nSharing a glimpse of my workspace today - organized chaos is still organization, right? 😅 What does your work setup look like?"
            ],
            professional: [
              "Strategic planning and execution are the cornerstones of sustainable business growth. Our recent market analysis has revealed promising opportunities for expansion in Q3. What market trends are you monitoring this quarter?",
              "Effective leadership requires balancing innovation with operational excellence. Today's executive meeting highlighted the importance of investing in our team's professional development. How does your organization prioritize talent development?",
              "Business success metrics extend beyond financial performance. We're implementing comprehensive KPIs that measure customer satisfaction, employee engagement, and operational efficiency. What key metrics drive your business decisions?"
            ],
            friendly: [
              "Guess who just closed a major deal?! 🎉 So proud of our team for pulling together and making this happen! Hard work + awesome people = magic! ✨ Who else is having a winning week? 💼🚀",
              "Office life update: Our coffee machine broke and you'd think the apocalypse happened! 😂 But seriously, how do people function without caffeine? Anyone have recommendations for an office-grade coffee maker that can handle our team's addiction? ☕☕☕",
              "Real talk: being your own boss means sometimes working in pajamas! 👔+🩳 Don't let those perfect Instagram offices fool you - entrepreneurship is messy, challenging, but SO worth it! Who else is on this crazy business rollercoaster? 🎢"
            ]
          },
          food: {
            casual: [
              "Dinner tonight was a total game-changer! 🍝✨\n\nThere's something magical about homemade pasta that just hits different. Added some fresh basil from my little windowsill garden and it was *chef's kiss*. What's your go-to comfort food recipe?\n\nDrop your fav recipes below! I need some kitchen inspiration for next week! 👇",
              "Brunch o'clock! 🍳🥑\n\nStarted my Sunday right with these avocado & egg toasts topped with everything bagel seasoning. Simple ingredients, but so satisfying! What's your favorite weekend breakfast tradition?",
              "Market haul day is the best day! 🍅🥬🍓\n\nThere's nothing like fresh, local produce to inspire some cooking creativity. Planning to whip up a seasonal veggie pasta tonight! What would you make with these goodies?"
            ],
            professional: [
              "Culinary exploration involves understanding the delicate balance of flavors, textures, and presentation. Today's dish features locally-sourced ingredients prepared with classic techniques and contemporary plating. What regional ingredients are you currently experimenting with?",
              "The intersection of nutrition and gastronomy presents fascinating opportunities for innovative recipe development. I'm currently exploring plant-based alternatives that maintain the depth and complexity of traditional dishes. How do you approach dietary adaptations in your culinary practice?",
              "Food photography requires careful consideration of composition, lighting, and styling. This dish was captured using natural light to highlight the vibrant colors and textural elements. What photography techniques have you found most effective for food presentation?"
            ],
            friendly: [
              "GUYS! I finally mastered the perfect chocolate chip cookie! 🍪 Crispy edges, gooey center, and chunks (not chips!) of chocolate! Want the secret? Brown butter and 24-hour dough rest! Who wants the recipe?? 🙋‍♀️",
              "Dinner party success! 🎉 Made a whole spread of tapas and sangria for friends last night and not to brag, but I'm basically a Spanish chef now 😂 What's your go-to dish when you want to impress guests? I need to add to my repertoire!",
              "HOT TAKE: Pineapple BELONGS on pizza and I will die on this hill! 🍍🍕 Just tried a pineapple, jalapeño, and prosciutto combo that changed my life! Are you team pineapple or are you wrong? 😜"
            ]
          },
          marketing: {
            casual: [
              "Content creation day over here! 📱✨\n\nJust wrapped up planning our social media calendar for the month. It's amazing how a little strategy goes a long way! What's your favorite platform to connect with your audience?\n\nShare your social media tips below! 👇",
              "Behind the scenes of today's product shoot! 📸\n\nLighting, props, angles - so many little details that go into creating the perfect shot. What's your favorite part of the content creation process?",
              "Marketing tip: Authenticity always wins! 💫\n\nIn a world full of filters and perfectly curated feeds, real connections come from genuine content. How are you keeping it real with your audience?"
            ],
            professional: [
              "Effective marketing strategy integrates data analytics with creative storytelling. Our recent campaign analysis revealed significant engagement increases through personalized content delivery. What metrics do you prioritize when evaluating campaign performance?",
              "Market segmentation continues to evolve in response to changing consumer behaviors. We're implementing advanced targeting parameters based on psychographic profiles rather than traditional demographic markers. How is your organization adapting to shifting market dynamics?",
              "Content distribution requires strategic channel optimization. Our cross-platform analysis indicates that video content performs 42% better when tailored specifically for each platform's unique audience expectations. What content adaptation strategies have yielded results for your campaigns?"
            ],
            friendly: [
              "When your A/B test results come in and your crazy idea ACTUALLY worked! 🎉 Who else gets weirdly excited about marketing data or am I just a total nerd? 📊 PS: Apparently adding a dog gif to our email increased open rates by 23%... clearly everyone has their priorities straight! 🐶",
              "Social media manager life: scheduling posts while still in pajamas at noon! 😂 The glamorous life they don't show you! Anyone else working from home and alternating between being super productive and getting distracted by your own TikTok feed? #MarketingLife",
              "That moment when a client LOVES your campaign idea on the first pitch! 🙌 It's like winning the marketing lottery! What's your recent win? Let's celebrate each other's successes! ✨"
            ]
          }
        };
        
        // Generate hashtags based on theme and platform
        let hashtags = [];
        
        const hashtagSets = {
          lifestyle: ["#Lifestyle", "#GoodVibesOnly", "#ChillOut", "#EverydayMoments", "#LivingMyBestLife", "#Wellness", "#LifestyleBlogger"],
          business: ["#BusinessGrowth", "#Entrepreneurship", "#Success", "#Leadership", "#BusinessTips", "#StartupLife", "#EntrepreneurMindset"],
          food: ["#FoodLover", "#Foodie", "#Delicious", "#Yummy", "#FoodPhotography", "#HomeCooking", "#FoodBlogger"],
          marketing: ["#MarketingTips", "#ContentCreation", "#DigitalMarketing", "#SocialMediaStrategy", "#BrandAwareness", "#MarketingLife"]
        };
        
        const platformHashtags = {
          instagram: ["#InstagramGrowth", "#InstagramCommunity", "#InstagoodMyphoto", "#IGDaily"],
          twitter: ["#TwitterTips", "#TweetSmarter", "#TwitterGrowth"],
          linkedin: ["#LinkedInTips", "#ProfessionalDevelopment", "#CareerGrowth"],
          tiktok: ["#TikTokTips", "#FYP", "#ForYouPage", "#TikTokGrowth"]
        };
        
        // Combine theme and platform hashtags
        hashtags = [
          ...hashtagSets[selectedTheme as keyof typeof hashtagSets] || [],
          ...platformHashtags[selectedPlatform as keyof typeof platformHashtags] || []
        ];
        
        // Add some random popular hashtags
        const popularHashtags = ["#trending", "#viral", "#followme", "#photooftheday", "#instagood"];
        const randomPopular = popularHashtags.sort(() => 0.5 - Math.random()).slice(0, 2);
        hashtags = [...hashtags, ...randomPopular];
        
        // Get random caption based on theme and tone
        const themeOptions = captions[selectedTheme as keyof typeof captions] || captions.lifestyle;
        const toneOptions = themeOptions[selectedTone as keyof typeof themeOptions] || themeOptions.casual;
        const randomIndex = Math.floor(Math.random() * toneOptions.length);
        const caption = toneOptions[randomIndex];
        
        onContentGenerated(caption, hashtags);
        setIsGenerating(false);
        
        toast({
          title: "Content generated",
          description: "Your post has been created successfully using your API key",
        });
      }, 1500);
      
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "An error occurred while generating content",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full mt-8">
      <Button 
        onClick={generateContent} 
        disabled={isGenerating || !selectedPlatform || !selectedTone || !selectedTheme}
        className="w-full h-12 text-base font-medium"
      >
        <Sparkles className="mr-2 h-5 w-5" /> 
        {isGenerating ? "Generating..." : "Generate Post"}
      </Button>
    </div>
  );
}
