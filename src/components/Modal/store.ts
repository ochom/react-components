import { useEffect, useState } from "react";
import { ConfirmProps } from "./confirm";

type Listener = () => void;

type StoreType = {
  isOpen: boolean;
  dialog: ConfirmProps;
  listeners: Set<Listener>;

  setState(newState: Partial<Omit<StoreType, "listeners" | "setState">>): void;
  subscribe(listener: Listener): () => void;
};

const store: StoreType = {
  isOpen: false,
  dialog: {} as ConfirmProps,
  listeners: new Set<Listener>(),

  setState(newState: Partial<Omit<typeof store, "listeners" | "setState">>) {
    Object.assign(store, newState);
    store.listeners.forEach((listener) => listener());
  },

  subscribe(listener: Listener) {
    store.listeners.add(listener);
    return () => store.listeners.delete(listener);
  },
};

// Hook to access the store reactively
export function useConfirmStore() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate({}));
    return unsubscribe;
  }, []);

  return store;
}

// Function to trigger the confirm dialog
export function confirm(props: ConfirmProps) {
  store.setState({ isOpen: true, dialog: props });
}

// Function to close the dialog
export function closeConfirm() {
  store.setState({ isOpen: false });
}
