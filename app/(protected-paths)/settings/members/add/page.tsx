"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function AddMemberPage() {
  const [data, setData] = useState({
    role: "admin",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof data, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // console.log(data);

    setLoading(true);

    // Call your API here
    setTimeout(() => {
      toast.success("Sent invite");

      // Reset the form
      setData({
        role: "admin",
        email: "",
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="/settings/members">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All Members
          </Button>
        </Link>
        <h1 className="text-title-2xl">Add member</h1>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="role-input" className="text-subtitle-sm text-primary">
            Role
          </label>
          <p className="text-tertiary text-body-xs font-normal">Select one</p>
        </div>

        <RadioGroup className="border border-primary rounded-md">
          <div className="flex items-start space-x-2 px-4 py-6 border-b border-primary">
            <RadioGroupItem
              value="admin"
              id="radio-admin"
              className="mt-1"
              checked={data.role === "admin"}
              onClick={() => handleChange("role", "admin")}
            />
            <div>
              <label htmlFor="radio-admin" className="text-subtitle-sm">Admin</label>
              <p className="text-tertiary text-body-xs font-normal mt-1">
                Full access to everything including deleting the workspace.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2 px-4 py-6 border-b border-primary">
            <RadioGroupItem
              value="member"
              id="radio-member"
              className="mt-1"
              checked={data.role === "member"}
              onClick={() => handleChange("role", "member")}
            />
            <div>
              <label htmlFor="radio-member" className="text-subtitle-sm">Member</label>
              <p className="text-tertiary text-body-xs font-normal mt-1">
                Full access to everything including deleting the workspace.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2 px-4 py-6">
            <RadioGroupItem
              value="external-team"
              id="radio-external-team"
              className="mt-1"
              checked={data.role === "external-team"}
              onClick={() => handleChange("role", "external-team")}
            />
            <div>
              <label htmlFor="radio-external-team" className="text-subtitle-sm">External Team</label>
              <p className="text-tertiary text-body-xs font-normal mt-1">
                Full access to everything including deleting the workspace.
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="member-email"
            className="text-subtitle-sm"
          >
            Email
          </label>
          <p className="text-tertiary text-body-xs font-normal">
            The name of the member
          </p>
        </div>
        <Input
          id="member-email"
          placeholder="jared@hostai.app"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="w-full flex justify-end items-center py-5">
        <Button
          variant="default"
          onClick={handleSave}
          disabled={!data.email || !data.role || loading}
        >
          {loading ? "Sending..." : "Send invite"}
        </Button>
      </div>
    </div>
  );
}
