import { Avatar } from "./Avatar";

export const InChatActivity = ({
  title,
  description,
  image,
  icon,
  time,
  action,
  onAction,
}: {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  time?: string;
  action?: string;
  onAction?: () => void;
}) => {
  const handleAction = () => {
    onAction && onAction();
  };

  return (
    <div className="self-end flex items-center gap-2 py-3 pr-4 pl-3 border border-primary rounded-lg w-min">
      <div className="flex space-x-[-12px] items-center">
        {image && <Avatar size={"medium"} image={image} />}
        {icon && (
          <div className="size-9 flex items-center justify-center p-2 rounded-full bg-secondary text-brand z-10 border border-white">
            {icon}
          </div>
        )}
      </div>

      <div className="w-full truncate">
        <div className="flex items-center justify-between w-full">
          <p className="text-subtitle-xs">{title}</p>
          <p className="text-body-2xs text-tertiary">{time}</p>
        </div>
        <p className="text-body-xs text-secondary truncate">
          {description}{" "}
          <span
            className="text-link hover:text-link-bold hover:cursor-pointer"
            onClick={handleAction}
          >
            {action}
          </span>
        </p>
      </div>
    </div>
  );
};
