"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Data {
  name: string;
  logo: string | null;
}

export default function PersonalNotificationsPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    // Just storing using file name for now
    handleChange("logo", file?.name || null);
  };

  const initialData: Data = {
    name: "",
    logo: null,
  };

  const saveData = (data: Data) => {
    // Call API to save the data
    // console.log("Saving data", data);

    setTimeout(() => {
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const { data, handleChange, setData } = useDebouncedSave<Data>({
    initialData,
    saveData,
  });

  useEffect(() => {
    // Fetch/Load the data into state here
    setData({
      name: "Will",
      logo: null,
    });
  }, [setData]);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">General</h1>
        <p className="text-subtitle-sm text-tertiary">
          Manage your workspace settings
        </p>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Workspace</p>

        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="name-input"
              className="text-subtitle-sm text-primary"
            >
              Name
            </label>
            <p className="text-tertiary text-body-xs font-normal">
              Typically your company name. Something that helps you distinguish
              this workspace from others.
            </p>
          </div>
          <Input
            id="name-input"
            placeholder="Name"
            className="w-96"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="logo-input"
              className="text-subtitle-sm text-primary"
            >
              Logo
            </label>
            <p className="text-tertiary text-body-xs font-normal">
              Pick a logo for your workspace. Recommended size is 256x256 px.
            </p>
          </div>
          <label htmlFor="logo-input" className="cursor-pointer w-fit">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected logo"
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-500">
                AB
              </div>
            )}
          </label>
          <input
            type="file"
            id="logo-input"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Billing</p>

        <p className="text-tertiary text-body-xs font-normal">
          You are on the Enterprise plan for 2 listings. Our pricing can be seen
          at hostai.app/pricing.
        </p>

        <div className="flex gap-2">
          <Link href="./general/listings">
            <Button size={"sm"} variant={"secondary"}>
              Add or Remove listings
            </Button>
          </Link>
          <a href="#">
            <Button size={"sm"} variant={"outline"}>
              Open Stripe billing portal
            </Button>
          </a>
        </div>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Extension</p>

        <p className="text-tertiary text-body-xs font-normal">
          Use HostAI messaging in your PMS. Click link here to install your
          extension from the Chrome Web Store.
        </p>

        {/* TODO: This has no function right now */}
        <div className="flex gap-2">
          <Button size={"sm"} variant={"outline"}>
            Generate new key
          </Button>
        </div>
      </div>
    </div>
  );
}
