"use client";

import { DropdownMenuItem } from "@/ui/dropdown-menu";
import {
  ArrowUpRight,
  BugIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldCheck,
  FileText,
  MessageCircleWarning
} from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
  const iconSize = 15;

  return (
    <>
      <DropdownMenuItem asChild>
        <Link href="/">
          <HomeIcon size={iconSize} />
          <span>Home</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard">
          <LayoutDashboardIcon size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings">
          <SettingsIcon size={iconSize} />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link
          href="/privacy-policy"
          target="_blank"
        >
          <div className="flex items-center space-x-3">
            <ShieldCheck size={iconSize} />
            <span>Privacy policy</span>
          </div>
          <ArrowUpRight size={iconSize} className="opacity-40" />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link
          href="/terms-of-service"
          target="_blank"
        >
          <div className="flex items-center space-x-3">
            <FileText size={iconSize} />
            <span>Terms of service</span>
          </div>
          <ArrowUpRight size={iconSize} className="opacity-40" />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link
          href="https://github.com/reblox01/slug/issues/new/choose"
          target="_blank"
        >
          <div className="flex items-center space-x-3">
            <BugIcon size={iconSize} />
            <span>Report a bug</span>
          </div>
          <ArrowUpRight size={iconSize} className="opacity-40" />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link href="https://sohailkoutari.com/contact" target="_blank">
          <div className="flex items-center space-x-3">
            <MessageCircleWarning width={16} />
            <span>Contact</span>
          </div>
          <ArrowUpRight size={iconSize} className="opacity-40" />
        </Link>
      </DropdownMenuItem>
    </>
  );
};

export default UserMenu;
