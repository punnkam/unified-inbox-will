import { ConversationTag, fakeIconsData } from "@/lib/types";
import { IconComponent } from "@/components/icons/IconComponent";
import clsx from "clsx";

export const ConvoTag = ({ convoTag }: { convoTag: ConversationTag }) => {
  return (
    <div className="flex justify-between items-start gap-2 rounded-lg border border-primary p-5 hover:bg-hover active:bg-pressed">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          {convoTag.iconId ? (
            <div>
              {fakeIconsData.find((icon) => icon.id === convoTag.iconId) && (
                <IconComponent
                  icon={
                    fakeIconsData.find((icon) => icon.id === convoTag.iconId)
                      ?.icon || fakeIconsData[0].icon
                  }
                  classNames={clsx(
                    "text-icon-tertiary w-3 h-3",
                    convoTag.type.color === "error" && "text-icon-error",
                    convoTag.type.color === "success" && "text-icon-success",
                    convoTag.type.color === "active" && "text-icon-active",
                    convoTag.type.color === "tertiary" && "text-icon-tertiary"
                  )}
                />
              )}
            </div>
          ) : (
            <div>
              <IconComponent
                icon={fakeIconsData[0].icon}
                classNames={clsx(
                  "text-icon-tertiary w-3 h-3",
                  convoTag.type.color === "error" && "text-icon-error",
                  convoTag.type.color === "success" && "text-icon-success",
                  convoTag.type.color === "active" && "text-icon-active",
                  convoTag.type.color === "tertiary" && "text-icon-tertiary"
                )}
              />
            </div>
          )}
          {convoTag.name === "" ? (
            <p className="text-placeholder text-subtitle-sm">Access issue</p>
          ) : (
            <p className="text-primary text-subtitle-sm">{convoTag.name}</p>
          )}
        </div>
        {convoTag.description === "" ? (
          <p className="text-placeholder text-body-xs font-normal">
            A guest said they can’t access the property
          </p>
        ) : (
          <p className="text-tertiary text-body-xs font-normal">
            {convoTag.description}
          </p>
        )}
      </div>
      <div>
        <p className="text-icon-active text-bold-2xs font-bold">
          {convoTag.actionItem}
        </p>
      </div>
    </div>
  );
};
