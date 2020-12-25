import { Menu, MenuContent, MenuItem, MenuTrigger } from "./Menu";

export default function SimplePopper() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Menu>
        <MenuTrigger>
          <button onClick={() => console.log(123)}>Toggle Popper</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>
            <h1>Hello there!!!</h1>
          </MenuItem>

          <Menu>
            <MenuTrigger>
              <MenuItem>
                <h1>Hi there!!!</h1>
              </MenuItem>
            </MenuTrigger>
            <MenuContent placement="left-start">
              <MenuItem>
                <h1>Hi there nested 1</h1>
              </MenuItem>
              <MenuItem>
                <h1>Hi there nested 2</h1>
              </MenuItem>
            </MenuContent>
          </Menu>

          
          <Menu>
            <MenuTrigger>
              <MenuItem>
                <h1>Moi there!!!</h1>
              </MenuItem>
            </MenuTrigger>
            <MenuContent placement="left-start">
              <MenuItem>
                <h1>Moi there nested 1</h1>
              </MenuItem>
              <MenuItem>
                <h1>Moi there nested 2</h1>
              </MenuItem>
            </MenuContent>
          </Menu>
        </MenuContent>
      </Menu>
    </div>
  );
}
