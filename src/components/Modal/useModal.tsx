import { useState } from "react";

type UseModalResponse = [boolean, () => void];

export const useModal = (startState = false): UseModalResponse => {
  const [isOpen, setIsOpen] = useState<boolean>(startState);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return [isOpen, toggleModal];
};
