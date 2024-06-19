import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../saved-replies">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All saved replies
          </Button>
        </Link>
        <h1 className="text-title-2xl">Add saved reply</h1>
      </div>

      <div className="border-b border-primary"></div>

      <p>loading...</p>
    </div>
  );
}
