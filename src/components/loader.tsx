// components/Loader.tsx
import React from "react";
import { Card } from "@/components/ui/card";

interface LoaderProps {
  itemCount?: number;
  showHeader?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  itemCount = 3,
  showHeader = true
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .loader-container {
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 4rem 0;
        }
        .loader-card {
          border: 1px solid #e5e7eb;
        }
        .loader-skeleton {
          background-color: #e5e7eb;
          border-radius: 0.25rem;
        }
        .loader-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background-color: #d1fae5;
          color: #065f46;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
        }
      `}</style>

      <div className="loader-container">
        <div className="container mx-auto px-4">
          {showHeader && (
            <div className="text-center mb-12">
              <div className="h-9 w-48 mx-auto mb-4 loader-skeleton animate-pulse rounded-full"></div>
              <div className="h-5 w-64 mx-auto loader-skeleton animate-pulse rounded-full"></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: itemCount }).map((_, index) => (
              <Card key={`loader-item-${index}`} className="loader-card animate-pulse">
                <div className="p-0 relative">
                  <div className="w-full h-48 loader-skeleton"></div>
                  <div className="loader-badge loader-skeleton w-16 h-6"></div>
                </div>
                <div className="p-6">
                  <div className="h-7 w-3/4 mb-3 loader-skeleton rounded"></div>
                  <div className="h-4 w-full mb-4 loader-skeleton rounded"></div>
                  <div className="h-6 w-1/4 mb-4 loader-skeleton rounded"></div>
                  <div className="h-10 w-full loader-skeleton rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
