# React custom hooks

### **create-context with useReducer and context api**
<details open>
<summary style='font-size:15px;font-weight:600'>Click me</summary>

```
import * as React from "react";

const createStore = <S, A>(reducer: (state: S, action: A) => S, initialState: S) => {
  const DispatchContext = React.createContext<React.Dispatch<A>>({} as React.Dispatch<A>);
  const StoreContext = React.createContext({} as S);

  const StoreProvider = ({ children }: { children: React.ReactNode }): any => {
    const [store, dispatch] = React.useReducer<(state: S, action: A) => S>(reducer, initialState);
    const dispatchRef = React.useRef(dispatch);

    return (
      <DispatchContext.Provider value={dispatchRef.current}>
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
      </DispatchContext.Provider>
    );
  };

  const useDispatch = () => React.useContext(DispatchContext);
  const useStore = () => React.useContext(StoreContext);

  return { StoreProvider, useDispatch, useStore };
};

export default createStore;
```

### How to use the createStore

```
export const {
  StoreProvider: MyStoreProvider,
  useDispatch: useMyDispatch,
  useStore: useMyStore,
} = createStore<App, Action>(reducer, initialState);
```
- `MyStoreProvider` will be used to wrapp the Component that needs access to reducer
- `useMyDispatch` will be used to dispatch actions, it uses useRef in order to not rerender the content of context api
- `useMyStore` can be used anywhere under the `MyStoreProvider` and have access to the state.

Benefits of this kind of store:
- it can be used in specific parts of the application, only the content under `MyStoreProvider` will have access to it's state.
- larger store can be created to cover bigger parts of the application (it can store the entire application)
- no need for extra libraries, it is built in React.
</details>

### **How type an Action**
<details>
    <summary style='font-size:15px;font-weight:600'>Click me</summary>

```
type Action =
| { type: "setUser"; userInfo: UserInfo }
| {
    type: "setLanguage";
    lang: string;
    }
| { type: "default" };

```

When Action will be used, based on type, the second property can be used accordingly


Check the `login.store.tsx`, `login.tsx`, `login.type.tsx` files 
</details>

### **useClickOutside**
<details>
<summary style='font-size:15px;font-weight:600'>Click me</summary>

```
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

```

Usage:

```
 const ref = React.useRef(null);
 useClickOutside(ref, () => console.log("cleanup function"));

 return <div ref={ref}> Inside div</div>
 ```

 See `login,tsx` component
 </details>