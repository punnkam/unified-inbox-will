import { SidebarTrigger } from "./SidebarTrigger";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-[28px] px-4 md:px-8 pt-8 pb-3 border-b border-primary bg-primary-subtle overflow-y-hidden md:overflow-y-clip">
      <div className="flex flex-wrap md:flex-nowrap gap-2 items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />

          <Skeleton className="text-title-3xl h-[38px] w-[300px] rounded-lg" />
        </div>
        <div className="flex items-center relative w-full sm:w-fit">
          <Skeleton className="pl-10 rounded-xl w-full md:max-w-sm md:w-[300px] h-10" />
        </div>
      </div>

      {/* badges */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 overflow-x-auto px-1 md:py-1 md:px-0">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="rounded-xl h-[157px] w-full min-w-[24%] border border-primary"
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[110px] rounded-md" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[23px] md:w-[110px] rounded-md" />
          <Skeleton className="h-10 w-[23px] md:w-[110px] rounded-md" />
        </div>
      </div>
    </div>
  );
}
