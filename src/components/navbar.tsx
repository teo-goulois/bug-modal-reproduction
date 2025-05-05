"use client";

import { useRef } from "react";

import Link from "next/link";

import { useScrollDirection } from "@/hooks/use-scroll-direction";

import { cn } from "@/utils";
import { Navbar as NavbarComponent } from "./ui/navbar";
import { SharedModal } from "./shared-modal";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const navbarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavbarComponent
        ref={navbarRef}
        className={cn(
          "sticky top-0 z-50 w-full",
          "transition-transform duration-300",
          scrollDirection === "down"
            ? "max-md:-translate-y-full"
            : "max-md:translate-y-0"
        )}
      >
        {/* Desktop / Mobile modal */}
        <NavbarComponent.Nav className="">
          <NavbarComponent.Logo className="hidden md:flex">
            <Link prefetch href="/">
              Logo
            </Link>
          </NavbarComponent.Logo>
          <NavbarComponent.Section className="hidden w-full px-8 md:flex">
            <SharedModal />
          </NavbarComponent.Section>
          <NavbarComponent.Section className="ml-auto hidden md:flex">
            right menu
          </NavbarComponent.Section>
        </NavbarComponent.Nav>

        {/* Mobile */}
        <NavbarComponent.Compact className="border-b-0">
          <NavbarComponent.Flex>
            <Link prefetch href="/">
              Logo
            </Link>
          </NavbarComponent.Flex>
          <NavbarComponent.Flex>right menu</NavbarComponent.Flex>
        </NavbarComponent.Compact>

        <NavbarComponent.Compact className="pb-3 md:hidden">
          <SharedModal />
        </NavbarComponent.Compact>

        <NavbarComponent.Inset />
      </NavbarComponent>
    </>
  );
};
