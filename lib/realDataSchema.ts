// This is the data from pun - currently used on conversations page (not used on settings, yet?)

import {
  User03Icon,
  NotificationBox,
  NavigationPointerIcon,
  Stars01Icon,
  CalendarIcon,
  CornerUpLeftIcon,
  CornerDownRightIcon,
  CircleIcon,
  TagIcon,
  BuildingIcon,
} from "@/components/icons/CustomIcons";
import { fakeIconsData } from "./types";
import { useReactTable } from "@tanstack/react-table";

export interface Conversation {
  id: number | string;
  guest: Guest;
  conversationType?: UnifiedConversationType;
  lastMessage?: MessageItem;
  allMessages?: MessageItem[];
  hasUnreadMessages?: boolean;
  lastMessageReceivedAt?: string | undefined | null;
  lastMessageSentAt?: string | undefined | null;
  lastMessageTimestamp?: number | undefined | null;
  reservation: Reservation;
  pmsPlatform: PMSPlatformEnum;
  hasInboxMessageQueue?: boolean;
  archived?: boolean;
  timezone?: string;
  tags?: ConversationTag[];
  conversationDetails?: ConversationDetails;
  assignee: number | null | undefined;
  assigneeData?: Member;
}

export type ConversationDetails = {
  showSummary?: boolean;
  summary?: ConversationSummary;
  sentiment?: Sentiment;
};

export interface ConversationSummary {
  previousSummary: string;
  conversationNewLines: string;
  currentSummary: string;
  lastMessageId: string | number;
  timestamp: number;
}

export interface Reservation {
  _id?: string;
  id: number | string;
  createdAtTimestamp: number;
  arrivalDate: string;
  departureDate: string;
  checkInTime: string;
  checkOutTime: string;
  guest: Guest;
  numberOfGuests: number;
  listing: Listing;
  listingData: ListingData;
  pmsPlatform: PMSPlatformEnum;
  status: "Current" | "Inquiry" | "Past" | "Cancelled" | null | undefined; //added specific options
  channel: BookingChannel | string;
  customFields?: {
    field: string;
    value: string;
  }[];
  guestNote?: string | null | undefined;
  payment?: {
    isPaid: boolean;
    totalPrice: number;
    currency: string;
  };
  numNights?: number;
  aiPaused?: boolean;
  upsells?: UpsellItem[];
  guestExternalAccountId?: string;
  reservationLabels?: ReservationLabel[];
}

export enum BookingChannel {
  Airbnb = "Airbnb",
  BookingCom = "Booking.com", // Can represent BOOKING and BOOKING_COM from CalryReservationSource
  Vrbo = "Vrbo", // Can represent HOMEAWAY, and VRBOICAL from CalryReservationSource
  Hometogo = "Hometogo", // Adding Hometogo to cover HOMETOGO from CalryReservationSource
  Expedia = "Expedia", // Can represent EXPEDIA from CalryReservationSource
  EdreamsOdiego = "eDreams Odiego", // Adding eDreams Odiego to cover EDREAMS from CalryReservationSource
  Direct = "Direct bookings", // Can represent DIRECT, GOOGLECAL, and any direct booking platform
  Google = "Google", // Can represent GOOGLEADS and potentially other Google-based reservation sources
  Marriott = "Mariott", // Adjusted spelling from Mariott to Marriott, assuming typo
  TripAdvisor = "TripAdvisor", // Can represent TRIPADVISOR, TRIPADVISORRENTALS from CalryReservationSource
  Partner = "Partner sites", // Can serve as a catch-all for various other partners not explicitly listed
  Agoda = "Agoda", // Adding Agoda to cover AGODA from CalryReservationSource
  OTA = "Online Travel Agencies", // Broad category to include various online travel agencies like DESPEGAR, TRAVELOKA, etc.
  IcalImport = "iCal Import", // To represent various iCal import sources like ICALIMPORT1, ICALIMPORT2, ICALIMPORT3
  Unknown = "Unknown", // To safely include any sources that do not fit into the above categories
}

export enum PMSPlatformEnum {
  GUESTY = "Guesty",
  HOSTAWAY = "Hostaway",
  HOSTFULLY = "Hostfully",
  LODGIFY = "Lodgify",
  OWNERREZ = "Ownerrez",
  TOKEET = "Tokeet",
  HOSTIFY = "Hostify",
  BEDS24 = "Beds24",
  SMOOBU = "Smoobu",
  UPLISTING = "Uplisting",
  LODGIX = "Lodgix",
  HOSPITABLE = "Hospitable",
  STREAMLINE = "Streamline",
}

export interface MessageItem {
  _id?: string;
  userId?: string;
  id: number | string;
  text: string;
  attachments?: {
    name?: string;
    extension?: string;
    url: string;
  }[];
  intent?: string;
  urgency?: string;
  timestamp: number;
  author: MessageAuthor;
  generated?: boolean;
  isIncoming: boolean;
  isSeen: boolean;
  status: string;
  type: UnifiedConversationType; // updated to be a real type of convo rather than string
  tags?: ConversationTag[]; // updated to be an array of tags rather than strings
  pictureUrl?: string;
  senderName?: string;
  emailData?: {
    // added this to support email
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
  };
}

export type MessageAuthor = "guest" | "host";

export interface Listing {
  // same as Doc<"listings">
  userId?: string;
  workspaceId: string;
  pmsPlatform: string;
  listingId: string | number;
  name: string;
  internalName?: string;
  propertyType?: string;
  address: string;
  price: number;
  country?: string | null;
  city?: string | null;
  state?: string | null;
  listingImage?: string; // updated to string to expect a url
  numBaths?: number | null;
  numBedrooms?: number | null;
  numBeds?: number | null;
  isBooked?: boolean; // unused
  automated?: boolean; // unused
  formData: any;
  faqData: any;
  policies?: any;
  unsavedLearnings?: string[];
  savedLearnings?: string[];
  lastDynamicLearning?: number;
  chatEnabled?: boolean;
  fullListingMetadata?: string;
  slackChannelId?: string;
  customFields?: {
    field: any;
    value: any;
  }[];
  listingGroupData?: ListingGroup; // this data is added in actions.ts fetchAllConversations
}

export interface ListingData {
  // same as Doc<"listingData">
  userId?: string;
  workspaceId: string;
  pmsPlatform: string;
  listingId: string | number;
  listingName: string;
  listingInternalName?: string;
  price: number;
  listingInfo: {
    beds?: number;
    bedrooms?: number;
    bathrooms?: number;
  };
  fullAddress: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  timezone?: string;
  guestBasicInfo?: any;
  checkInOutInfo?: any;
  faqs?: any[];
  cancellationPolicy?: any;
  savedPlaces?: any; // unused
  savedActivities?: any; // unused
  savedSpots?: {
    type:
      | "activity"
      | "restaurant"
      | "hospital"
      | "airport"
      | "train_station"
      | "bus_station"
      | "park"
      | "mall"
      | "grocery_or_supermarket";
    name: string;
    address?: string;
    description?: string;
    distance?: string;
    duration?: string;
    imageUrl?: string;
  }[];
  listingDescription?: any;
  houseRules?: any;
  maxGuests?: any;
  amenities?: any;
  listingImages?: any;
  customFields?: any;
  additionalInfo?: any;
  guidebookUrl?: string;
  guidebookScrapedContents?: any;
  directionsAndArea?: {
    directions?: string;
    area?: string;
  };
  audit?: {
    listingId: string | number;
    faqs: {
      faq: string;
      intent: string;
      response: string;
      approved?: boolean;
      notes?: string;
    }[];
  };
  squareMeters?: number;
  doorcode?: string;
}

export interface UpsellItem {
  id: string;
  type: string;
  status: UpsellStatusEnum;
  newCheckInDate?: string;
  newCheckOutDate?: string;
  totalPriceWithDiscount?: number;
  currency?: string;
  finalMessage: string;
}

export enum UpsellStatusEnum {
  NotSent = "Not sent",
  Awaiting = "Awaiting reply",
  GuestDeclined = "Guest declined",
  GuestAccepted = "Guest accepted",
  HostDeclined = "Host declined",
  HostAccepted = "Host accepted",
}

export enum Sentiment {
  HAPPY = "HAPPY",
  NEUTRAL = "NEUTRAL",
  NOT_HAPPY = "NOT HAPPY",
}

export interface Guest {
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  phone?: string | null;
}

export enum UnifiedConversationType {
  SMS = "sms",
  Email = "email",
  Imessage = "imessage",
  Whatsapp = "whatsapp",
  Voice = "voice",
  Ota = "ota",
  Guesty = "guesty",
  Airbnb = "airbnb",
}

export interface ListingGroup {
  id: number; // added an id
  workspaceId: string;
  name: string;
  coverImageUrl?: string;
  color: keyof typeof colorMap; // updated this to be a key of colorMap
  listingIds: (string | number)[];
  slackChannelId?: string;
  slackChannelName?: string;
}

export const fakeListingGroupsData: ListingGroup[] = [
  {
    id: 1,
    workspaceId: "1",
    name: "Big Bear",
    color: "cyan",
    listingIds: [1, 6, 7],
  },
  {
    id: 2,
    workspaceId: "1",
    name: "Lake Tahoe",
    color: "amber",
    listingIds: [2],
  },
  {
    id: 3,
    workspaceId: "1",
    name: "Palm Springs",
    color: "green",
    listingIds: [3, 5],
  },
];

// -------------- new types --------------------------------
export type Workspace = {
  id: string;
  slug: string;
};

export const fakeWorkspaces: Workspace[] = [{ id: "1", slug: "will" }];

export type ReservationLabel = {
  id?: number;
  workspaceId: number;
  name: string;
  description: string;
  emojiId: string;
  autoLabel: boolean;
};

export const fakeReservationLabels: ReservationLabel[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Family",
    description: "Guest who is bringing kids",
    emojiId: "1f46b",
    autoLabel: false,
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Whale",
    description: "Guest whose stay length is > 7 nights",
    emojiId: "1f911",
    autoLabel: false,
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Couple",
    description: "Guest who is on a romantic trip",
    emojiId: "1f496",
    autoLabel: false,
  },
];

export type ConversationTagType = {
  id: number;
  type: "Urgent" | "Money" | "Calendar" | "Other";
  color: "error" | "success" | "active" | "tertiary";
};

export const conversationTagTypes: ConversationTagType[] = [
  { id: 1, type: "Urgent", color: "error" },
  { id: 2, type: "Money", color: "success" },
  { id: 3, type: "Calendar", color: "active" },
  { id: 4, type: "Other", color: "tertiary" },
];

export type ConversationTag = {
  id?: number;
  workspaceId: number;
  iconId?: number;
  name: string;
  description: string;
  type: ConversationTagType;
  actionItem: "Mark as done" | "Create task";
  inboxDashboard?: boolean;
};

export const fakeConversationTags: ConversationTag[] = [
  {
    id: 1,
    workspaceId: 1,
    iconId: 0,
    name: "Early Check-In",
    description:
      "This conversation needs immediate attention reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeealllly long description",
    type: conversationTagTypes[0],
    actionItem: "Mark as done",
    inboxDashboard: true,
  },
  {
    id: 2,
    workspaceId: 1,
    iconId: 1,
    name: "Late Checkout",
    description: "This conversation is about money",
    type: conversationTagTypes[1],
    actionItem: "Create task",
    inboxDashboard: true,
  },
  {
    id: 3,
    workspaceId: 1,
    iconId: 2,
    name: "Forgotten item",
    description: "This conversation is about scheduling",
    type: conversationTagTypes[2],
    actionItem: "Create task",
    inboxDashboard: true,
  },
  {
    id: 4,
    workspaceId: 1,
    iconId: 3,
    name: "Other thing",
    description: "This conversation is about something else",
    type: conversationTagTypes[3],
    actionItem: "Mark as done",
    inboxDashboard: true,
  },
  // {
  //   id: 5,
  //   workspaceId: 1,
  //   iconId: 4,
  //   name: "Another thing",
  //   description: "This conversation is about something else",
  //   type: conversationTagTypes[3],
  //   actionItem: "Mark as done",
  //   inboxDashboard: true,
  // },
  // {
  //   id: 6,
  //   workspaceId: 1,
  //   iconId: 5,
  //   name: "One more thing",
  //   description: "This conversation is about something else",
  //   type: conversationTagTypes[3],
  //   actionItem: "Mark as done",
  //   inboxDashboard: true,
  // },
];

// colors for lisitng groups
export const colorMap = {
  cyan: "bg-cyan-600",
  amber: "bg-amber-500",
  green: "bg-lime-500",
};

export type Member = {
  id?: number;
  teamIds?: number[];
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
};

export const fakeMembersData: Member[] = [
  {
    id: 1,
    name: "James Doe",
    email: "m@example.com",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    teamIds: [2, 4],
    name: "Jack Doe",
    email: "jack@gmail.com",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    teamIds: [1, 2, 3, 4],
    name: "John Doe",
    email: "john@gmail.com",
    image:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    teamIds: [],
    name: "Jose Doe",
    email: "jose@gmail.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Type for a table with conversation data
export type ConversationTable = ReturnType<typeof useReactTable<Conversation>>;

// --------- Generated Data ------------------------------------------

const fakeAllMessages: MessageItem[] = [
  {
    id: 101,
    text: "What time is check-in?",
    timestamp: 1622519100,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 102,
    text: "Check-in is at 3pm Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    timestamp: 1622522700,
    author: "host",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 103,
    text: "ok great, oh by the way - the dryer is broken, can you fix it?",
    timestamp: 1622522700,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 104,
    text: "I'll fix it, thanks!",
    timestamp: 1622522700,
    author: "host",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 105,
    text: "I'll fix it, thanks!",
    timestamp: 1622522700,
    author: "host",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 106,
    text: "Can I check-in early?",
    timestamp: 1720394655,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 107,
    text: "Sure, you can check-in at 1pm.",
    timestamp: 1720398255,
    author: "host",
    isIncoming: false,
    isSeen: true,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 108,
    text: "Thank you!",
    timestamp: 1720401855,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 109,
    text: "Is there a parking space available?",
    timestamp: 1720405455,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
    tags: [fakeConversationTags[1]],
  },
  {
    id: 110,
    text: "Yes, there is a parking space in front of the building.",
    timestamp: 1720409055,
    author: "host",
    isIncoming: false,
    isSeen: true,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 111,
    text: "Great, see you soon!",
    timestamp: 1720412655,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 112,
    text: "Can you provide extra towels?",
    timestamp: 1720416255,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
    tags: [fakeConversationTags[3]],
  },
  {
    id: 113,
    text: "Extra towels have been placed in your room.",
    timestamp: 1720419855,
    author: "host",
    isIncoming: false,
    isSeen: true,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  {
    id: 114,
    text: "The Wi-Fi password is not working.",
    timestamp: 1720423455,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
    tags: [fakeConversationTags[0], fakeConversationTags[2]],
  },
  {
    id: 115,
    text: `Hello, this is a test email <strong>This is <em>a test</em> email</strong><br/><br/>
    
    On Fri, Jun 14, 2024 at 12:01PM Casa Ka’an <info@casakaan.com> wrote:<br></br>
    
    <blockquote>Hi Jared, Hope all is well<br/>Can we hop on a call to discuss<br><br>On Thurs, June 13, 2024 at 12:01 PM Jared <jared@hostai.app> wrote:<br></br><blockquote>Hi Nico, <br>Thank you for this information</blockquote></blockquote>`,
    timestamp: 1720427055,
    author: "host",
    isIncoming: false,
    isSeen: true,
    status: "delivered",
    type: UnifiedConversationType.Email,
  },
  {
    id: 116,
    text: "The new password worked, thank you!",
    timestamp: 1720430655,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Airbnb,
  },
  //ex of email
  {
    id: 117,
    text: `Hello, this is a test email <strong>This is <em>a test</em> email</strong><br/><br/>
    
    On Fri, Jun 14, 2024 at 12:01PM Casa Ka’an <info@casakaan.com> wrote:<br></br>
    
    <blockquote>Hi Jared, Hope all is well<br/>Can we hop on a call to discuss<br><br>On Thurs, June 13, 2024 at 12:01 PM Jared <jared@hostai.app> wrote:<br></br><blockquote>Hi Nico, <br>Thank you for this information</blockquote></blockquote>`,
    timestamp: 1720430655,
    author: "guest",
    isIncoming: true,
    isSeen: false,
    status: "delivered",
    type: UnifiedConversationType.Email,
    emailData: {
      to: ["guest@hostai.app"],
      cc: ["guest1@hostai.app"],
      bcc: ["guest2@hostai.app"],
      subject: "Test email",
    },
  },
];

export const fakeListingsData: Listing[] = [
  {
    userId: "1",
    workspaceId: "1",
    pmsPlatform: "Guesty",
    listingId: 1,
    name: "Luxurious Beachfront Villa",
    address: "1234 Elm Street",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 500,
    country: "USA",
    city: "Los Angeles",
    state: "CA",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622518800,
  },
  {
    userId: "2",
    workspaceId: "2",
    pmsPlatform: "Hostaway",
    listingId: 2,
    name: "Charming Mountain Cabin",
    address: "5678 Oak Street",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 300,
    country: "USA",
    city: "Denver",
    state: "CO",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622522400,
  },
  {
    userId: "3",
    workspaceId: "1",
    pmsPlatform: "Lodgify",
    listingId: 3,
    name: "Cozy Downtown Apartment",
    address: "789 Maple Street",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 200,
    country: "USA",
    city: "New York",
    state: "NY",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622532400,
  },
  {
    userId: "4",
    workspaceId: "1",
    pmsPlatform: "Tokeet",
    listingId: 4,
    name: "Modern City Condo",
    address: "456 Pine Street",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 400,
    country: "USA",
    city: "San Francisco",
    state: "CA",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622542400,
  },
  {
    userId: "4",
    workspaceId: "1",
    pmsPlatform: "Lodgix",
    listingId: 5,
    name: "Beachside Bungalow",
    address: "789 Ocean Drive",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 350,
    country: "USA",
    city: "Miami",
    state: "FL",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622582400,
  },
  {
    userId: "2",
    workspaceId: "2",
    pmsPlatform: "Beds24",
    listingId: 6,
    name: "Seaside Cottage",
    address: "987 Seaside Road",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 250,
    country: "USA",
    city: "San Diego",
    state: "CA",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622592400,
  },
  {
    userId: "1",
    workspaceId: "1",
    pmsPlatform: "Smoobu",
    listingId: 7,
    name: "Lakefront Cottage",
    address: "555 Lake Road",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 250,
    country: "USA",
    city: "Austin",
    state: "TX",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622602400,
  },
  {
    userId: "3",
    workspaceId: "1",
    pmsPlatform: "Ownerrez",
    listingId: 8,
    name: "City Center Hotel Room",
    address: "1111 Center Street",
    listingImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 300,
    country: "USA",
    city: "Los Angeles",
    state: "CA",
    formData: {},
    faqData: {},
    lastDynamicLearning: 1622572400,
  },
];

export const mockConversationData: Conversation[] = [
  {
    id: 1,
    assignee: 1,
    assigneeData: fakeMembersData[0],
    guest: {
      name: "Alice Smith",
      firstName: "Alice",
      lastName: "Smith",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "alice@example.com",
      phone: "123-456-7890",
    },
    conversationType: UnifiedConversationType.Email,
    lastMessage: {
      id: 101,
      text: "What time is check-in?",
      timestamp: 1622519100,
      author: "guest",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    allMessages: fakeAllMessages,
    hasUnreadMessages: true,
    lastMessageReceivedAt: "2024-06-24T10:30:00Z",
    lastMessageSentAt: "2024-06-24T10:32:00Z",
    lastMessageTimestamp: 1622519100,
    reservation: {
      id: 1001,
      createdAtTimestamp: 1622518800,
      arrivalDate: "2024-06-22",
      departureDate: "2024-06-29",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      guest: {
        name: "Alice Smith",
        firstName: "Alice",
        lastName: "Smith",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "alice@example.com",
        phone: "123-456-7890",
      },
      numberOfGuests: 2,
      listing: fakeListingsData[0],
      listingData: {
        userId: "1",
        workspaceId: "1",
        pmsPlatform: "Guesty",
        listingId: 1,
        listingName: "Luxurious Beachfront Villa",
        price: 500,
        listingInfo: {
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "1234 Elm Street, Los Angeles, CA, USA",
        address: {
          street: "1234 Elm Street",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.GUESTY,
      status: "Inquiry",
      channel: BookingChannel.Airbnb,
      payment: {
        isPaid: true,
        totalPrice: 3500,
        currency: "USD",
      },
      numNights: 7,
      aiPaused: false,
      upsells: [
        {
          id: "1",
          type: "Late Check-out",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 50,
          currency: "USD",
          finalMessage:
            "Would you like a late check-out for an additional $50?",
        },
      ],
      reservationLabels: [fakeReservationLabels[0], fakeReservationLabels[2]],
    },
    pmsPlatform: PMSPlatformEnum.GUESTY,
    hasInboxMessageQueue: true,
    archived: true,
    timezone: "America/Los_Angeles",
    tags: [fakeConversationTags[0], fakeConversationTags[2]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about check-in time",
        conversationNewLines: "New message from guest about check-in",
        currentSummary: "Discussing check-in time",
        lastMessageId: 101,
        timestamp: 1622519100,
      },
      sentiment: Sentiment.HAPPY,
    },
  },
  {
    id: 2,
    assignee: 2,
    assigneeData: fakeMembersData[1],
    guest: {
      name: "Bob Johnson",
      firstName: "Bob",
      lastName: "Johnson",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "bob@example.com",
      phone: "987-654-3210",
    },
    conversationType: UnifiedConversationType.Whatsapp,
    lastMessage: {
      id: 102,
      text: "Can I have a late check-out?",
      timestamp: 1720043484,
      author: "host",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    allMessages: fakeAllMessages,
    hasUnreadMessages: true,
    lastMessageReceivedAt: "2024-06-24T11:30:00Z",
    lastMessageSentAt: "2024-06-24T11:35:00Z",
    lastMessageTimestamp: 1622522700,
    reservation: {
      id: 1002,
      createdAtTimestamp: 1622522400,
      arrivalDate: "2024-07-12",
      departureDate: "2024-07-20",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      guest: {
        name: "Bob Johnson",
        firstName: "Bob",
        lastName: "Johnson",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "bob@example.com",
        phone: "987-654-3210",
      },
      numberOfGuests: 4,
      listing: fakeListingsData[1],
      listingData: {
        userId: "2",
        workspaceId: "2",
        pmsPlatform: "Hostaway",
        listingId: 2,
        listingName: "Charming Mountain Cabin",
        price: 300,
        listingInfo: {
          beds: 3,
          bedrooms: 2,
          bathrooms: 1,
        },
        fullAddress: "5678 Oak Street, Denver, CO, USA",
        address: {
          street: "5678 Oak Street",
          city: "Denver",
          state: "CO",
          zip: "80014",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.HOSTAWAY,
      status: "Current",
      channel: BookingChannel.Vrbo,
      payment: {
        isPaid: true,
        totalPrice: 2100,
        currency: "USD",
      },
      numNights: 7,
      aiPaused: false,
      upsells: [
        {
          id: "2",
          type: "Early Check-in",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 40,
          currency: "USD",
          finalMessage:
            "Would you like an early check-in for an additional $40?",
        },
      ],
      reservationLabels: [fakeReservationLabels[1]],
    },
    pmsPlatform: PMSPlatformEnum.HOSTAWAY,
    hasInboxMessageQueue: false,
    archived: false,
    timezone: "America/Denver",
    tags: fakeAllMessages.map((message) => message.tags!).flat(),
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about late check-out",
        conversationNewLines: "New message from guest about late check-out",
        currentSummary: "Discussing late check-out options",
        lastMessageId: 102,
        timestamp: 1622522700,
      },
      sentiment: Sentiment.NEUTRAL,
    },
  },
  {
    id: 3,
    assignee: 3,
    assigneeData: fakeMembersData[2],
    guest: {
      name: "Charlie Brown",
      firstName: "Charlie",
      lastName: "Brown",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "charlie@example.com",
      phone: "555-555-5555",
    },
    conversationType: UnifiedConversationType.Imessage,
    lastMessage: {
      id: 103,
      text: "Where can I find the wifi password?",
      timestamp: 1622532700,
      author: "guest",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: false,
    lastMessageReceivedAt: "2024-06-24T12:30:00Z",
    lastMessageSentAt: "2024-06-24T12:32:00Z",
    lastMessageTimestamp: 1622532700,
    reservation: {
      id: 1003,
      createdAtTimestamp: 1622532400,
      arrivalDate: "2024-06-26",
      departureDate: "2024-07-05",
      checkInTime: "14:00",
      checkOutTime: "10:00",
      guest: {
        name: "Charlie Brown",
        firstName: "Charlie",
        lastName: "Brown",
        imageUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "charlie@example.com",
        phone: "555-555-5555",
      },
      numberOfGuests: 1,
      listing: fakeListingsData[2],
      listingData: {
        userId: "3",
        workspaceId: "1",
        pmsPlatform: "Lodgify",
        listingId: 3,
        listingName: "Cozy Downtown Apartment",
        price: 200,
        listingInfo: {
          beds: 1,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "789 Maple Street, New York, NY, USA",
        address: {
          street: "789 Maple Street",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.LODGIFY,
      status: "Current",
      channel: BookingChannel.Expedia,
      payment: {
        isPaid: true,
        totalPrice: 800,
        currency: "USD",
      },
      numNights: 4,
      aiPaused: false,
      upsells: [
        {
          id: "3",
          type: "Extra Cleaning",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 30,
          currency: "USD",
          finalMessage: "Would you like extra cleaning for an additional $30?",
        },
      ],
      reservationLabels: [fakeReservationLabels[1], fakeReservationLabels[2]],
    },
    pmsPlatform: PMSPlatformEnum.LODGIFY,
    hasInboxMessageQueue: false,
    archived: false,
    timezone: "America/New_York",
    tags: [fakeConversationTags[2]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about wifi password",
        conversationNewLines: "New message from guest about wifi",
        currentSummary: "Discussing wifi password",
        lastMessageId: 103,
        timestamp: 1622532700,
      },
      sentiment: Sentiment.NEUTRAL,
    },
  },
  {
    id: 4,
    assignee: 4,
    assigneeData: fakeMembersData[3],
    guest: {
      name: "David Wilson",
      firstName: "David",
      lastName: "Wilson",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "david@example.com",
      phone: "444-444-4444",
    },
    conversationType: UnifiedConversationType.SMS,
    lastMessage: {
      id: 104,
      text: "Is breakfast included?",
      timestamp: 1622542700,
      author: "host",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: true,
    lastMessageReceivedAt: "2024-06-24T13:30:00Z",
    lastMessageSentAt: "2024-06-24T13:32:00Z",
    lastMessageTimestamp: 1622542700,
    reservation: {
      id: 1004,
      createdAtTimestamp: 1622542400,
      arrivalDate: "2024-06-27",
      departureDate: "2024-07-15",
      checkInTime: "16:00",
      checkOutTime: "12:00",
      guest: {
        name: "David Wilson",
        firstName: "David",
        lastName: "Wilson",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "david@example.com",
        phone: "444-444-4444",
      },
      numberOfGuests: 2,
      listing: fakeListingsData[3],
      listingData: {
        userId: "4",
        workspaceId: "1",
        pmsPlatform: "Tokeet",
        listingId: 4,
        listingName: "Modern City Condo",
        price: 400,
        listingInfo: {
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "456 Pine Street, San Francisco, CA, USA",
        address: {
          street: "456 Pine Street",
          city: "San Francisco",
          state: "CA",
          zip: "94103",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.TOKEET,
      status: "Inquiry",
      channel: BookingChannel.BookingCom,
      payment: {
        isPaid: true,
        totalPrice: 2000,
        currency: "USD",
      },
      numNights: 5,
      aiPaused: false,
      upsells: [
        {
          id: "4",
          type: "Airport Pickup",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 70,
          currency: "USD",
          finalMessage:
            "Would you like an airport pickup for an additional $70?",
        },
      ],
      reservationLabels: [fakeReservationLabels[2]],
    },
    pmsPlatform: PMSPlatformEnum.TOKEET,
    hasInboxMessageQueue: true,
    archived: false,
    timezone: "America/Los_Angeles",
    tags: [fakeConversationTags[0]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about breakfast",
        conversationNewLines: "New message from guest about breakfast",
        currentSummary: "Discussing breakfast options",
        lastMessageId: 104,
        timestamp: 1622542700,
      },
      sentiment: Sentiment.NOT_HAPPY,
    },
  },
  {
    id: 5,
    assignee: 1,
    assigneeData: fakeMembersData[0],
    guest: {
      name: "Eva Green",
      firstName: "Eva",
      lastName: "Green",
      imageUrl:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "eva@example.com",
      phone: "555-123-4567",
    },
    conversationType: UnifiedConversationType.Whatsapp,
    lastMessage: {
      id: 105,
      text: "Do you provide towels?",
      timestamp: 1622552700,
      author: "guest",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: false,
    lastMessageReceivedAt: "2024-06-24T14:30:00Z",
    lastMessageSentAt: "2024-06-24T14:32:00Z",
    lastMessageTimestamp: 1622552700,
    reservation: {
      id: 1005,
      createdAtTimestamp: 1622552400,
      arrivalDate: "2024-07-15",
      departureDate: "2024-07-20",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      guest: {
        name: "Eva Green",
        firstName: "Eva",
        lastName: "Green",
        imageUrl:
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "eva@example.com",
        phone: "555-123-4567",
      },
      numberOfGuests: 2,
      listing: fakeListingsData[0],
      listingData: {
        userId: "1",
        workspaceId: "1",
        pmsPlatform: "Guesty",
        listingId: 1,
        listingName: "Luxurious Beachfront Villa",
        price: 500,
        listingInfo: {
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "1234 Elm Street, Los Angeles, CA, USA",
        address: {
          street: "1234 Elm Street",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.GUESTY,
      status: "Current",
      channel: BookingChannel.Airbnb,
      payment: {
        isPaid: true,
        totalPrice: 3500,
        currency: "USD",
      },
      numNights: 5,
      aiPaused: false,
      upsells: [
        {
          id: "5",
          type: "Extra Towels",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 10,
          currency: "USD",
          finalMessage: "Would you like extra towels for an additional $10?",
        },
      ],
      reservationLabels: [fakeReservationLabels[0]],
    },
    pmsPlatform: PMSPlatformEnum.GUESTY,
    hasInboxMessageQueue: false,
    archived: false,
    timezone: "America/Los_Angeles",
    tags: [fakeConversationTags[3]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about towels",
        conversationNewLines: "New message from guest about towels",
        currentSummary: "Discussing towels options",
        lastMessageId: 105,
        timestamp: 1622552700,
      },
      sentiment: Sentiment.HAPPY,
    },
  },
  {
    id: 6,
    assignee: 2,
    assigneeData: fakeMembersData[1],
    guest: {
      name: "Franklin White",
      firstName: "Franklin",
      lastName: "White",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "franklin@example.com",
      phone: "555-999-8888",
    },
    conversationType: UnifiedConversationType.Email,
    lastMessage: {
      id: 106,
      text: "Can I get a parking spot?",
      timestamp: 1622562700,
      author: "guest",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: true,
    lastMessageReceivedAt: "2024-06-24T15:30:00Z",
    lastMessageSentAt: "2024-06-24T15:32:00Z",
    lastMessageTimestamp: 1622562700,
    reservation: {
      id: 1006,
      createdAtTimestamp: 1622562400,
      arrivalDate: "2024-07-20",
      departureDate: "2024-07-25",
      checkInTime: "13:00",
      checkOutTime: "10:00",
      guest: {
        name: "Franklin White",
        firstName: "Franklin",
        lastName: "White",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "franklin@example.com",
        phone: "555-999-8888",
      },
      numberOfGuests: 3,
      listing: fakeListingsData[1],
      listingData: {
        userId: "2",
        workspaceId: "2",
        pmsPlatform: "Hostaway",
        listingId: 2,
        listingName: "Charming Mountain Cabin",
        price: 300,
        listingInfo: {
          beds: 3,
          bedrooms: 2,
          bathrooms: 1,
        },
        fullAddress: "5678 Oak Street, Denver, CO, USA",
        address: {
          street: "5678 Oak Street",
          city: "Denver",
          state: "CO",
          zip: "80014",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.HOSTAWAY,
      status: "Past",
      channel: BookingChannel.BookingCom,
      payment: {
        isPaid: true,
        totalPrice: 750,
        currency: "USD",
      },
      numNights: 5,
      aiPaused: false,
      upsells: [
        {
          id: "6",
          type: "Parking",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 20,
          currency: "USD",
          finalMessage: "Would you like a parking spot for an additional $20?",
        },
      ],
      reservationLabels: [fakeReservationLabels[2]],
    },
    pmsPlatform: PMSPlatformEnum.HOSTAWAY,
    hasInboxMessageQueue: false,
    archived: false,
    timezone: "America/Chicago",
    tags: [fakeConversationTags[2]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about parking",
        conversationNewLines: "New message from guest about parking",
        currentSummary: "Discussing parking options",
        lastMessageId: 106,
        timestamp: 1622562700,
      },
      sentiment: Sentiment.HAPPY,
    },
  },
  {
    id: 7,
    assignee: 3,
    assigneeData: fakeMembersData[2],
    guest: {
      name: "Grace Lee",
      firstName: "Grace",
      lastName: "Lee",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "grace@example.com",
      phone: "444-123-4567",
    },
    conversationType: UnifiedConversationType.Voice,
    lastMessage: {
      id: 107,
      text: "Do you have a gym?",
      timestamp: 1622572700,
      author: "host",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: false,
    lastMessageReceivedAt: "2024-06-24T16:30:00Z",
    lastMessageSentAt: "2024-06-24T16:32:00Z",
    lastMessageTimestamp: 1622572700,
    reservation: {
      id: 1007,
      createdAtTimestamp: 1622572400,
      arrivalDate: "2024-08-01",
      departureDate: "2024-08-05",
      checkInTime: "12:00",
      checkOutTime: "11:00",
      guest: {
        name: "Grace Lee",
        firstName: "Grace",
        lastName: "Lee",
        imageUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "grace@example.com",
        phone: "444-123-4567",
      },
      numberOfGuests: 2,
      listing: fakeListingsData[2],
      listingData: {
        userId: "3",
        workspaceId: "1",
        pmsPlatform: "Ownerrez",
        listingId: 3,
        listingName: "City Center Hotel Room",
        price: 300,
        listingInfo: {
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "1111 Center Street, Los Angeles, CA, USA",
        address: {
          street: "1111 Center Street",
          city: "Los Angeles",
          state: "CA",
          zip: "90015",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.OWNERREZ,
      status: "Inquiry",
      channel: BookingChannel.BookingCom,
      payment: {
        isPaid: true,
        totalPrice: 1200,
        currency: "USD",
      },
      numNights: 4,
      aiPaused: false,
      upsells: [
        {
          id: "7",
          type: "Gym Access",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 25,
          currency: "USD",
          finalMessage: "Would you like gym access for an additional $25?",
        },
      ],
      reservationLabels: [fakeReservationLabels[1]],
    },
    pmsPlatform: PMSPlatformEnum.OWNERREZ,
    hasInboxMessageQueue: false,
    archived: false,
    timezone: "America/Los_Angeles",
    tags: [fakeConversationTags[0], fakeConversationTags[3]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about gym access",
        conversationNewLines: "New message from guest about gym",
        currentSummary: "Discussing gym access options",
        lastMessageId: 107,
        timestamp: 1622572700,
      },
      sentiment: Sentiment.HAPPY,
    },
  },
  {
    id: 8,
    assignee: 4,
    assigneeData: fakeMembersData[3],
    guest: {
      name: "Henry Ford",
      firstName: "Henry",
      lastName: "Ford",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "henry@example.com",
      phone: "555-987-6543",
    },
    conversationType: UnifiedConversationType.Email,
    lastMessage: {
      id: 108,
      text: "Can I check-in early?",
      timestamp: 1622582700,
      author: "host",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: false,
    lastMessageReceivedAt: "2024-06-24T17:30:00Z",
    lastMessageSentAt: "2024-06-24T17:32:00Z",
    lastMessageTimestamp: 1622582700,
    reservation: {
      id: 1008,
      createdAtTimestamp: 1622582400,
      arrivalDate: "2024-06-30",
      departureDate: "2024-08-15",
      checkInTime: "14:00",
      checkOutTime: "11:00",
      guest: {
        name: "Henry Ford",
        firstName: "Henry",
        lastName: "Ford",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "henry@example.com",
        phone: "555-987-6543",
      },
      numberOfGuests: 3,
      listing: fakeListingsData[4],
      listingData: {
        userId: "4",
        workspaceId: "1",
        pmsPlatform: "Lodgix",
        listingId: 5,
        listingName: "Beachside Bungalow",
        price: 350,
        listingInfo: {
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "789 Ocean Drive, Miami, FL, USA",
        address: {
          street: "789 Ocean Drive",
          city: "Miami",
          state: "FL",
          zip: "33101",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.LODGIX,
      status: "Current",
      channel: BookingChannel.Airbnb,
      payment: {
        isPaid: true,
        totalPrice: 1750,
        currency: "USD",
      },
      numNights: 5,
      aiPaused: false,
      upsells: [
        {
          id: "8",
          type: "Early Check-in",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 40,
          currency: "USD",
          finalMessage:
            "Would you like an early check-in for an additional $40?",
        },
      ],
      reservationLabels: [fakeReservationLabels[0]],
    },
    pmsPlatform: PMSPlatformEnum.LODGIX,
    hasInboxMessageQueue: true,
    archived: false,
    timezone: "America/New_York",
    tags: [fakeConversationTags[3]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about early check-in",
        conversationNewLines: "New message from guest about early check-in",
        currentSummary: "Discussing early check-in options",
        lastMessageId: 108,
        timestamp: 1622582700,
      },
      sentiment: Sentiment.HAPPY,
    },
  },
  {
    id: 9,
    assignee: null,
    guest: {
      name: "Irene Adler",
      firstName: "Irene",
      lastName: "Adler",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "irene@example.com",
      phone: "444-555-6666",
    },
    conversationType: UnifiedConversationType.SMS,
    lastMessage: {
      id: 109,
      text: "Do you have a swimming pool?",
      timestamp: 1622592700,
      author: "guest",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: false,
    lastMessageReceivedAt: "2024-06-24T18:30:00Z",
    lastMessageSentAt: "2024-06-24T18:32:00Z",
    lastMessageTimestamp: 1622592700,
    reservation: {
      id: 1009,
      createdAtTimestamp: 1622592400,
      arrivalDate: "2024-08-15",
      departureDate: "2024-08-20",
      checkInTime: "14:00",
      checkOutTime: "11:00",
      guest: {
        name: "Irene Adler",
        firstName: "Irene",
        lastName: "Adler",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "irene@example.com",
        phone: "444-555-6666",
      },
      numberOfGuests: 2,
      listing: fakeListingsData[5],
      listingData: {
        userId: "2",
        workspaceId: "2",
        pmsPlatform: "Beds24",
        listingId: 6,
        listingName: "Seaside Cottage",
        price: 250,
        listingInfo: {
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "987 Seaside Road, San Diego, CA, USA",
        address: {
          street: "987 Seaside Road",
          city: "San Diego",
          state: "CA",
          zip: "92101",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.BEDS24,
      status: "Current",
      channel: BookingChannel.Airbnb,
      payment: {
        isPaid: true,
        totalPrice: 1250,
        currency: "USD",
      },
      numNights: 5,
      aiPaused: false,
      upsells: [
        {
          id: "9",
          type: "Swimming Pool Access",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 50,
          currency: "USD",
          finalMessage:
            "Would you like access to the swimming pool for an additional $50?",
        },
      ],
      reservationLabels: [fakeReservationLabels[0], fakeReservationLabels[2]],
    },
    pmsPlatform: PMSPlatformEnum.BEDS24,
    hasInboxMessageQueue: false,
    archived: false,
    timezone: "America/Los_Angeles",
    tags: [fakeConversationTags[0], fakeConversationTags[3]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about swimming pool",
        conversationNewLines: "New message from guest about swimming pool",
        currentSummary: "Discussing swimming pool access",
        lastMessageId: 109,
        timestamp: 1622592700,
      },
      sentiment: Sentiment.HAPPY,
    },
  },
  {
    id: 10,
    assignee: null,
    guest: {
      name: "Jake Black",
      firstName: "Jake",
      lastName: "Black",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "jake@example.com",
      phone: "333-333-3333",
    },
    conversationType: UnifiedConversationType.Email,
    lastMessage: {
      id: 110,
      text: "Do you allow pets?",
      timestamp: 1622602700,
      author: "guest",
      isIncoming: true,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    },
    hasUnreadMessages: false,
    lastMessageReceivedAt: "2024-06-24T19:30:00Z",
    lastMessageSentAt: "2024-06-24T19:32:00Z",
    lastMessageTimestamp: 1622602700,
    reservation: {
      id: 1010,
      createdAtTimestamp: 1622602400,
      arrivalDate: "2024-08-20",
      departureDate: "2024-08-25",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      guest: {
        name: "Jake Black",
        firstName: "Jake",
        lastName: "Black",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        email: "jake@example.com",
        phone: "333-333-3333",
      },
      numberOfGuests: 1,
      listing: fakeListingsData[6],
      listingData: {
        userId: "1",
        workspaceId: "1",
        pmsPlatform: "Smoobu",
        listingId: 7,
        listingName: "Lakefront Cottage",
        price: 250,
        listingInfo: {
          beds: 1,
          bedrooms: 1,
          bathrooms: 1,
        },
        fullAddress: "555 Lake Road, Austin, TX, USA",
        address: {
          street: "555 Lake Road",
          city: "Austin",
          state: "TX",
          zip: "78701",
          country: "USA",
        },
      },
      pmsPlatform: PMSPlatformEnum.SMOOBU,
      status: "Cancelled",
      channel: BookingChannel.Airbnb,
      payment: {
        isPaid: false,
        totalPrice: 1250,
        currency: "USD",
      },
      numNights: 5,
      aiPaused: false,
      upsells: [
        {
          id: "10",
          type: "Pet Fee",
          status: UpsellStatusEnum.Awaiting,
          totalPriceWithDiscount: 30,
          currency: "USD",
          finalMessage: "Would you like to bring a pet for an additional $30?",
        },
      ],
      reservationLabels: [fakeReservationLabels[1]],
    },
    pmsPlatform: PMSPlatformEnum.SMOOBU,
    hasInboxMessageQueue: true,
    archived: false,
    timezone: "America/Chicago",
    tags: [fakeConversationTags[2]],
    conversationDetails: {
      showSummary: true,
      summary: {
        previousSummary: "Guest asked about pets",
        conversationNewLines: "New message from guest about pets",
        currentSummary: "Discussing pet policy",
        lastMessageId: 110,
        timestamp: 1622602700,
      },
      sentiment: Sentiment.NEUTRAL,
    },
  },
];

// --------- Make all filters Data ------------------------------------------

export type optionWithData = {
  id?: number | string | null;
  name: string;
  image?: string;
  icon?: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
  pinned?: boolean;
  groupId?: number;
};

export type FilterValue = optionWithData;
export type FilterValues = { [key: string]: FilterValue[] };

export type AllFilters = {
  reservationLabels?: {
    column: "messages";
    title: "Reservation labels";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  conversationTags?: {
    column: "messages";
    title: "Conversation tags";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  // listingGroups: ListingGroup[];
  responseStatus?: {
    column: "messages";
    title: "Response status";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  reservationStatus?: {
    column: "user";
    title: "Reservation status";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };

  checkInDate?: {
    column: "user";
    title: "Check-in date";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  assignee?: {
    column: "assigneeGroup";
    title: "Assignee";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  listings?: {
    column: "listing";
    title: "Listings";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  listingGroups?: {
    column: "listing";
    title: "Listing Groups";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
};

export const allFilters: AllFilters = {
  assignee: {
    column: "assigneeGroup",
    title: "Assignee",
    icon: User03Icon,
    options: [
      { id: null, name: "Unassigned", icon: User03Icon }, // Adding Unassigned option

      ...fakeMembersData.map((member) => ({
        id: member.id!,
        name: member.name!,
        image: member.image!,
      })),
    ],
  },
  reservationStatus: {
    column: "user",
    title: "Reservation status",
    icon: NotificationBox,
    options: [
      { id: 1, name: "Current", pinned: false },
      { id: 2, name: "Inquiry", pinned: false },
      { id: 3, name: "Past", pinned: true },
      { id: 4, name: "Cancelled", pinned: false },
    ],
  },
  checkInDate: {
    column: "user",
    title: "Check-in date",
    icon: CalendarIcon,
    options: [
      { id: 1, name: "Current Guest", pinned: false },
      { id: 2, name: "Checking in today", pinned: true },
      { id: 3, name: "Checking in tomorrow", pinned: false },
      { id: 4, name: "Checking in this week", pinned: true },
    ],
  },
  responseStatus: {
    column: "messages",
    title: "Response status",
    icon: NavigationPointerIcon,
    options: [
      { id: 1, name: "Needs Reply", pinned: true, icon: CornerUpLeftIcon },
      { id: 2, name: "Response Available", pinned: false, icon: Stars01Icon },
      { id: 3, name: "Replied to", pinned: false, icon: CornerDownRightIcon },
    ],
  },
  reservationLabels: {
    column: "messages",
    title: "Reservation labels",
    icon: CircleIcon,
    options: fakeReservationLabels.map((label) => ({
      id: label.id,
      name: label.name,
      pinned: false,
    })),
  },
  conversationTags: {
    column: "messages",
    title: "Conversation tags",
    icon: TagIcon,
    options: fakeConversationTags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      icon: fakeIconsData.find((icon) => icon.id === tag.iconId)?.icon,
      pinned: false,
    })),
  },
  listings: {
    column: "listing",
    title: "Listings",
    icon: BuildingIcon,
    options: fakeListingsData.map((listing) => ({
      id: listing.listingId,
      name: listing.name,
      image: listing.listingImage,
      groupId: fakeListingGroupsData.find((group) =>
        group.listingIds.includes(listing.listingId)
      )?.id,
    })),
  },
  listingGroups: {
    column: "listing",
    title: "Listing Groups",
    icon: BuildingIcon,
    options: fakeListingGroupsData.map((group) => ({
      id: group.id,
      name: group.name,
      color: group.color,
    })),
  },
};

export type appliedFilters = {
  reservationStatus?: FilterValue[];
  checkInDate?: FilterValue[];
  reservationLabels?: FilterValue[];
  conversationTags?: FilterValue[];
  responseStatus?: FilterValue[];
  assignee?: FilterValue[];
  listings?: FilterValue[];
  listingGroups?: FilterValue[];
};
