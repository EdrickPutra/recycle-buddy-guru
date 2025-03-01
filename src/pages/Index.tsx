
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import SearchBox from "@/components/SearchBox";
import ResultCard from "@/components/ResultCard";
import { searchItems } from "@/utils/supabaseService";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: searchResult, isLoading, refetch } = useQuery({
    queryKey: ['searchItems', searchQuery],
    queryFn: () => searchItems(searchQuery),
    enabled: false, // Don't run on component mount, only when explicitly called
  });

  const handleSearch = async (query: string) => {
    setSearchQuery(query.toLowerCase().trim());
    try {
      refetch();
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Something went wrong with your search. Please try again.",
        variant: "destructive"
      });
    }
  };

  const showResults = searchQuery !== "" && !isLoading;
  const hasSpecificMatch = showResults && searchResult && searchResult.score > 0.5;

  return (
    <Layout>
      <Hero />
      <SearchBox onSearch={handleSearch} isSearching={isLoading} />
      
      {showResults && hasSpecificMatch && searchResult && (
        <ResultCard
          item={searchResult.item}
          data={searchResult.data}
        />
      )}
      
      {showResults && !hasSpecificMatch && searchResult && (
        <ResultCard
          item={searchResult.item}
          isGeneric={true}
        />
      )}
    </Layout>
  );
};

export default Index;
