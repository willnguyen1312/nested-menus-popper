import React from "react";
import { noop } from "lodash-es";

import { Popper, PopperPlacementType } from "@material-ui/core";

const callAll = (...fns: any) => (...arg: any) =>
  fns.forEach((fn: any) => {
    fn && fn(...arg);
  });

interface MenuContextType {
  anchorEle?: HTMLElement;
  setAnchorEle: (anchorEle?: HTMLElement) => void;
}

const MenuContext = React.createContext<MenuContextType>({
  setAnchorEle: noop,
});

type GetTriggerElementProps = (
  options?: React.ButtonHTMLAttributes<HTMLElement>
) => React.ButtonHTMLAttributes<HTMLElement>;

interface MenuTriggerProps {
  render: ({
    getTriggerElementProps,
  }: {
    getTriggerElementProps: GetTriggerElementProps;
  }) => React.ReactNode;
}

export const MenuTrigger: React.FC<MenuTriggerProps> = ({ render }) => {
  const { setAnchorEle, anchorEle } = React.useContext(MenuContext);

  const handleOnclick = (event: Event) => {
    setAnchorEle(anchorEle ? undefined : (event.target as HTMLElement));
  };

  const getTriggerElementProps = (
    options: React.HTMLAttributes<HTMLElement> = {}
  ) => {
    return {
      ...options,
      onClick: callAll(handleOnclick, options.onClick),
      "aria-haspopup": true,
      "aria-expanded": Boolean(anchorEle),
    };
  };

  return <>{render({ getTriggerElementProps })}</>;
};

export const MenuItem: React.FC<React.ButtonHTMLAttributes<HTMLElement>> = ({
  children,
  onClick,
  role = "menuitem",
  ...rest
}) => {
  return (
    <div
      tabIndex={0}
      role={role}
      onClick={onClick}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          onClick && onClick(event as any);
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export const Menu: React.FC = ({ children }) => {
  const [anchorEle, setAnchorEle] = React.useState<HTMLElement>();

  const _setAnchorEle = React.useCallback((anchorEle?: HTMLElement) => {
    setTimeout(() => {
      setAnchorEle(anchorEle);
    }, 0);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        anchorEle,
        setAnchorEle: _setAnchorEle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

interface MenuContextProps {
  placement?: PopperPlacementType;
}

export const MenuContent: React.FC<MenuContextProps> = ({
  children,
  placement = "top-end",
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { anchorEle, setAnchorEle } = React.useContext(MenuContext);

  const open = Boolean(anchorEle);

  React.useEffect(() => {
    if (open) {
      menuRef.current?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const menu = menuRef.current;

      if (menu && !menu.contains(event.target as Node)) {
        setAnchorEle(undefined);
      }
    };

    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [setAnchorEle]);

  React.useEffect(() => {
    const clickHandler = (event: KeyboardEvent) => {
      const menu = menuRef.current;

      if (
        event.key === "Enter" &&
        menu &&
        !menu.contains(event.target as Node)
      ) {
        setAnchorEle(undefined);
      }
    };

    window.addEventListener("keyup", clickHandler);

    return () => {
      window.removeEventListener("keyup", clickHandler);
    };
  }, [setAnchorEle]);

  return (
    <Popper
      placement={placement}
      open={open}
      disablePortal
      anchorEl={anchorEle}
    >
      <div tabIndex={-1} ref={menuRef} role="menu">
        {children}
      </div>
    </Popper>
  );
};
