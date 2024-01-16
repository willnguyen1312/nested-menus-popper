import React, { FC, useEffect, useRef, useState } from "react";

import Popper from "@material-ui/core/Popper";

interface ItemProps {
  clickable?: boolean;
  render: ({
    anchorEl,
    getChildProps,
  }: {
    anchorEl?: HTMLElement | null;
    getChildProps?: Function;
  }) => React.ReactNode;
}

const Item: FC<ItemProps> = ({ render, clickable = false }) => {
  const [anchorEl, setAnchorEle] = useState<HTMLDivElement | null>(null);

  const extraProps = clickable
    ? {
        onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          setAnchorEle(anchorEl ? null : event.currentTarget);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter") {
            setAnchorEle(anchorEl ? null : event.currentTarget);
          }
        },
      }
    : {};

  const childrenWithProps = React.Children.map(
    render({ anchorEl }),
    (child) => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
        console.log(child.props);

        const extra = clickable
          ? {}
          : {
              onClick: (event: Event) => {
                event.stopPropagation();
              },
            };
        return React.cloneElement(child, extra);
      }
      return child;
    },
  );

  return (
    <div
      style={{
        cursor: clickable ? "pointer" : "initial",
      }}
      tabIndex={0}
      role="menuitem"
      {...extraProps}
    >
      {childrenWithProps}
    </div>
  );
};

interface MenuProps {
  anchorEl?: HTMLElement | null;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  size?: "medium" | "small";
}

export const Menu: FC<MenuProps> & {
  Item: typeof Item;
} = ({ children, anchorEl, placement = "top-end", size = "medium" }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (open) {
      menuRef.current?.focus();
    }
  }, [open]);

  return (
    <Popper open={open} anchorEl={anchorEl} disablePortal placement={placement}>
      <div
        style={{
          width: size === "medium" ? 300 : 200,
        }}
        role="menu"
        tabIndex={-1}
        ref={menuRef}
        onKeyDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </Popper>
  );
};

Menu.Item = Item;
