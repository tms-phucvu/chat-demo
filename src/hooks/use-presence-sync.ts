"use client";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  subscribeToUserPresence,
  unsubscribeFromUserPresence,
  getActiveTrackers,
  cleanupAllWatchers,
} from "@/services/presence.service";
import { useInterestedUsersStore } from "@/stores/interested-users.store";

export const usePresenceSync = () => {
  const interestedIds = useInterestedUsersStore(
    useShallow((state) => Array.from(state.interestedIds)),
  );
  const updatePresence = useInterestedUsersStore(
    (state) => state.updatePresence,
  );
  const removePresence = useInterestedUsersStore(
    (state) => state.removePresence,
  );

  useEffect(() => {
    if (interestedIds.length === 0) {
      cleanupAllWatchers();
      return;
    }

    interestedIds.forEach((uid) => {
      subscribeToUserPresence(uid, (data) => {
        updatePresence(uid, data);
      });
    });

    const currentActiveUids = getActiveTrackers();

    currentActiveUids.forEach((uid) => {
      if (!interestedIds.includes(uid)) {
        unsubscribeFromUserPresence(uid);
        removePresence([uid]);
      }
    });
  }, [interestedIds, updatePresence, removePresence]);
};
