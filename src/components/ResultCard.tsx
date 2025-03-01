
import React, { useEffect, useRef } from "react";
import { RecyclingItem } from "@/utils/recyclingData";

interface ResultCardProps {
  item: string;
  data?: RecyclingItem;
  isGeneric?: boolean;
}

const ResultCard = ({ item, data, isGeneric = false }: ResultCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the result card when it appears
    if (cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div
      ref={cardRef}
      className="mt-12 md:mt-16 opacity-0 animate-scale-in"
    >
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          {!isGeneric ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider bg-nature-100 text-nature-700 px-3 py-1 rounded-full">
                  Specific Ideas
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-nature-800 mb-6">
                Recycling Ideas for {item.charAt(0).toUpperCase() + item.slice(1)}
              </h2>
              
              {data?.suggestions && (
                <div className="mb-8">
                  <ul className="space-y-3">
                    {data.suggestions.map((suggestion, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 p-4 bg-white/50 rounded-xl transition-all hover:bg-white/80"
                      >
                        <span className="text-nature-500 flex-shrink-0 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {data?.howTo && (
                <div>
                  <h3 className="text-lg font-medium text-nature-700 mb-3">How to do it:</h3>
                  <p className="text-nature-600 bg-white/50 p-4 rounded-xl">{data.howTo}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider bg-nature-100 text-nature-700 px-3 py-1 rounded-full">
                  General Tips
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-nature-800 mb-6">
                Recycling Ideas for {item.charAt(0).toUpperCase() + item.slice(1)}
              </h2>
              <p className="mb-4 text-nature-600">
                We don't have specific suggestions for "{item}" yet, but here are some general recycling tips:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl transition-all hover:bg-white/80">
                  <span className="text-nature-500 flex-shrink-0 mt-0.5">•</span>
                  <span>Check if your local recycling center accepts this material</span>
                </li>
                <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl transition-all hover:bg-white/80">
                  <span className="text-nature-500 flex-shrink-0 mt-0.5">•</span>
                  <span>Consider donating if the item is still in good condition</span>
                </li>
                <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl transition-all hover:bg-white/80">
                  <span className="text-nature-500 flex-shrink-0 mt-0.5">•</span>
                  <span>Search online for DIY upcycling projects specific to your item</span>
                </li>
                <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl transition-all hover:bg-white/80">
                  <span className="text-nature-500 flex-shrink-0 mt-0.5">•</span>
                  <span>For electronics, look for e-waste recycling programs in your area</span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
