import { EditorContent, Editor } from "@tiptap/react";
import { Bold, Strikethrough, Italic, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RichTextEditor = ({
  editor,
  onFileUpload,
}: {
  editor: Editor | null;
  onFileUpload: (attachment: any) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [storageId, setStorageId] = useState<string>("");

  const onDrop = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    const files = event.dataTransfer.files;
    console.log("files", files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // const postUrl = await generateUploadUrl();
        setStorageId(storageId);
        onFileUpload({
          name: file.name,
          contentType: file.type,
          contentLength: file.size,
          storageId,
        });
      } catch (e: any) {
        toast.error("Error uploading file: " + e);
        setLoading(false);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <EditorContent
        editor={editor}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDrop(e);
        }}
      />
    </>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-row items-center text-icon-tertiary rounded-md w-fit">
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            size="xs"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="size-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bold</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            size="xs"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="size-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Italic</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            size="xs"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="size-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Strikethrough</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            size="xs"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List className="size-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bullet List</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            size="xs"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered className="size-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ordered List</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export { RichTextEditor, RichTextEditorToolbar };
