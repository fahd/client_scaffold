import { createContext, useState } from "react";

// Interfaces
interface BoardContextType {
  board: string[];
  onUpdateBoard: (idx: number, value: string) => void;
}

// Contexts
export const BoardContext = createContext<BoardContextType | undefined>(
  undefined
);

// Provider
const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, updateBoard] = useState<string[]>(() => {
    const storedBoard = localStorage.getItem("board");
    return storedBoard
      ? JSON.parse(storedBoard)
      : Array.from({ length: 9 }, () => "");
  });

  const onUpdateBoard = (idx: number, value: string) => {
    updateBoard((prev) => {
      const newState = [...prev];
      newState[idx] = value;
      updateStore(newState);
      return newState;
    });
  };

  const updateStore = (board: string[]) => {
    localStorage.setItem("board", JSON.stringify(board));
  };

  return (
    <BoardContext.Provider value={{ board, onUpdateBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
