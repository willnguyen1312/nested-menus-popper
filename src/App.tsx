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
          <button onClick={() => console.log(123)}>Toggle</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>
            <h6>Hello there!!!</h6>
          </MenuItem>

          <Menu>
            <MenuTrigger>
              <MenuItem>
                <h6>Hi there!!!</h6>
              </MenuItem>
            </MenuTrigger>
            <MenuContent placement="left-start">
              <MenuItem>
                <h6>Hi there nested 1</h6>
              </MenuItem>
              <Menu>
                <MenuTrigger>
                  <MenuItem>
                    <h6>Hi there there!!!</h6>
                  </MenuItem>
                </MenuTrigger>
                <MenuContent placement="left-start">
                  <MenuItem>
                    <h6>Hi there there nested 1</h6>
                  </MenuItem>
                  <MenuItem>
                    <h6>Hi there there nested 2</h6>
                  </MenuItem>
                </MenuContent>
              </Menu>

              <Menu>
                <MenuTrigger>
                  <MenuItem>
                    <h6>Hei there there!!!</h6>
                  </MenuItem>
                </MenuTrigger>
                <MenuContent placement="left-start">
                  <MenuItem>
                    <h6>Hei there there nested 1</h6>
                  </MenuItem>
                  <MenuItem>
                    <h6>Hei there there nested 2</h6>
                  </MenuItem>
                </MenuContent>
              </Menu>
            </MenuContent>
          </Menu>

          <Menu>
            <MenuTrigger>
              <MenuItem>
                <h6>Moi there!!!</h6>
              </MenuItem>
            </MenuTrigger>
            <MenuContent placement="left-start">
              <MenuItem>
                <h6>Moi there nested 1</h6>
              </MenuItem>
              <MenuItem>
                <h6>Moi there nested 2</h6>
              </MenuItem>
            </MenuContent>
          </Menu>
        </MenuContent>
      </Menu>
    </div>
  );
}
