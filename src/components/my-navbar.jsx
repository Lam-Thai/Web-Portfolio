"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function MyNavbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Tuoc Lam Thai
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/projects">Projects</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resume</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/Lam_s_Resume___Web_Dev.pdf"
                          download="Tuoc_Lam_Thai_Resume.pdf"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Download PDF
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Download resume as PDF
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/Lam_s_Resume___Web_Dev.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            View PDF
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Open in new tab
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {!isLoading && (
            <>
              {user ? (
                <Button asChild variant="outline" size="sm">
                  <a href="/api/auth/logout">Sign Out</a>
                </Button>
              ) : (
                <Button asChild size="sm">
                  <a href="/api/auth/login">Sign In</a>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
