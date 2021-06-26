import * as React from "react";

export const useContextMenu = () => {
  const [xPos, setXPos] = React.useState<number>(0);
  const [yPos, setYPos] = React.useState<number>(0);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.addEventListener("click", () => {
      setIsVisible(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    });
  }, []);

  const onContextMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();

    setXPos(e.pageX);
    setYPos(e.pageY);
    setIsVisible(true);
  };
  return { xPos, yPos, isVisible, onContextMenu };
};
