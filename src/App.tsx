import React from "react";

import { Menu, MenuContent, MenuItem, MenuTrigger } from "./Menu";

export default function SimplePopper() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu>
        <MenuTrigger>
          <button>Toggle Popper</button>
        </MenuTrigger>
        <MenuContent>
          <Menu>
            <MenuTrigger>
              <MenuItem>Hello there</MenuItem>
            </MenuTrigger>
            <MenuContent placement="left-end">
              <MenuItem>Nested hello there 1</MenuItem>
              <MenuItem>Nested hello there 2</MenuItem>
            </MenuContent>
          </Menu>
          <MenuItem>Hi there</MenuItem>
          <Menu>
            <MenuTrigger>
              <MenuItem>Moi there</MenuItem>
            </MenuTrigger>
            <MenuContent placement="left-end">
              <MenuItem>Nested moi there</MenuItem>
            </MenuContent>
          </Menu>
        </MenuContent>
      </Menu>
    </div>
  );
}
