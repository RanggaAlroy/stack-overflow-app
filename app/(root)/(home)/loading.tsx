import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col">
        <div className="flex w-full flex-row items-center justify-between">
          <h4 className="h2-bold text-dark100_light900">All Questions</h4>

          <Button className="btn primary-gradient min-h-[46px] px-4 py-3 font-medium text-light-900 transition-colors">
            Ask a Question
          </Button>
        </div>
        <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
          <Skeleton className="h-14 flex-1" />
          <div className="hidden max-md:block">
            <Skeleton className="h-14 w-28" />
          </div>
        </div>

        <div className="my-10 hidden flex-wrap gap-6 md:flex">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-40" />
        </div>

        <div className="flex flex-col gap-6">
          {[...Array(4)].map(item => (
            <Skeleton className="h-48 w-full rounded-xl" key={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
