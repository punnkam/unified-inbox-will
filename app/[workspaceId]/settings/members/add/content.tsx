"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Member } from "@/lib/types";
import { saveMember } from "@/app/actions";
import { useRouter } from "next/navigation";
import { ContactDialog } from "./ContactDialog";

export default function AddMemberContent({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const [data, setData] = useState<Member>({
    workspaces: [
      {
        id: workspaceId,
        role: "Admin",
        status: "Pending",
      },
    ],
    email: "",
    name: "",
    whatsapp: "",
    phone: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    key: keyof typeof data,
    value: (typeof data)[keyof typeof data]
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    // console.log(data);

    setLoading(true);

    const repsonse = await saveMember(data);

    if (repsonse.success) {
      toast.success("Member saved successfully");

      // Refresh the page
      router.push("../members");
    } else {
      toast.error("Error saving member: " + repsonse.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../members">
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
              checked={data.workspaces?.[0]?.role === "Admin"}
              onClick={() => {
                setData((prev) => ({
                  ...prev,
                  workspaces: [
                    {
                      ...prev.workspaces![0],
                      role: "Admin",
                    },
                  ],
                }));
              }}
            />
            <div>
              <label htmlFor="radio-admin" className="text-subtitle-sm">
                Admin
              </label>
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
              checked={data.workspaces?.[0]?.role === "Member"}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  workspaces: [
                    {
                      ...prev.workspaces![0],
                      role: "Member",
                    },
                  ],
                }))
              }
            />
            <div>
              <label htmlFor="radio-member" className="text-subtitle-sm">
                Member
              </label>
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
              checked={data.workspaces?.[0]?.role === "External Team"}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  workspaces: [
                    {
                      ...prev.workspaces![0],
                      role: "External Team",
                    },
                  ],
                }))
              }
            />
            <div>
              <label htmlFor="radio-external-team" className="text-subtitle-sm">
                External Team
              </label>
              <p className="text-tertiary text-body-xs font-normal mt-1">
                Full access to everything including deleting the workspace.
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {data.workspaces?.[0]?.role === "External Team" ? (
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="role-input"
              className="text-subtitle-sm text-primary"
            >
              Contact info
            </label>
            <p className="text-tertiary text-body-xs font-normal">
              Add the relevant info you want for this contact
            </p>
          </div>

          <div className="border border-secondary rounded-md ">
            <div className="flex justify-between items-start p-5 border-b border-secondary">
              <div className="flex flex-col gap-1">
                <p className="text-subtitle-xs">Name</p>
                <p className="text-body-2xs font-normal text-tertiary">
                  {data.name || "Name"}
                </p>
              </div>
              <div>
                <ContactDialog
                  value={data.name || ""}
                  setValue={(value: string) => handleChange("name", value)}
                  contact={"Name"}
                />
              </div>
            </div>
            <div className="flex justify-between items-start p-5 border-b border-secondary">
              <div className="flex flex-col gap-1">
                <p className="text-subtitle-xs">Email</p>
                <p className="text-body-2xs font-normal text-tertiary">
                  {data.email || "Email"}
                </p>
              </div>
              <div>
                <ContactDialog
                  value={data.email || ""}
                  setValue={(value: string) => handleChange("email", value)}
                  contact={"Email"}
                />
              </div>
            </div>

            <div className="flex justify-between items-start p-5 border-b border-secondary">
              <div className="flex flex-col gap-1">
                <p className="text-subtitle-xs">Phone Number</p>
                <p className="text-body-2xs font-normal text-tertiary">
                  {data.phone || "Phone"}
                </p>
              </div>
              <div>
                <ContactDialog
                  value={data.phone || ""}
                  setValue={(value: string) => handleChange("phone", value)}
                  contact={"Phone"}
                />
              </div>
            </div>

            <div className="flex justify-between items-start p-5">
              <div className="flex flex-col gap-1">
                <p className="text-subtitle-xs">Whatsapp</p>
                <p className="text-body-2xs font-normal text-tertiary">
                  {data.whatsapp || "Whatsapp"}
                </p>
              </div>
              <div>
                <ContactDialog
                  value={data.whatsapp || ""}
                  setValue={(value: string) => handleChange("whatsapp", value)}
                  contact={"WhatsApp"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="member-email" className="text-subtitle-sm">
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
      )}

      <div className="w-full flex justify-end items-center py-5">
        <Button
          variant="default"
          onClick={handleSave}
          disabled={data.email == "" || loading}
        >
          {loading ? "Sending..." : "Send invite"}
        </Button>
      </div>
    </div>
  );
}
