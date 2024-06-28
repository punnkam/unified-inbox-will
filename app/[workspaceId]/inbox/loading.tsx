import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./SidebarTrigger";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-[28px] px-4 md:px-8 pt-8 pb-3 border-b border-primary bg-primary-subtle overflow-y-hidden md:overflow-y-clip">
        <div className="flex flex-wrap md:flex-nowrap gap-2 items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />

            <Skeleton className="text-title-3xl h-[38px] w-[200px] md:w-[300px] rounded-lg" />
          </div>
          <div className="flex items-center relative w-full sm:w-fit">
            <Skeleton className="pl-10 rounded-xl w-full md:max-w-sm md:w-[300px] h-10" />
          </div>
        </div>

        {/* badges */}
        <div className="flex flex-col md:flex-row md:flex-nowrap overflow-y-auto md:overflow-y-clip md:overflow-x-auto px-1 md:py-1 md:px-0 md:h-fit">
          {Array.from({ length: 4 }).map((_, index, array) => {
            return (
              <div
                className={cn(
                  "py-2 md:px-2 md:py-0",
                  index === 0
                    ? "md:pl-0 md:min-w-[25%] md:w-1/4"
                    : index === array.length - 1
                    ? "md:pr-0 md:min-w-[25%] md:w-1/4"
                    : "md:min-w-[25%] md:w-1/4"
                )}
              >
                <Skeleton
                  key={index}
                  className={cn(
                    "rounded-xl h-[157px] w-full min-w-[24%] border border-primary"
                  )}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[110px] rounded-md" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 md:w-[110px] rounded-md" />
            <Skeleton className="h-10 w-10 md:w-[110px] rounded-md" />
          </div>
        </div>
      </div>
      <div className="bg-primary shadow-inner h-full overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex w-full justify-between items-center px-4 md:px-8 border-b border-primary h-[95px]"
            >
              <div className="flex gap-3 items-center">
                <Skeleton className="size-10 min-w-10 min-h-10 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[19px] w-28 rounded-full" />

                  <div className="flex items-center gap-2">
                    <Skeleton className="h-[25px] w-[82px] rounded-full" />
                    <Skeleton className="h-[16px] w-20 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Skeleton className="h-[19px] w-72 rounded-full" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-[25px] w-[90px] rounded-full" />
                  <Skeleton className="h-[25px] w-[190px] rounded-full" />
                  <Skeleton className="h-[25px] w-[90px] rounded-full" />
                  <Skeleton className="h-[25px] w-[120px] rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Skeleton className="h-[19px] w-32 rounded-full" />
                <Skeleton className="h-[26px] w-[90px] rounded-full" />
              </div>
              <div className="flex flex-col gap-2 justify-center items-end">
                <Skeleton className="size-5 min-w-5 min-h-5 rounded-full" />
                <Skeleton className="h-[16px] w-16 rounded-full" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
