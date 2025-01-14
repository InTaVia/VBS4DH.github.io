import React, { useState } from "react";

import {
  Drawer,
  Divider,
  Toolbar,
  Chip,
  Typography,
  InputBase,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Hidden,
} from "@material-ui/core";
import {
  Search as SearchIcon,
  LaunchOutlined as LaunchIcon,
} from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import { colors, dimensions, getAvatar, rows } from "../index";
import { useStyles } from "./style";

import { ChartModal, TPaperMatrix } from "../ChartModal";

const VISTagDetails = {
  "Data Processing4VIS":
    "raw data is transformed into a format that better suits the following visualization processes.",
  "Data-VIS Mapping":
    "the values of data fields are mapped into the visual channels of graphic marks.",
  "Insight Communication":
    "insights are transformed into visualizations that can effectively communicate them.",
  "Style Imitation":
    "the styles of given visualizations examples are applied to create new visualizations. ",
  "VIS Reading":
    "users observe the appearance of a visualization, read the encoded data, and understand the underlying information. ML techniques try to automatically 'read' the visualizations like humans",
  "User Profiling":
    "user actions with visualizations are logged and then analyzed in order to better understand users.",
  "VIS Interaction":
    "users interact with the visualization and change its appearance.",
  Person: "Persons",
};

interface Props {
  paperNumber: number;
  version: string;
  VISTags: Record<string, boolean>;
  UpperRow: Record<string, boolean>;
  LowerRow: Record<string, boolean>;
  MLTags: Record<string, boolean>;
  paperYear: Record<string, number>;
  paperArea: Record<string, number>;
  paperMatrix: TPaperMatrix;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  onClickFilter: (
    k: string,
    type: "UpperRow" | "LowerRow",
    select?: boolean
  ) => void;
  onSetSearchKey: (key: string) => void;
  onSetVersion: (version: string) => void;
}

export function SideBar(props: Props) {
  const {
    paperNumber,
    VISTags,
    UpperRow,
    LowerRow,
    MLTags,
    onClickFilter,
    onSetSearchKey,
    onSetVersion,
    paperArea,
    paperYear,
    paperMatrix,
    mobileOpen,
    handleDrawerToggle,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log(UpperRow, LowerRow);

  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(UpperRow);

  const drawer = (
    <div className={classes.drawerContainer}>
      <Toolbar />

      <Typography variant="h5" className={classes.paperNumber}>
        Examples and Tools: {paperNumber}
      </Typography>

      <Divider />

      <Typography variant="subtitle2" className={classes.filterTitle}>
        Keywords search:
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => onSetSearchKey(event.target.value)}
        />
      </div>

      {/* <Divider />
      <ChartModal
        paperYear={paperYear}
        paperArea={paperArea}
        paperMatrix={paperMatrix}
      /> */}
      <Divider />

      {/*  <Typography variant="subtitle2" className={classes.filterTitle}>
        VIS process filter:{" "}
        <Button
          variant="outlined"
          size="small"
          onClick={() => onClickFilter("all", "VIS")}
        >
          {" "}
          {Object.values(VISTags).every((d) => d)
            ? "Unselect All"
            : "Select All"}
        </Button>
      </Typography>
      <div className={classes.filters}>
        {Object.entries(VISTags).map(([v, checked]) => (
          <Tooltip key={v} title={VISTagDetails[v]}>
            <Chip
              key={v}
              avatar={
                <Avatar src={`assets/avatars/${v.replace(" ", "_")}_w.png`} />
              }
              label={v}
              clickable
              variant={checked ? "default" : "outlined"}
              color="primary"
              onClick={() => onClickFilter(v, "VIS")}
            />
          </Tooltip>
        ))}
      </div>
      <Divider /> */}

      {rows["upper"].map((dimension) => {
        return (
          <>
            <Typography variant="subtitle2" className={classes.filterTitle}>
              {dimension} filter:{" "}
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  const select = Object.entries(UpperRow)
                    .filter((e) => {
                      return dimensions[dimension].includes(
                        e[0].replace(dimension + ":", "")
                      );
                    })
                    .every((d) => d[1]);
                  onClickFilter(
                    `allCategories${dimension}`,
                    "UpperRow",
                    select
                  );
                }}
              >
                {" "}
                {Object.entries(UpperRow)
                  .filter((e) => {
                    return dimensions[dimension].includes(
                      e[0].replace(dimension + ":", "")
                    );
                  })
                  .every((d) => d[1])
                  ? "Unselect All"
                  : "Select All"}
              </Button>
            </Typography>
            <div className={classes.filters}>
              <div className={classes.filters}>
                {Object.entries(UpperRow)
                  .filter((e) => {
                    return dimensions[dimension].includes(
                      e[0].replace(dimension + ":", "")
                    );
                  })
                  .map(([m, checked]) => {
                    const mCleared = m.replace(dimension + ":", "");
                    return (
                      <Chip
                        key={m}
                        avatar={
                          <Avatar
                            style={{
                              color: "white",
                              backgroundColor: colors[dimension],
                            }}
                          >
                            <b>{getAvatar(mCleared)}</b>
                          </Avatar>
                        }
                        label={`${mCleared[0].toUpperCase()}${mCleared.slice(
                          1
                        )}`}
                        clickable
                        onClick={() => onClickFilter(`${m}`, "UpperRow")}
                        style={{
                          backgroundColor: checked
                            ? colors[dimension]
                                ?.replace("rgb", "rgba")
                                .replace(")", ",0.8)")
                            : "white",
                        }}
                        variant={checked ? "default" : "outlined"}
                      />
                    );
                  })}
              </div>
            </div>
            <Divider />
          </>
        );
      })}

      {rows["lower"].map((dimension) => {
        return (
          <>
            <Typography variant="subtitle2" className={classes.filterTitle}>
              {dimension} filter:{" "}
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  const select = Object.entries(LowerRow)
                    .filter((e) => {
                      return dimensions[dimension].includes(
                        e[0].replace(dimension + ":", "")
                      );
                    })
                    .every((d) => d[1]);

                  onClickFilter(
                    `allCategories${dimension}`,
                    "LowerRow",
                    select
                  );
                }}
              >
                {" "}
                {Object.entries(LowerRow)
                  .filter((e) => {
                    return dimensions[dimension].includes(
                      e[0].replace(dimension + ":", "")
                    );
                  })
                  .every((d) => d[1])
                  ? "Unselect All"
                  : "Select All"}
              </Button>
            </Typography>
            <div className={classes.filters}>
              <div className={classes.filters}>
                {Object.entries(LowerRow)
                  .filter((e) => {
                    return dimensions[dimension].includes(
                      e[0].replace(dimension + ":", "")
                    );
                  })
                  .map(([m, checked]) => {
                    const mCleared = m.replace(dimension + ":", "");
                    return (
                      <Chip
                        key={m}
                        avatar={
                          <Avatar
                            style={{
                              color: "white",
                              backgroundColor: colors[dimension],
                            }}
                          >
                            <b>{getAvatar(mCleared)}</b>
                          </Avatar>
                        }
                        label={`${mCleared[0].toUpperCase()}${mCleared.slice(
                          1
                        )}`}
                        clickable
                        variant={checked ? "default" : "outlined"}
                        style={{
                          backgroundColor: checked
                            ? colors[dimension]
                                ?.replace("rgb", "rgba")
                                .replace(")", ",0.8)")
                            : "white",
                        }}
                        onClick={() => {
                          onClickFilter(`${m}`, "LowerRow");
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <Divider />
          </>
        );
      })}

      {/*  <Typography variant="subtitle2" className={classes.filterTitle}>
        ML tasks filter:{" "}
        <Button
          variant="outlined"
          size="small"
          onClick={() => onClickFilter("all", "ML")}
        >
          {" "}
          {Object.values(MLTags).every((d) => d)
            ? "Unselect All"
            : "Select All"}
        </Button>
      </Typography>
      <div className={classes.filters}>
        <div className={classes.filters}>
          {Object.entries(MLTags).map(([m, checked]) => (
            <Chip
              key={m}
              avatar={
                <Avatar style={{ color: "white" }}>
                  <b>{getAvatar(m)}</b>
                </Avatar>
              }
              label={`${m[0].toUpperCase()}${m.slice(1)}`}
              clickable
              variant={checked ? "default" : "outlined"}
              color="secondary"
              onClick={() => onClickFilter(m, "ML")}
            />
          ))}
        </div>
      </div>
      <Divider /> */}
      {/* <FormControl required className={classes.formControl}>
    <InputLabel>Version</InputLabel> */}
      {/* </FormControl> */}

      <Divider />
      <Button onClick={handleClick}>
        <LaunchIcon /> <span>Other Related Surveys</span>
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        aria-haspopup="true"
        keepMounted
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => window.open("https://arxiv.org/pdf/2102.01330")}
        >
          Survey on Artificial Intelligence Approaches for Visualization Data
        </MenuItem>
        <MenuItem
          onClick={() => window.open("https://arxiv.org/abs/2204.06504")}
        >
          DL4SciVis: A State-of-the-Art Survey on Deep Learning for Scientific
          Visualization
        </MenuItem>
        <MenuItem
          onClick={() =>
            window.open(
              "https://www.sciencedirect.com/science/article/pii/S2468502X20300292"
            )
          }
        >
          A survey on automatic infographics and visualization recommendations
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        {/* this drawer is for the mobile mode */}
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}
