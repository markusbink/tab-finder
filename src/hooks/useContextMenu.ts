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

    const contextMenuWidth = contextMenuRef?.current?.clientWidth;
    const contextMenuHeight = contextMenuRef?.current?.clientHeight;

    const position = getMenuPosition(
      e.clientX,
      e.clientY,
      contextMenuWidth,
      contextMenuHeight
    );

    console.log("context-menu1", { contextMenuWidth, contextMenuHeight });
    console.log("context-menu2", position);

    setXPos(position.x);
    setYPos(position.y);

    setIsVisible(true);
  };
  return { position: { x: xPos, y: yPos }, isVisible, onContextMenu };
};

const getMenuPosition = (
  mouseX: number,
  mouseY: number,
  menuWidth: number,
  menuHeight: number
) => {
  let ctxMenuXPos: number = mouseX;
  let ctxMenuYPos: number = mouseY;

  if (mouseX + menuWidth > Constants.POPUP_WIDTH) {
    ctxMenuXPos = Constants.POPUP_WIDTH - menuWidth;
  }

  if (mouseY + menuHeight > Constants.POPUP_HEIGHT) {
    ctxMenuYPos = Constants.POPUP_HEIGHT - menuHeight;
  }
  return { x: ctxMenuXPos, y: ctxMenuYPos };
};
