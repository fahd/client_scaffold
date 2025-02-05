import { useContext } from "react";
import { BoardContext } from "../contexts/boardContext";
export const useBoard = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("context has to be used inside the BoardProvider");
  }

  return context;
};
