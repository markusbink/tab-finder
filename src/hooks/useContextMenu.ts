import * as React from "react";

export const useContextMenu = (target: any) => {
  const [xPos, setXPos] = React.useState<number>(0);
  const [yPos, setYPos] = React.useState<number>(0);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Close Context Menu
    document.addEventListener("click", () => {
      setIsVisible(false);
    });
    // Close Context Menu
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    });
    // Open Context Menu when wrapper gets right clicked
    target.current.addEventListener("contextmenu", (e: MouseEvent) => {
      onContextMenu(e);
    });
  }, []);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();

    setXPos(e.pageX);
    setYPos(e.pageY);
    setIsVisible(true);
  };
  return { position: { x: xPos, y: yPos }, isVisible, onContextMenu };
};
