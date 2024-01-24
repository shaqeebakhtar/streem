import { getSearchResults } from '@/services/search';
import { Divide } from 'lucide-react';
import React from 'react';
import ResultCard, { ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

type ResultsProps = {
  query?: string;
};

const Results = async ({ query }: ResultsProps) => {
  const results = await getSearchResults(query);

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">
        Results for term &quot;{query}&quot;
      </h3>
      {results.length === 0 && (
        <div className="h-96 w-full text-center grid place-items-center">
          <p className="text-zinc-500 text-sm">
            No results found. Try searching for something else.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-y-4">
        {results.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export default Results;

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4 bg-zinc-800" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
