import { useCallback, useState } from "react";
import { AppCallback } from "./useDataGrid";

export const useConfirmDialog = () => {
  const [askConfirm, setAskConfirm] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState<AppCallback>();

  const onClose = useCallback(() => {
    setConfirmOpen(undefined);
  }, []);

  const onConfirm = useCallback(
    () => (ask: boolean) => {
      setAskConfirm(ask);
      if (!!confirmOpen) {
        confirmOpen();
        setConfirmOpen(undefined);
      }
    },
    [confirmOpen]
  );
  return {
    askConfirm,
    confirmOpen,
    onClose,
    onConfirm,
    setConfirmOpen,
  };
};
