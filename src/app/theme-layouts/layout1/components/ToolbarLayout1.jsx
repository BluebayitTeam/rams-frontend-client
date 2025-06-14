import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  selectFuseCurrentLayoutConfig,
  selectToolbarTheme,
} from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import NotificationPanelToggleButton from "src/app/main/apps/notifications/NotificationPanelToggleButton";
import NavbarToggleButton from "app/theme-layouts/shared-components/navbar/NavbarToggleButton";
import { selectFuseNavbar } from "app/theme-layouts/shared-components/navbar/store/navbarSlice";
import AdjustFontSize from "../../shared-components/AdjustFontSize";
import FullScreenToggle from "../../shared-components/FullScreenToggle";
import NavigationShortcuts from "../../shared-components/navigation/NavigationShortcuts";
import NavigationSearch from "../../shared-components/navigation/NavigationSearch";
import UserMenu from "../../shared-components/UserMenu";
import QuickPanelToggleButton from "../../shared-components/quickPanel/QuickPanelToggleButton";

/**
 * The toolbar layout 1.
 */
function ToolbarLayout1(props) {
  const { className } = props;
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx("relative z-20 flex shadow", className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? toolbarTheme.palette.background.paper
              : toolbarTheme.palette.background.default,
        }}
        position="static"
        elevation={0}
      >
        <Toolbar className="min-h-48 p-0 md:min-h-64">
          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === "left" && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === "style-3" ||
                    config.navbar.style === "style-3-dense") && (
                    <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
                  )}

                  {config.navbar.style === "style-1" && !navbar.open && (
                    <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
                </Hidden>
              </>
            )}

            <Hidden lgDown>
              <NavigationShortcuts />
            </Hidden>
          </div>

          <div className="flex h-full items-center overflow-x-auto px-8">
            {/* <LanguageSwitcher /> */}
            {/* <Configurator /> */}
            <AdjustFontSize />
            <FullScreenToggle />
            <NavigationSearch />
            <QuickPanelToggleButton />
            <NotificationPanelToggleButton />
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === "right" && (
            <>
              <Hidden lgDown>
                {!navbar.open && (
                  <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
