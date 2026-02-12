"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { UserInfo } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";
import UserPreview from "@/features/chat/components/ui/user-preview";
import { useUserSearch } from "@/features/chat/hooks/use-user-search";
import { useTranslations } from "next-intl";

interface UserSelectorProps {
  currentUid: string;
  selectedUsers: UserInfo[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfo[]>>;
}

export function UserSelector({
  currentUid,
  selectedUsers,
  setSelectedUsers,
}: UserSelectorProps) {
  const t = useTranslations("chat.dialog.searchUser")
  const { query, loading, matchedUsers, handleSearchChange, clearQuery } =
    useUserSearch(currentUid, selectedUsers);

  const showList = query.trim().length > 0;

  const handleSelect = (user: UserInfo) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.uid === user.uid) ? prev : [...prev, user],
    );
    clearQuery();
  };

  return (
    <Command className="relative rounded-md border bg-popover text-popover-foreground">
      <CommandInput
        placeholder={t("placeholder")}
        value={query}
        onValueChange={handleSearchChange}
      />
      {showList && (
        <CommandList>
          {loading ? (
            <CommandEmpty>{t("loading")}</CommandEmpty>
          ) : matchedUsers.length === 0 ? (
            <CommandEmpty>{t("emptyUser")}</CommandEmpty>
          ) : (
            <CommandGroup heading="Users">
              {matchedUsers.map((user) => (
                <CommandItem
                  key={user.uid}
                  value={user.emailLowercase ?? ""}
                  onSelect={() => handleSelect(user)}
                >
                  <UserPreview user={user} />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
}
