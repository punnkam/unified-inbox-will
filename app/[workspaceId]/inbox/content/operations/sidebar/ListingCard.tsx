import { Listing, fakeListingGroupsData } from "@/lib/realDataSchema";
import { LabelsTagsGroups } from "../../components/LabelsTagsGroups";

export const ListingCard = ({ listingData }: { listingData: Listing }) => {
  // find the listing group data for the listing
  const listingGroup = fakeListingGroupsData.find((listingGroup) =>
    listingGroup.listingIds.includes(listingData.listingId)
  );

  // add the listing group data to the listing data
  listingData.listingGroupData = listingGroup;

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-primary bg-primary truncate">
      <img
        src={listingData.listingImage}
        alt={listingData.name}
        className="size-12 min-w-12 min-h-12 rounded-[4.4px] object-cover"
      />
      <div className="flex flex-col gap-[2px] truncate ">
        <p className="text-subtitle-md truncate">{listingData.name}</p>
        <div className="flex gap-1 items-center">
          {listingData.automated ? (
            <p className="text-subtitle-xs text-success">AI On</p>
          ) : (
            <p className="text-subtitle-xs text-error">AI Off</p>
          )}
          <div className="text-body-2xs bg-icon-tertiary size-[1px] rounded-full" />
          <p className="text-body-xs text-secondary truncate">
            {listingData.address +
              ", " +
              listingData.city +
              ", " +
              listingData.state}
          </p>
        </div>
      </div>

      {listingData.listingGroupData && (
        <LabelsTagsGroups
          text={listingData.listingGroupData?.name}
          color={listingData.listingGroupData?.color}
        />
      )}
    </div>
  );
};
