import * as React from "react";
import * as Constants from "../constants";

export const useContextMenu = (target: any, contextMenuRef: any) => {
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
      setIsVisible(false);
      onContextMenu(e);
    });
  }, []);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsVisible(true);

    const contextMenuWidth = contextMenuRef?.current?.clientWidth;
    const contextMenuHeight = contextMenuRef?.current?.clientHeight;

    const position = getMenuPosition(
      e.clientX,
      e.clientY,
      contextMenuWidth,
      contextMenuHeight
    );

    setXPos(position.x);
    setYPos(position.y);
  };
  return { position: { x: xPos, y: yPos }, isVisible, onContextMenu };
};

const getMenuPosition = (
  mouseX: number,
  mouseY: number,
  menuWidth: number,
  menuHeight: number
) => {
  let ctxMenuXPos: number = mouseX + 5;
  let ctxMenuYPos: number = mouseY + 5;

  if (mouseX + menuWidth > Constants.POPUP_WIDTH) {
    ctxMenuXPos = Constants.POPUP_WIDTH - menuWidth - 5;
  }

  if (mouseY + menuHeight > Constants.POPUP_HEIGHT) {
    ctxMenuYPos = Constants.POPUP_HEIGHT - menuHeight - 5;
  }
  return { x: ctxMenuXPos, y: ctxMenuYPos };
};
