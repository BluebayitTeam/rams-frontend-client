import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { selectFooterTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import clsx from "clsx";
import { Toolbar, Typography } from "@mui/material";
import { useGetSiteSettingsQuery } from "src/app/main/rams/SiteSettingsManagement/SiteSettingsApi";

/**
 * The footer layout 1.
 */
function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);

  const { data } = useGetSiteSettingsQuery({});

  const footerColor = data?.general_settings[0]?.color_code;
  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx("relative z-20 shadow-md", props.className)}
        color="default"
        style={{
          backgroundColor: footerColor,
          color: footerTheme.palette.background.default,
        }}
      >
        <Toolbar className="min-h-28 md:min-h-24 px-8 sm:px-12 py-0 flex justify-end items-center text-white overflow-x-auto">
          <Typography>
            Copyright by
            <a
              href="http://bluebayit.com/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", backgroundColor: "transparent" }}
            >
              &nbsp; Bluebay IT Limited{" "}
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
