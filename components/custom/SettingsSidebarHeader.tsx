export const SettingsSidebarHeader = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 text-tertiary text-bold-section font-bold uppercase px-4 mb-2">
      {icon}
      <p>{title}</p>
    </div>
  );
};
