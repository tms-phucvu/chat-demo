"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchUserByEmailSmart } from "@/services/user.service";
import { UserProfile } from "@/types/user.type";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import UserPreview from "@/features/chat/components/ui/user-preview";

const SEARCH_DEBOUNCE_MS = 500;

interface UserSelectorProps {
  currentUid: string;
  selectedUsers: UserProfile[];
  setSelectedUsers: Dispatch<SetStateAction<UserProfile[]>>;
}

export function UserSelector({
  currentUid,
  selectedUsers,
  setSelectedUsers,
}: UserSelectorProps) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!value.trim()) {
      setMatchedUsers([]);
      return;
    }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const results = await searchUserByEmailSmart(value);
      setSearchResults(results);
      setLoading(false);
    }, SEARCH_DEBOUNCE_MS);
  };

  useEffect(() => {
    const filtered = searchResults.filter(
      (user) =>
        user.uid !== currentUid &&
        !selectedUsers.some((u) => u.uid === user.uid),
    );
    setMatchedUsers(filtered);
  }, [searchResults, selectedUsers, currentUid]);

  const showList = query.trim().length > 0;

  return (
    <Command className="relative rounded-md border bg-popover text-popover-foreground">
      <CommandInput
        placeholder="Type email to find people..."
        value={query}
        onValueChange={handleSearchChange}
      />

      {showList && (
        <CommandList>
          {loading && <CommandEmpty>Searching...</CommandEmpty>}

          {!loading && matchedUsers.length === 0 && (
            <CommandEmpty>No users found.</CommandEmpty>
          )}

          {matchedUsers.length > 0 && (
            <CommandGroup heading="Users">
              {matchedUsers.map((user) => (
                <CommandItem
                  key={user.uid}
                  value={user.emailLowercase ?? ""}
                  onSelect={() => {
                    setSelectedUsers((prev) =>
                      prev.some((u) => u.uid === user.uid)
                        ? prev
                        : [...prev, user],
                    );
                    setQuery("");
                    setMatchedUsers([]);
                  }}
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
