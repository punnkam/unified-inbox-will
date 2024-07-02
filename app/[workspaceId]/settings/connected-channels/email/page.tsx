"use client";
import { SettingsContainer } from "@/components/custom/SettingsContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailIcon, CheckCircleIcon } from "@/components/icons/CustomIcons";
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
                <h1 className='text-title-2xl'>Email</h1>
                <p className='text-subtitle-sm text-tertiary'>
                    To set up emails for this workspace, you will need to be
                    able to edit DNS records for your domain. Make sure you can
                    access those, or have someone around who can.
                </p>
            </div>

            <div className='border-b border-primary'></div>
            <SettingsContainer
                title='Assign conversations to...'
                description='Hand off conversations to workspace members or teams'
                icon={<MailIcon className='text-icon-tertiary' />}
                action={
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size={"sm"}>
                                {data}
                                <ChevronDownIcon className='ml-1 w-4 h-4 text-icon-tertiary' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align='start'
                            className='text-subtitle-xs'
                        >
                            <DropdownMenuItem onClick={() => setData("Domain")}>
                                Domain
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setData("Single email")}
                            >
                                Single email
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            />
            <div className='flex flex-col gap-5'>
                <HeaderSubHeader
                    bullet={1}
                    name='Add email'
                    description='Choose the email address where you want customers to contact your company. Outgoing emails to customers will also be sent from this address.'
                />
                <Input
                    id='name-input'
                    placeholder='Email address'
                    className='w-96'
                    // value={data.name}
                    // onChange={(e) => handleChange("name", e.target.value)}
                />
                <div className='flex gap-2 items-center'>
                    {data === "Domain" && (
                        <Button size={"sm"}>Add domain</Button>
                    )}
                    {data === "Single email" && (
                        <div className='space-x-2'>
                            <Button size={"sm"} variant={"outline"}>
                                Add more
                            </Button>
                            <Button size={"sm"}>Save</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <HeaderSubHeader
                    bullet={2}
                    name='Receiving emails'
                    description='This allows HostAI to show emails from guests, team members, and homeowners'
                />

                <div className='flex w-full items-center rounded-md bg-secondary px-4 py-4 text-sm border-2 border-secondary justify-between'>
                    <p>
                        {process.env.NEXT_PUBLIC_POSTMARK_FORWARDING_URL ||
                            `cb296eeb77d535eec143e8f816e47de4@inbound.postmarkapp.com`}
                    </p>
                    <Copy
                        className='h-4 w-4 text-secondary hover:cursor-pointer rotate-90'
                        onClick={() => {
                            navigator.clipboard.writeText(
                                process.env
                                    .NEXT_PUBLIC_POSTMARK_FORWARDING_URL as string
                            );
                        }}
                    />
                </div>
                <div className='flex w-full items-center rounded-md px-4 py-4 text-sm border-2 border-secondary gap-4 hover:cursor-pointer hover:bg-secondary'>
                    <Checkbox
                        id='Forwarding setup'
                        checked={forwardingSetup}
                        onCheckedChange={() =>
                            setForwardingSetup(!forwardingSetup)
                        }
                    />

                    <p>Inbounding email forwarding is set up</p>
                </div>

                <Button size={"sm"} variant={"outline"} className='w-fit'>
                    Confirm forwarding setup
                </Button>
            </div>

            <div className='flex flex-col gap-5'>
                <HeaderSubHeader
                    bullet={3}
                    name='Sending emails'
                    description='This allows HostAI to send emails on your behalf. Verifying your domain gives email clients confidence it was sent by HostAI with your permission.'
                />

                {data === "Single email" && (
                    <>
                        <div className='flex w-full items-center rounded-md px-4 py-4 text-sm border-2 border-secondary gap-4 hover:cursor-pointer hover:bg-secondary'>
                            <Checkbox
                                id='Forwarding setup'
                                checked={forwardingSetup}
                                onCheckedChange={() =>
                                    setForwardingSetup(!forwardingSetup)
                                }
                            />

                            <p>Sending emails is set up for this email</p>
                        </div>
                    </>
                )}

                {data === "Domain" && (
                    <>
                        <p className='font-medium text-sm'>
                            Add the following records to your DNS configuration:
                        </p>
                        <div className='space-y-4 py-3 text-sm'>
                            <div className='space-y-2 rounded-md p-4 bg-secondary border-2 w-full'>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Type
                                    </div>
                                    <div>TXT</div>
                                </div>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Hostname
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Copy
                                            className='h-4 w-4 text-secondary hover:cursor-pointer rotate-90'
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    process.env
                                                        .NEXT_PUBLIC_POSTMARK_FORWARDING_URL as string
                                                );
                                            }}
                                        />
                                        {domain.dkimPendingHost.split(".")[0]}.
                                        {domain.dkimPendingHost.split(".")[1]}
                                    </div>
                                </div>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Value
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Copy
                                            className='h-4 w-4 text-secondary hover:cursor-pointer rotate-90'
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    process.env
                                                        .NEXT_PUBLIC_POSTMARK_FORWARDING_URL as string
                                                );
                                            }}
                                        />
                                        {domain.dkimPendingTextValue}
                                    </div>
                                </div>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Status
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <CheckCircleIcon className='h-4 w-4  hover:cursor-pointer text-green-500' />
                                        {domain.dkimVerified
                                            ? "Configured"
                                            : "Not Configured"}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full space-y-2 rounded-md p-4 bg-secondary border-2'>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Type
                                    </div>
                                    <div>CNAME</div>
                                </div>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Hostname
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Copy
                                            className='h-4 w-4 text-secondary hover:cursor-pointer rotate-90'
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    process.env
                                                        .NEXT_PUBLIC_POSTMARK_FORWARDING_URL as string
                                                );
                                            }}
                                        />
                                        hostai-bounces
                                    </div>
                                </div>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Value
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Copy
                                            className='h-4 w-4 text-secondary hover:cursor-pointer rotate-90'
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    process.env
                                                        .NEXT_PUBLIC_POSTMARK_FORWARDING_URL as string
                                                );
                                            }}
                                        />
                                        pm.mtasv.net
                                    </div>
                                </div>
                                <div className='grid grid-cols-6 justify-between'>
                                    <div className='text-secondary col-span-1'>
                                        Status
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <CheckCircleIcon className='h-4 w-4  hover:cursor-pointer text-green-500' />
                                        {domain.dkimVerified
                                            ? "Configured"
                                            : "Not Configured"}
                                    </div>
                                </div>
                            </div>
                            <p className='text-body-xs text-secondary'>
                                It might take a few minutes for your DNS changes
                                to propagate. It can take up to 24 hours for
                                some cases.
                            </p>
                            <Button size='sm' variant='outline'>
                                Verify DNS
                            </Button>
                        </div>
                    </>
                )}

                <Button size={"sm"} variant={"outline"} className='w-fit'>
                    Confirm forwarding setup
                </Button>
            </div>

            <div className='flex flex-col gap-5'>
                <HeaderSubHeader
                    bullet={4}
                    name='Enable email'
                    description={`Now that you've set up your email, you can enable this email for use in the workspace.`}
                />
                <SettingsContainer
                    title='Enable email'
                    description='Click the switch to activate'
                    icon={<PowerIcon className='text-icon-tertiary' />}
                    action={
                        <Switch
                            checked={true}
                            onCheckedChange={() => console.log("checked")}
                        />
                    }
                />
            </div>

            {data === "Domain" && (
                <div className='flex flex-col gap-5'>
                    <HeaderSubHeader
                        bullet={0}
                        name='Alternate emails'
                        description={`In addition to your main support email address, you can specify up to 10 additional email addresses for the same domain.`}
                    />
                    <Button size={"sm"} className='w-fit'>
                        Add email
                    </Button>
                </div>
            )}
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
