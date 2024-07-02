import { SidebarTable } from "./sidebarTable";

export const InboxChatSidebar = () => {
  return (
    <div className="h-screen flex flex-col justify-between bg-primary-subtle w-[calc(100vw-74px)] md:w-[300px] md:min-w-[300px] border-e border-primary overflow-clip">
      <SidebarTable />
    </div>
  );
};
