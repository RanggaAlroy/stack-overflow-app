import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div>
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
        <div className="mt-11 flex gap-6 max-sm:flex-col">
          <Skeleton className="h-14 flex-1" />
          <Skeleton className="h-14 w-28" />
        </div>
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        {[...Array(6)].map(item => (
          <Skeleton className="h-48 w-48 rounded-xl" key={item} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
