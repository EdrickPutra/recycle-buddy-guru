
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nature-50 to-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {children}
        
        {/* Supabase connection indicator */}
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-xs font-medium z-50">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-nature-700">Connected to Supabase</span>
        </div>
      </div>
      {/* Abstract shapes for background */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-nature-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute -bottom-8 -left-20 w-72 h-72 bg-nature-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-500" />
    </div>
  );
};

export default Layout;
