
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const SearchBox = ({ onSearch, isSearching }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="opacity-0 animate-fade-in animation-delay-300 max-w-2xl mx-auto"
    >
      <div className="glass flex items-center gap-2 p-2 rounded-full border border-nature-200 shadow-md transition-all hover:shadow-lg">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter an item (e.g., water bottle, newspaper, old t-shirt)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-md placeholder:text-nature-400"
        />
        <Button 
          type="submit" 
          className="rounded-full bg-nature-500 hover:bg-nature-600 text-white px-6 transition-all"
          disabled={isSearching || !query.trim()}
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching
            </span>
          ) : (
            "Get Ideas"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBox;
