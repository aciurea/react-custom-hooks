import * as React from "react";

export const useClickOutside = (
  elRef: React.MutableRefObject<HTMLElement | null>,
  callback: (...elem: any) => void,
  direction?: "right" | "left"
) => {
  const callbackRef = React.useRef(callback);
  const handleClickOutside = React.useRef((event: any) => {
    const hasClickedOutside = !elRef?.current?.contains(event.target);

    if (hasClickedOutside && callbackRef.current) {
      callbackRef.current(event.target);
    }
  });
  // This is for the Menu because the component doesn't destroy.
  React.useEffect(() => {
    const listener = handleClickOutside.current;

    if (direction === "right") document.addEventListener("click", listener, true);
    else if (direction === "left") document.removeEventListener("click", listener, true);

    return () => {
      document.removeEventListener("click", listener, true);
    };
  }, [direction]);

  React.useEffect(() => {
    if (direction) return;
    const listener = handleClickOutside.current;
    document.addEventListener("click", listener, true);

    return () => {
      document.removeEventListener("click", listener, true);
    };
  }, [elRef, callbackRef, direction]);
};
