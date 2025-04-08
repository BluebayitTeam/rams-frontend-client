import { memo } from "react";
import Box from "@mui/material/Box";
import { useGetSiteSettingsQuery } from "src/app/main/rams/SiteSettingsManagement/SiteSettingsApi";

/**
 * The FuseSplashScreen component is responsible for rendering a splash screen with a logo and a loading spinner.
 * It uses various MUI components to render the logo and spinner.
 * The component is memoized to prevent unnecessary re-renders.
 */

function FuseSplashScreen() {
  const { data } = useGetSiteSettingsQuery({});

  const footerColor = data?.general_settings[0]?.color_code;
  return (
    <div id="fuse-splash-screen">
      <div className="logo">
        <img width="128" src="assets/images/logo/bbit.png" alt="logo" />
      </div>
      <Box
        id="spinner"
        sx={{
          "& > div": {
            backgroundColor: footerColor,
          },
        }}
      >
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </Box>
    </div>
  );
}

export default memo(FuseSplashScreen);
