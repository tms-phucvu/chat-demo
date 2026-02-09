import { useState, useRef, useMemo } from "react";
import { UserInfo } from "@/types/user.type";
import { searchUserByEmailSmart } from "@/features/chat/services/user-search.service";
import { SEARCH_DEBOUNCE_MS } from "@/features/chat/constants/chat.constants";

export function useUserSearch(currentUid: string, selectedUsers: UserInfo[]) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const results = await searchUserByEmailSmart(value);
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);
  };

  const matchedUsers = useMemo(() => {
    return searchResults.filter(
      (user) =>
        user.uid !== currentUid &&
        !selectedUsers.some((u) => u.uid === user.uid),
    );
  }, [searchResults, selectedUsers, currentUid]);

  const clearQuery = () => {
    setQuery("");
    setSearchResults([]);
  };

  return {
    query,
    loading,
    matchedUsers,
    handleSearchChange,
    clearQuery,
  };
}
