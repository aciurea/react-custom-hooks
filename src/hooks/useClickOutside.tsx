import * as React from "react";

export const useClickOutside = (
  elRef: React.MutableRefObject<HTMLElement | null>,
  callback: (...elem: any) => void
) => {
  const callbackRef = React.useRef(callback);
  const handleClickOutside = React.useRef((event: any) => {
    const hasClickedOutside = !elRef?.current?.contains(event.target);

    if (hasClickedOutside) callbackRef.current?.(event.target as Element);
  });

  React.useEffect(() => {
    const listener = handleClickOutside.current;
    document.addEventListener("click", listener, true);

    return () => {
      document.removeEventListener("click", listener, true);
    };
  }, [elRef, callbackRef]);
};
