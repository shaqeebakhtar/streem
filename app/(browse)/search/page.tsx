import { redirect } from 'next/navigation';
import Results, { ResultsSkeleton } from './_components/results';
import { Suspense } from 'react';

type SearchPageProps = {
  searchParams: {
    query?: string;
  };
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.query) {
    redirect('/');
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results query={searchParams.query} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
