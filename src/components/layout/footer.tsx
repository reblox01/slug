import ExternalLink from "@/ui/external-link";
import Link from "next/link";
import { cn } from "@/utils";
import React from "react";
import { XLogo, GithubLogo } from "../icons/logos";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer
      className={cn(
        "group w-full text-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400",
        "bg-white/60 backdrop-blur-md dark:bg-neutral-900/60",
        props.className,
      )}
    >
      <div className={cn("container flex items-center justify-between")}>
        <div className="flex items-center space-x-2">
          <XLogo className="h-3 w-3" />
          <ExternalLink
            href="https://twitter.com/arosck1"
            className="flex items-center space-x-1"
          >
            <p className="hidden md:block">Twitter</p>
            <ArrowUpRight size={14} />
          </ExternalLink>
          <div className="hidden md:flex items-center space-x-1 text-sm text-neutral-500">
            <GithubLogo className="h-4 w-4 ml-2" />
            <span>Inspired by</span>
            <ExternalLink
              href="https://github.com/pheralb/slug.git"
              className="flex items-center space-x-1"
            >
              <span className="underline">Pheralb</span>
              <ArrowUpRight size={14} />
            </ExternalLink>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/privacy-policy"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <ShieldCheck size={16} />
            <span>Privacy Policy</span>
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/terms-of-service"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <FileText size={16} />
            <span>Terms Of Service</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
