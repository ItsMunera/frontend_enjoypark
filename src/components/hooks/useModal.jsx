import { useState, useCallback } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);

  const open = useCallback((zoneData) => {
    setSelectedZone(zoneData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedZone(null);
  }, []);

  return { isOpen, selectedZone, open, close };
}
