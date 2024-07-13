"use client";

import { Input } from "@/components/ui/input";
import { useState, useCallback, useEffect, useRef } from "react";
import { TagInput } from "emblor";
import { cn } from "@/lib/utils";
import { AutosizeTextarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Attachemnt02Icon,
  CornerDownLeftIcon,
  Link01Icon,
  Type01Icon,
  ZapIcon,
} from "@/components/icons/CustomIcons";
import { MessageTypeDropdown } from "./MessageTypeDropdown";
import {
  RichTextEditor,
  RichTextEditorToolbar,
} from "@/components/custom/RichTextEditor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";
import { MessageItem, UnifiedConversationType } from "@/lib/realDataSchema";
import { XIcon } from "lucide-react";

export type initialState = "Collapsed" | "Active" | "Inactive";

type Tag = {
  id: string;
  text: string;
};

export const ChatInput = ({
  initialState,
  initialMessageType,
  onSendMessage,
}: {
  initialState?: initialState;
  initialMessageType?: UnifiedConversationType;
  onSendMessage: (message: MessageItem) => void;
}) => {
  const [state, setState] = useState<initialState>(initialState || "Collapsed");
  const [messageType, setMessageType] = useState<UnifiedConversationType>(
    initialMessageType || UnifiedConversationType.Email
  );
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [emailState, setEmailState] = useState<{
    toTags: Tag[];
    ccTags: Tag[];
    bccTags: Tag[];
    activeToTagIndex: number | null;
    activeCcTagIndex: number | null;
    activeBccTagIndex: number | null;
    options: {
      cc: boolean;
      bcc: boolean;
    };
  }>({
    toTags: [],
    ccTags: [],
    bccTags: [],
    activeToTagIndex: null,
    activeCcTagIndex: null,
    activeBccTagIndex: null,
    options: {
      cc: false,
      bcc: false,
    },
  });
  const [selectedText, setSelectedText] = useState("");
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkValue, setLinkValue] = useState<string>("");
  const [isSavedRepliesOpen, setIsSavedRepliesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedReplyIndex, setSelectedReplyIndex] = useState(0);
  const savedRepliesRef = useRef<HTMLDivElement>(null);

  // Init tiptap editor
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "border-none outline-none min-h-[80px] max-h-[300px] w-full text-body-sm placeholder:text-placeholder overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Placeholder.configure({
        placeholder: () => {
          return "Write your reply here . . .";
        },
        considerAnyAsEmpty: true,
      }),
      Image,
      Link.extend({
        inclusive: false,
        exitable: true,
      }).configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-link underline",
        },
      }),
    ],
    content: message,
    onUpdate: ({ editor }) => {
      setMessage(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    const url = linkValue;

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsLinkDialogOpen(false);
      return;
    }

    // Insert the new text at the current selection
    editor?.commands.insertContent(selectedText ? selectedText : url);

    // Select the newly inserted text
    const currentPos = editor?.state.selection.$anchor.pos || 0;
    editor?.commands.setTextSelection({
      from: currentPos - selectedText.length,
      to: currentPos,
    });

    // Apply the link to the selected text
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();

    setIsLinkDialogOpen(false);
    setLinkValue("");
    setSelectedText("");
  }, [editor, linkValue, selectedText]);

  const handleSendEmail = () => {
    console.log("Sending email");
    console.log("To:", emailState.toTags);
    console.log("Cc:", emailState.ccTags);
    console.log("Bcc:", emailState.bccTags);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // create a new message object
    const newMessage: MessageItem = {
      id: Date.now().toString(),
      author: "host",
      text: message,
      isIncoming: false,
      isSeen: false,
      status: "delivered",
      type: messageType,
      timestamp: Math.floor(Date.now() / 1000),
      emailData: {
        to: emailState.toTags.map((tag) => tag.text),
        cc: emailState.ccTags.map((tag) => tag.text),
        bcc: emailState.bccTags.map((tag) => tag.text),
        subject: subject,
      },
    };

    onSendMessage(newMessage);

    //reset the state
    setEmailState((prevState) => ({
      ...prevState,
      toTags: [],
      ccTags: [],
      bccTags: [],
      activeToTagIndex: null,
      activeCcTagIndex: null,
      activeBccTagIndex: null,
      options: {
        cc: false,
        bcc: false,
      },
    }));

    setMessage("");
    editor?.commands.setContent(""); // Clear the editor state
    setSubject("");

    toast.success("Email sent successfully");

    setState("Collapsed");
  };

  const handleSend = () => {
    // create a new message object
    const newMessage: MessageItem = {
      id: Date.now().toString(),
      author: "host",
      text: message,
      isIncoming: false,
      isSeen: false,
      status: "delivered",
      type: messageType,
      timestamp: Math.floor(Date.now() / 1000),
    };

    onSendMessage(newMessage);

    //reset the state
    setMessage("");
    editor?.commands.setContent(""); // Clear the editor state

    toast.success(messageType + " message sent successfully");

    setState("Collapsed");
  };

  const handleTypeChange = (newMessageType: UnifiedConversationType) => {
    setMessageType(newMessageType);
    setMessage("");
    editor?.commands.setContent(""); // Clear the editor state
  };

  // This handles the link button click in rich text editor
  const handleLinkButtonClick = () => {
    if (editor?.isActive("link")) {
      // If a link is active, get the link details
      const { from, to } = editor.state.selection;
      let linkText = editor.state.doc.textBetween(from, to, " ");
      const linkAttrs = editor.getAttributes("link");

      // If no text is selected (cursor is just within the link), get the full link text
      if (!linkText) {
        const nodeAt = editor.state.doc.nodeAt(from);
        if (nodeAt) {
          linkText = nodeAt.textContent;
        }
      }

      setSelectedText(linkText);
      setLinkValue(linkAttrs.href || "");
    } else {
      // If no link is active, get the selected text
      const userSelectedText = editor?.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );

      setSelectedText(userSelectedText || "");
      setLinkValue("");
    }

    setIsLinkDialogOpen(true);
  };

  // fake saved replies
  const savedReplies = [
    {
      id: "1",
      title: "Early check-in reply",
      content: "Sorry check in is not allowed early",
    },
    {
      id: "2",
      title: "Rude guest template answer",
      content: "Hey listen up buddy, you smell like a rude person",
    },
    {
      id: "3",
      title: "Airbnb privacy policy response",
      content: "You can find the privacy policy here...",
    },
    {
      id: "4",
      title: "About Ekwede stays answer",
      content: "About Ekwede stays",
    },
  ];

  // filter the saved replies based on the search input
  const filteredSavedReplies = savedReplies.filter((reply) =>
    reply.title.toLowerCase().includes(search.toLowerCase())
  );

  // replace the message with the selected saved reply
  const handleSavedReplySelect = (reply: (typeof savedReplies)[number]) => {
    setMessage(reply.content);
    if (editor) {
      editor.commands.setContent(reply.content);
    }

    setIsSavedRepliesOpen(false);
  };

  // Listen for keyboard events to navigate through saved replies
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSavedRepliesOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedReplyIndex((prev) =>
            prev < filteredSavedReplies.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedReplyIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (
            selectedReplyIndex >= 0 &&
            selectedReplyIndex < filteredSavedReplies.length
          ) {
            handleSavedReplySelect(filteredSavedReplies[selectedReplyIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsSavedRepliesOpen(false);
          break;
      }
    };

    // Close the dropdown when the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        savedRepliesRef.current &&
        !savedRepliesRef.current.contains(event.target as Node)
      ) {
        setIsSavedRepliesOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSavedRepliesOpen, filteredSavedReplies, selectedReplyIndex]);

  const toggleSavedReplies = () => {
    setIsSavedRepliesOpen((prev) => !prev);
    setSelectedReplyIndex(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelectedReplyIndex(-1);
  };

  return (
    <div>
      {state === "Active" && isSavedRepliesOpen && (
        <div
          ref={savedRepliesRef}
          key={"savedReplies"}
          className="pt-[30px] mb-[9px] bg-primary flex flex-col gap-[10px] border border-primary rounded-lg relative"
          style={{
            boxShadow: "0px 4px 50px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <XIcon
            className="h-4 w-4 text-icon-tertiary hover:text-icon-secondary hover:cursor-pointer absolute top-3 right-3"
            onClick={() => setIsSavedRepliesOpen(false)}
          />
          <div className="flex flex-col gap-1 px-3">
            {filteredSavedReplies.map((reply, index) => (
              <div
                key={reply.id}
                className={cn(
                  "group/saved flex items-center justify-between rounded-lg p-2 hover:cursor-pointer focus:bg-selected hover:bg-selected",
                  index === selectedReplyIndex && "bg-selected"
                )}
                onClick={() => handleSavedReplySelect(reply)}
                onMouseEnter={() => setSelectedReplyIndex(index)}
              >
                <p className="text-subtitle-sm">{reply.title}</p>
                <div
                  className={cn(
                    "hidden group-hover/saved:flex gap-2 items-center",
                    index === selectedReplyIndex && "flex"
                  )}
                >
                  <CornerDownLeftIcon className="size-[10.5px] text-icon-secondary" />
                  <p className="text-subtitle-xs text-secondary">To select</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="px-4 py-3 bg-primary-subtle border-t border-primary"> */}
          <Input
            placeholder="Search saved reply here"
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-3 bg-primary-subtle border-0 border-t border-primary rounded-t-none text-body-sm"
          />
          {/* </div> */}
        </div>
      )}
      {state === "Collapsed" && (
        <div
          className="p-4 border border-primary rounded-lg text-body-sm text-placeholder h-[52px]"
          onClick={() => {
            setState("Active");
          }}
        >
          Write your reply here . . .
        </div>
      )}
      {state === "Active" && (
        <div>
          {messageType === UnifiedConversationType.Email ? (
            <div
              className={cn("p-4 pt-2 border border-icon-active rounded-lg")}
            >
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-2">
                  <p className="text-body-2xs text-tertiary">To</p>
                  <TagInput
                    tags={emailState.toTags}
                    setTags={(newTags) => {
                      setEmailState((prevState) => ({
                        ...prevState,
                        toTags: newTags as Tag[],
                      }));
                    }}
                    activeTagIndex={emailState.activeToTagIndex}
                    setActiveTagIndex={(index) =>
                      setEmailState((prevState) => ({
                        ...prevState,
                        activeToTagIndex: index as number,
                      }))
                    }
                    styleClasses={{
                      inlineTagsContainer:
                        "border-none h-8 p-0 gap-1 h-full place-content-center place-content-center",
                      input: "p-0 shadow-none h-8 !text-body-xs text-primary",
                      tag: {
                        body: "p-2 bg-primary-subtle text-primary !text-body-xs border-none rounded-sm",
                        closeButton:
                          "pr-0 pl-2 text-icon-tertiary hover:text-icon-primary",
                      },
                    }}
                  />
                </div>
                {emailState.options.cc && (
                  <div className="flex items-start gap-2 min-h-8">
                    <p className="text-body-2xs text-tertiary h-8 flex items-center">
                      Cc
                    </p>
                    <TagInput
                      tags={emailState.ccTags}
                      setTags={(newTags) => {
                        setEmailState((prevState) => ({
                          ...prevState,
                          ccTags: newTags as Tag[],
                        }));
                      }}
                      activeTagIndex={emailState.activeCcTagIndex}
                      setActiveTagIndex={(index) =>
                        setEmailState((prevState) => ({
                          ...prevState,
                          activeCcTagIndex: index as number,
                        }))
                      }
                      styleClasses={{
                        inlineTagsContainer:
                          "border-none h-8 p-0 gap-1 h-full place-content-center place-content-center",
                        input: "p-0 shadow-none h-8 !text-body-xs text-primary",
                        tag: {
                          body: "p-2 bg-primary-subtle text-primary !text-body-xs border-none rounded-sm",
                          closeButton:
                            "pr-0 pl-2 text-icon-tertiary hover:text-icon-primary",
                        },
                      }}
                    />
                  </div>
                )}
                {emailState.options.bcc && (
                  <div className="flex items-start gap-2 min-h-8">
                    <p className="text-body-2xs text-tertiary h-8 flex items-center">
                      Bcc
                    </p>
                    <TagInput
                      tags={emailState.bccTags}
                      setTags={(newTags) => {
                        setEmailState((prevState) => ({
                          ...prevState,
                          bccTags: newTags as Tag[],
                        }));
                      }}
                      activeTagIndex={emailState.activeBccTagIndex}
                      setActiveTagIndex={(index) =>
                        setEmailState((prevState) => ({
                          ...prevState,
                          activeBccTagIndex: index as number,
                        }))
                      }
                      styleClasses={{
                        inlineTagsContainer:
                          "border-none h-8 p-0 gap-1 h-full place-content-center place-content-center",
                        input: "p-0 shadow-none h-8 !text-body-xs text-primary",
                        tag: {
                          body: "p-2 bg-primary-subtle text-primary !text-body-xs border-none rounded-sm",
                          closeButton:
                            "pr-0 pl-2 text-icon-tertiary hover:text-icon-primary",
                        },
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <Input
                    className="w-full text-subtitle-sm outline-0 border-none p-0 h-[39px]"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <div className="text-tertiary text-body-2xs flex">
                    <div
                      className={cn(
                        "hover:text-primary hover:cursor-pointer p-1",
                        emailState.options.cc && "text-primary"
                      )}
                      onClick={() =>
                        setEmailState((prevState) => ({
                          ...prevState,
                          options: {
                            ...prevState.options,
                            cc: !prevState.options.cc,
                          },
                        }))
                      }
                    >
                      Cc
                    </div>
                    <div
                      className={cn(
                        "hover:text-primary hover:cursor-pointer p-1",
                        emailState.options.bcc && "text-primary"
                      )}
                      onClick={() =>
                        setEmailState((prevState) => ({
                          ...prevState,
                          options: {
                            ...prevState.options,
                            bcc: !prevState.options.bcc,
                          },
                        }))
                      }
                    >
                      Bcc
                    </div>
                  </div>
                </div>
              </div>
              <RichTextEditor
                editor={editor}
                onFileUpload={(file) => {
                  console.log("File uploaded", file);
                }}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {/* Zap? */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size={"iconSm"}
                        variant={"ghost"}
                        onClick={() => toggleSavedReplies()}
                        className={isSavedRepliesOpen ? "bg-hover" : ""}
                      >
                        <ZapIcon className="h-[15px] text-icon-tertiary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-[6px]">
                      <p className="text-subtitle-2xs">Saved replies</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Formatting */}
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size={"iconSm"}
                            variant={"ghost"}
                            className={
                              editor?.isActive("bold") ||
                              editor?.isActive("italic") ||
                              editor?.isActive("strike") ||
                              editor?.isActive("bulletList") ||
                              editor?.isActive("orderedList")
                                ? "bg-hover"
                                : ""
                            }
                          >
                            <Type01Icon className="size-3 text-icon-tertiary" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent className="px-3 py-[6px]">
                        <p className="text-subtitle-2xs">Formatting</p>
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent side="top" align="start">
                      {editor && <RichTextEditorToolbar editor={editor} />}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Link */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size={"iconSm"}
                        variant={"ghost"}
                        onClick={handleLinkButtonClick}
                        className={editor?.isActive("link") ? "bg-hover" : ""}
                      >
                        <Link01Icon className="size-[15px] text-icon-tertiary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-[6px]">
                      <p className="text-subtitle-2xs">Link</p>
                    </TooltipContent>
                  </Tooltip>

                  <Dialog
                    open={isLinkDialogOpen}
                    onOpenChange={setIsLinkDialogOpen}
                  >
                    <DialogContent>
                      <DialogHeader>
                        {editor?.isActive("link") ? "Edit" : "Add"} Link
                      </DialogHeader>
                      <p className="text-subtitle-sm">Text</p>
                      <Input
                        defaultValue={selectedText}
                        onChange={(e) => {
                          setSelectedText(e.target.value);
                        }}
                        className="text-body-xs"
                      />
                      <p className="text-subtitle-sm">URL</p>
                      <Input
                        placeholder="Enter URL"
                        value={linkValue || ""}
                        onChange={(e) => {
                          setLinkValue(e.target.value);
                        }}
                        className="text-body-xs"
                      />

                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (editor?.isActive("link")) {
                              editor
                                ?.chain()
                                .focus()
                                .extendMarkRange("link")
                                .unsetLink()
                                .run();
                            }

                            setIsLinkDialogOpen(false);
                          }}
                        >
                          {editor?.isActive("link") ? "Remove" : "Cancel"}
                        </Button>
                        <Button size="sm" onClick={setLink}>
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Attachemnt */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size={"iconSm"} variant={"ghost"}>
                        <Attachemnt02Icon className="h-[15px] text-icon-tertiary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-[6px]">
                      <p className="text-subtitle-2xs">Attachment</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-1">
                  <MessageTypeDropdown
                    messageType={messageType}
                    setMessageType={handleTypeChange}
                  />
                  <Button
                    onClick={handleSendEmail}
                    size={"sm"}
                    className="flex items-center gap-2 disabled:!bg-brand disabled:!bg-opacity-50 disabled:text-primary-inverse"
                    disabled={
                      emailState.toTags.length == 0 ||
                      !subject ||
                      !message ||
                      message === "<p></p>"
                    }
                  >
                    Send
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center justify-center size-4">
                        <p>⌘</p>
                      </div>
                      <div className="flex items-center justify-center size-4">
                        <CornerDownLeftIcon className="size-[12px]" />
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={"p-4 border border-icon-active rounded-lg"}>
              <AutosizeTextarea
                className="w-full rounded-none p-0 outline-0 border-none text-body-sm resize-none h-20"
                placeholder="Write your reply here . . ."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxHeight={300}
                minHeight={80}
                autoFocus
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {/* Saved replies */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size={"iconSm"}
                        variant={"ghost"}
                        onClick={() => toggleSavedReplies()}
                        className={isSavedRepliesOpen ? "bg-hover" : ""}
                      >
                        <ZapIcon className="h-[15px] text-icon-tertiary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-[6px]">
                      <p className="text-subtitle-2xs">Saved replies</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-1">
                  <MessageTypeDropdown
                    messageType={messageType}
                    setMessageType={handleTypeChange}
                  />
                  <Button
                    onClick={handleSend}
                    size={"sm"}
                    className="flex items-center gap-2 disabled:!bg-brand disabled:!bg-opacity-50 disabled:text-primary-inverse"
                    disabled={!message}
                  >
                    Send
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center justify-center size-4">
                        <p>⌘</p>
                      </div>
                      <div className="flex items-center justify-center size-4">
                        <CornerDownLeftIcon className="size-[12px]" />
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
