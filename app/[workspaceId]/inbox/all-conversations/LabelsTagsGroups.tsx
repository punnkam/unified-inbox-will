export const LabelsTagsGroups = ({
  text,
  avatar,
  icon,
  emoji,
}: {
  text: string;
  avatar?: string;
  icon?: React.ReactNode;
  emoji?: string;
}) => {
  return (
    <div className="flex items-center gap-1 rounded-full px-2 py-[6px] border border-secondary w-fit">
      {icon && <div>{icon}</div>}

      {avatar && (
        <img
          src={avatar}
          alt="icon"
          className="w-4 h-4 rounded-full object-cover"
        />
      )}

      {emoji && (
        <span role="img" aria-label="Emoji" className="text-body-2xs">
          {String.fromCodePoint(parseInt(emoji, 16))}
        </span>
      )}

      <p className=" text-body-2xs">{text}</p>
    </div>
  );
};
