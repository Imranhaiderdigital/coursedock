"use client";

import { useEffect } from "react";

interface KeyShortcutProps {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  callback: (e: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(shortcuts: KeyShortcutProps[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, metaKey = false, ctrlKey = false, callback }) => {
        const matchesKey = event.key.toLowerCase() === key.toLowerCase();
        const matchesMeta = !metaKey || event.metaKey;
        const matchesCtrl = !ctrlKey || event.ctrlKey;

        if (matchesKey && matchesMeta && matchesCtrl) {
          event.preventDefault();
          callback(event);
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}
