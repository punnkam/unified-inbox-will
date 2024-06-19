import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Teams</h1>
          <p className="text-subtitle-sm text-tertiary">
            Organize your members into teams
          </p>
        </div>
        <Link href="./teams/add">
          <Button variant="default">
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
