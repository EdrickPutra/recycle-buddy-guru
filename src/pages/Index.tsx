
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import SearchBox from "@/components/SearchBox";
import ResultCard from "@/components/ResultCard";
import { findBestMatch, recyclingDatabase } from "@/utils/recyclingData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bestMatch, setBestMatch] = useState("");
  const [matchScore, setMatchScore] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    
    // Simulate a short delay to show loading state
    setTimeout(() => {
      const [match, score] = findBestMatch(query);
      setSearchQuery(query.toLowerCase().trim());
      setBestMatch(match);
      setMatchScore(score);
      setIsSearching(false);
    }, 600);
  };

  const showResults = searchQuery !== "" && !isSearching;
  const hasSpecificMatch = showResults && matchScore > 0.5;

  return (
    <Layout>
      <Hero />
      <SearchBox onSearch={handleSearch} isSearching={isSearching} />
      
      {showResults && hasSpecificMatch && (
        <ResultCard
          item={bestMatch}
          data={recyclingDatabase[bestMatch]}
        />
      )}
      
      {showResults && !hasSpecificMatch && (
        <ResultCard
          item={searchQuery}
          isGeneric={true}
        />
      )}
    </Layout>
  );
};

export default Index;
