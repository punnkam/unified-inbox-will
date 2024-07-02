"use client";
import { SettingsContainer } from "@/components/custom/SettingsContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MailIcon,
    CheckCircleIcon,
    WhatsAppIcon,
} from "@/components/icons/CustomIcons";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Copy, PowerIcon } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default async function EmailPage({
    params: { workspaceId },
}: {
    params: { workspaceId: string };
}) {
    const [data, setData] = useState<string>("Single email");
    const [forwardingSetup, setForwardingSetup] = useState<boolean>(false);
    const [domain, setDomain] = useState<{
        _id: string;
        domain: string;
        domainId: string;
        dkimPendingHost: string;
        dkimPendingTextValue: string;
        dkimVerified: boolean;
        returnPathVerified: boolean;
    }>({
        _id: "",
        domain: "",
        domainId: "",
        dkimPendingHost: "",
        dkimPendingTextValue: "",
        dkimVerified: false,
        returnPathVerified: false,
    });

    return (
        <div className='flex flex-col gap-[28px]'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-title-2xl'>WhatsApp</h1>
                <p className='text-subtitle-sm text-tertiary'>
                    Connect WhatsApp to HostAI
                </p>
            </div>

            <div className='border-b border-primary'></div>

            <div className='flex flex-col gap-5'>
                <p className='text-title-lg text-tertiary'>Connect WhatsApp</p>
                <p className='text-body-xs text-secondary font-normal'>
                    Use existing WhatsApp business account or create one with us
                </p>
                <div className='flex justify-between items-start border border-secondary rounded-md p-4'>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 flex justify-center items-center'>
                            <WhatsAppIcon className='text-icon-tertiary' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-subtitle-xs'>
                                {`You don’t have a WhatsApp business account connected to HostAI`}
                            </p>
                            <p className='text-body-2xs font-normal text-secondary'>
                                Pull in messages from Whatsapp into HostAI
                            </p>
                        </div>
                    </div>
                    <div>
                        <Link href={"./ai-settings/autopilot"}>
                            <Button variant={"outline"} size={"sm"}>
                                Connect to WhatsApp
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface HeaderSubHeaderProps {
    bullet: number;
    name: string;
    description: string;
}
const HeaderSubHeader = ({
    bullet,
    name,
    description,
}: HeaderSubHeaderProps) => (
    <div className='flex flex-col gap-2'>
        <p className='text-title-lg text-tertiary'>
            {bullet > 0 ? `${bullet}. ` : ""}
            {name}
        </p>
        <p className='text-body-xs text-secondary font-normal'>{description}</p>
    </div>
);
