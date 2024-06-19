"use client";

import { Pencil02ICon } from "@/components/icons/CustomIcons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

export const contactData = {
  Name: {
    title: "Add name",
    description: "Choose the name you want associated with this contact.",
    inputTitle: "Name",
    placeholder: "John Doe",
  },
  Email: {
    title: "Add email",
    description: "Choose the email you want associated with this contact.",
    inputTitle: "Email",
    placeholder: "john@gmail.com",
  },
  Phone: {
    title: "Add phone",
    description:
      "Choose the phone number you want associated with this contact.",
    inputTitle: "Phone",
    placeholder: "9496125101",
  },
  WhatsApp: {
    title: "Add WhatsApp",
    description:
      "Choose the WhatsApp number you want associated with this contact.",
    inputTitle: "WhatsApp",
    placeholder: "Add WhatsApp",
  },
};

export const ContactDialog = ({
  value,
  setValue,
  contact,
}: {
  value: string;
  setValue: (value: string) => void;
  contact: keyof typeof contactData;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempData, setTempData] = useState(value);

  const handleSave = async () => {
    setLoading(true);

    if (tempData !== "") {
      toast.success("Added " + contact);
      setIsOpen(false);

      setValue(tempData);
      setTempData("");

      // Refresh the page to fetch the updated connections
    } else {
      toast.error("Failed to add " + contact);
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        {value === "" ? (
          <div className="flex gap-2 items-center">
            <PlusIcon className="h-3 w-3" />
            <p>Add</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Pencil02ICon className="h-3 w-3" />
            <p>Edit</p>
          </div>
        )}
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contactData[contact].title}</DialogTitle>
          <DialogDescription>
            {contactData[contact].description}
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3">
          <label className="text-subtitle-sm text-primary font-medium">
            {contactData[contact].inputTitle}
          </label>
          <Input
            value={tempData}
            placeholder={contactData[contact].placeholder}
            onChange={(e) => setTempData(e.target.value)}
          />
        </DialogDescription>
        {value === "" ? (
          <DialogFooter>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                handleSave();
              }}
              disabled={loading || tempData === ""}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter className="sm:justify-between">
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                setIsOpen(false);
                setTempData("");
                setValue("");
              }}
            >
              Delete
            </Button>
            <Button
              size="sm"
              onClick={() => {
                handleSave();
              }}
              disabled={loading || tempData === ""}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
