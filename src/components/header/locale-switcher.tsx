"use client";

import { useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

type Locale = (typeof routing.locales)[number];

export default function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  //Sync locale when back or forward
  useEffect(() => {
    const handlePopState = () => {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const urlLocale = pathSegments[0];
      if (
        urlLocale &&
        routing.locales.includes(urlLocale as Locale) &&
        urlLocale !== currentLocale
      ) {
        startTransition(() => {
          router.replace(pathname, { locale: urlLocale as Locale });
          router.refresh();
        });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, currentLocale, pathname]);

  // Display language names in the current locale (native language names)
  const languageNames = useMemo(
    () =>
      new Intl.DisplayNames([currentLocale], {
        type: "language",
        languageDisplay: "standard",
      }),
    [currentLocale],
  );

  //Change current locale
  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      router.push(pathname, { locale: newLocale });
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => {
          const displayName = languageNames.of(locale) || locale.toUpperCase();
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={currentLocale === locale ? "bg-accent" : ""}
              disabled={isPending}
              aria-current={currentLocale === locale ? "true" : undefined}
            >
              <span className="flex items-center justify-between w-full">
                {displayName}
                {currentLocale === locale && <Check className="ml-2 h-4 w-4" />}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
