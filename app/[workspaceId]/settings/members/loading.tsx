import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Members</h1>
          <p className="text-subtitle-sm text-tertiary">
            Add and manage your members
          </p>
        </div>
        <Link href="./members/add">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add
          </Button>
        </Link>
      </div>

      <div className="border-b border-primary"></div>
      <p>loading...</p>
    </div>
  );
}
