import { Member } from "@/lib/realDataSchema";
import { Avatar } from "./sidebar/Avatar";

export const MultiplayerTyping = ({
  membersTyping,
}: {
  membersTyping: Member[];
}) => {
  if (membersTyping.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {membersTyping.length > 2 ? (
        <>
          <div className="flex space-x-[-4px]">
            {membersTyping.map((member, index) => (
              <Avatar
                key={index}
                size={"3xs"}
                image={member.image}
                greenDot={true}
              />
            ))}
          </div>
          <p className="text-subtitle-2xs text-tertiary">
            {membersTyping.length} people are typing...
          </p>
        </>
      ) : membersTyping.length === 2 ? (
        <>
          <div className="flex space-x-[-4px]">
            {membersTyping.map((member, index) => (
              <Avatar
                key={index}
                size={"3xs"}
                image={member.image}
                greenDot={true}
              />
            ))}
          </div>
          <p className="text-subtitle-2xs text-tertiary">
            {membersTyping[0].name?.split(" ")[0]} and{" "}
            {membersTyping[1].name?.split(" ")[0]} are typing...
          </p>
        </>
      ) : (
        <>
          <Avatar size={"3xs"} image={membersTyping[0].image} greenDot />
          <p className="text-subtitle-2xs text-tertiary">
            {membersTyping[0].name?.split(" ")[0]} is typing...
          </p>
        </>
      )}
    </div>
  );
};
