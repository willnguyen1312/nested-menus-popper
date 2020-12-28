import React, {
  createContext,
  useState,
  FC,
  useContext,
  useRef,
  useEffect,
} from "react";
import { noop } from "lodash-es";

import { Popper, PopperPlacementType } from "@material-ui/core";

interface MenuContextType {
  toggleMenuOpen: (event: Event) => void;
  anchorEl: HTMLElement | null | undefined;
}

const MenuContext = createContext<MenuContextType>({
  toggleMenuOpen: noop,
  anchorEl: null,
});

export const Menu: FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const toggleMenuOpen = (event: Event) => {
    setAnchorEl(anchorEl ? null : (event.currentTarget as HTMLElement));
  };

  return (
    <MenuContext.Provider
      value={{
        toggleMenuOpen,
        anchorEl,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const MenuTrigger: FC = ({ children }) => {
  const { toggleMenuOpen } = useContext(MenuContext);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: toggleMenuOpen,
        onKeyUp: (event: KeyboardEvent) => {
          if (event.key === "Enter") {
            toggleMenuOpen(event);
          }
        },
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

interface MenuContentProps {
  placement?: PopperPlacementType;
}

export const MenuContent: FC<MenuContentProps> = ({
  children,
  placement = "top-end",
}) => {
  const { anchorEl } = useContext(MenuContext);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (open) {
      menuRef.current?.focus();
    }
  }, [open]);

  return (
    <Popper open={open} anchorEl={anchorEl} disablePortal placement={placement}>
      <div ref={menuRef} role="menu" tabIndex={-1}>
        {children}
      </div>
    </Popper>
  );
};

interface MenuItemProps {
  handler?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({ children, handler, ...rest }) => {
  return (
    <div
      onClick={(event) => {
        handler && handler();
        (rest as any).onClick && (rest as any).onClick(event);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          handler && handler();
        }
        (rest as any).onKeyUp && (rest as any).onKeyUp(event);
      }}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </div>
  );
};
