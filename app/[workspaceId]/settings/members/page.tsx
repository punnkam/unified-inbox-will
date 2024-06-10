import { Button } from "@/components/ui/button";
import { Member, columns } from "./columns";
import { DataTable } from "./data-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "James Doe",
      role: "Admin",
      email: "m@example.com",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Jack Doe",
      role: "Member",
      email: "jack@gmail.com",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "John Doe",
      role: "External Team",
      email: "john@gmail.com",
      status: "Active",
      image:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      name: "Jose Doe",
      role: "Member",
      email: "jose@gmail.com",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // ...
  ];
}

export default async function MembersPage() {
  const data = await getData();

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
          <Button variant="default">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add
          </Button>
        </Link>
      </div>

      <div className="border-b border-primary"></div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
