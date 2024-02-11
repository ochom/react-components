import { useState } from "react";

export const useModal = (startState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(startState);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return [isOpen, toggleModal];
};
