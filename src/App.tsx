import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Menu } from "./Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function SimplePopper() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

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
      <button type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Menu anchorEl={anchorEl}>
        <Menu.Item
          clickable
          render={({ anchorEl }) => {
            return (
              <div className={classes.paper}>
                <>First content of the Popper</>
                <Menu size="small" anchorEl={anchorEl} placement="left-end">
                  <Menu.Item
                    render={() => (
                      <div className={classes.paper}>Nested content 1</div>
                    )}
                  />
                  <Menu.Item
                    render={() => (
                      <div className={classes.paper}>Nested content 2</div>
                    )}
                  />
                </Menu>
              </div>
            );
          }}
        />
        <Menu.Item
          render={() => (
            <div className={classes.paper}>
              <>Second content of the Popper</>
            </div>
          )}
        />
      </Menu>
    </div>
  );
}
