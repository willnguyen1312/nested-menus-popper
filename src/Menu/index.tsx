import React from "react";
import { noop } from "lodash-es";

import { Popper, PopperPlacementType } from "@material-ui/core";

const callAll = (...fns: any) => (...arg: any) => fns.forEach((fn: any) => {
  fn && fn(...arg)
});

interface MenuContextType {
  anchorEle?: HTMLElement;
  setAnchorEle: (anchorEle?: HTMLElement) => void;
}

const MenuContext = React.createContext<MenuContextType>({
  setAnchorEle: noop,
});

export const MenuTrigger: React.FC = ({ children }) => {
  const { setAnchorEle, anchorEle } = React.useContext(MenuContext);

  const handleOnclick = (event: Event) => {
    setAnchorEle(anchorEle ? undefined : event.target as HTMLElement)
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: callAll(handleOnclick, child.props.onClick)
      })
    }

    return undefined
  })


  return <>{childrenWithProps}</>
};

interface MenuItemProps {
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return <div tabIndex={0} role="menuitem" onClick={onClick} onKeyUp={event => {
    if (event.key === 'Enter') {
      onClick && onClick(event)
    }
  }}>{children}</div>;
};

export const Menu: React.FC = ({ children }) => {
  const [anchorEle, setAnchorEle] = React.useState<HTMLElement>();
  return (
    <MenuContext.Provider
      value={{
        anchorEle,
        setAnchorEle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

interface MenuContextProps {
  placement?: PopperPlacementType
}

export const MenuContent: React.FC<MenuContextProps> = ({ children, placement = 'top-end' }) => {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const { anchorEle } = React.useContext(MenuContext);

  const open = Boolean(anchorEle);

  React.useEffect(() => {
    if (open) {
      menuRef.current?.focus()
    }
  }, [open])
  
  return (
    <Popper placement={placement} open={open} disablePortal anchorEl={anchorEle}>
      <div tabIndex={-1} ref={menuRef} role="menu">{children}</div>
    </Popper>
  );
};
