import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fakeIconsData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/table-accordion";
import { EditIcon } from "@/components/icons/CustomIcons";
import { fetchTeams } from "@/app/actions";
import { IconComponent } from "@/components/icons/IconComponent";

export default async function MembersPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const data = await fetchTeams(workspaceId);

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

      <Accordion type="single" collapsible className="flex flex-col gap-4">
        {data.map((team) => {
          // get the icon for the team
          const icon = fakeIconsData.find((icon) => icon.id === team.iconId);

          return (
            <AccordionItem
              key={team.id}
              value={team.name}
              className="border border-secondary rounded-lg"
            >
              <AccordionTrigger className="w-full pl-6 pr-5 py-5 rounded-md text-subtitle-sm group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2 items-center">
                    <div className="h-8 w-8 border rounded-sm shadow-sm text-icon-primary flex justify-center items-center">
                      <IconComponent
                        icon={icon?.icon || fakeIconsData[0].icon}
                      />
                    </div>
                    <div>
                      <p className="text-left">{team.name}</p>
                      <p className="text-tertiary text-body-xs font-normal">
                        {team.members.length} members
                      </p>
                    </div>
                  </div>
                  <Link
                    className="edit-button hidden group-hover:block"
                    href={`./teams/${team.id}`}
                  >
                    <div className="h-9 rounded-md px-3 hover:bg-pressed active:bg-primary inline-flex items-center justify-center whitespace-nowrap text-subtitle-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-icon-active focus-visible:ring-offset-2 ">
                      <EditIcon className="text-icon-tertiary" />
                    </div>
                  </Link>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-2 px-2">
                <DataTable columns={columns} data={team.members} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
