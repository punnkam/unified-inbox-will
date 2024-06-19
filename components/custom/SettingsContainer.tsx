export const SettingsContainer = ({
  title,
  description,
  icon,
  image,
  children,
  action,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between items-start border border-secondary rounded-md p-4">
      <div className="flex items-center gap-2">
        {icon && !image && (
          <div className="w-10 h-10 flex justify-center items-center">
            {icon}
          </div>
        )}
        {image && <img src={image} alt="icon" className="w-10 h-10" />}
        <div className="flex flex-col gap-1">
          {title && <p className="text-subtitle-xs">{title}</p>}
          {description && (
            <p className="text-body-2xs font-normal text-tertiary">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
