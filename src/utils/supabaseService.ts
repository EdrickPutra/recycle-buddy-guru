
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface RecyclingItem {
  suggestions: string[];
  howTo: string;
}

// Function to search for items in Supabase
export const searchItems = async (query: string) => {
  try {
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      return {
        item: "",
        data: null,
        score: 0
      };
    }
    
    // First try exact match
    const { data: exactMatches } = await supabase
      .from('items')
      .select(`
        *,
        items_ideas!inner (
          idea_id,
          ideas (
            title, 
            description, 
            instructions
          )
        )
      `)
      .ilike('name', normalizedQuery);
    
    if (exactMatches && exactMatches.length > 0) {
      // Process the first exact match
      const item = exactMatches[0];
      const suggestions = item.items_ideas.map((ii: any) => ii.ideas.description);
      const howTo = item.items_ideas[0]?.ideas.instructions || "";
      
      return {
        item: item.name,
        data: {
          suggestions,
          howTo
        },
        score: 1
      };
    }
    
    // If no exact match, try partial match
    const { data: partialMatches } = await supabase
      .from('items')
      .select(`
        *,
        items_ideas!inner (
          idea_id,
          ideas (
            title, 
            description, 
            instructions
          )
        )
      `)
      .ilike('name', `%${normalizedQuery}%`);
    
    if (partialMatches && partialMatches.length > 0) {
      // Process the first partial match
      const item = partialMatches[0];
      const suggestions = item.items_ideas.map((ii: any) => ii.ideas.description);
      const howTo = item.items_ideas[0]?.ideas.instructions || "";
      
      // Calculate similarity score
      const score = Math.min(normalizedQuery.length, item.name.length) / 
                    Math.max(normalizedQuery.length, item.name.length);
      
      return {
        item: item.name,
        data: {
          suggestions,
          howTo
        },
        score: score
      };
    }
    
    // No matches found
    return {
      item: normalizedQuery,
      data: null,
      score: 0
    };
  } catch (error) {
    console.error("Error searching items:", error);
    toast({
      title: "Error",
      description: "Failed to search for recycling ideas. Please try again.",
      variant: "destructive"
    });
    return {
      item: query,
      data: null,
      score: 0
    };
  }
};
