import FuseScrollbars from "@fuse/core/FuseScrollbars";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Typography from "@mui/material/Typography";
import FuseThemeSelector from "@fuse/core/FuseThemeSelector/FuseThemeSelector";
import { changeFuseTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { forwardRef, useEffect } from "react";
import Slide from "@mui/material/Slide";
import { useAppDispatch } from "app/store/store";
import themeOptions from "app/configs/themeOptions";
import { useCreateSiteSettingMutation } from "src/app/main/rams/SiteSettingsManagement/SiteSettingsApi";
import axios from "axios";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    position: "fixed",
    width: 380,
    maxWidth: "90vw",
    backgroundColor: theme.palette.background.paper,
    top: 0,
    height: "100%",
    minHeight: "100%",
    bottom: 0,
    right: 0,
    margin: 0,
    zIndex: 1000,
    borderRadius: 0,
  },
}));
const Transition = forwardRef((props, ref) => {
  const { children, ...other } = props;
  const theme = useTheme();
  console.log("themegfgfdgf", theme.section);

  if (!children) {
    return null;
  }

  return (
    <Slide
      direction={theme.direction === "ltr" ? "left" : "right"}
      ref={ref}
      {...other}
    >
      {children}
    </Slide>
  );
});

function ThemesPanel(props) {
  const { schemesHandlers, onClose, open } = props;
  const [createSiteSetting] = useCreateSiteSettingMutation();

  const dispatch = useAppDispatch();

  // Load theme from localStorage when component mounts
  //   useEffect(() => {
  //     const savedTheme = localStorage.getItem("theme");
  //     if (savedTheme) {
  //       dispatch(changeFuseTheme(JSON.parse(savedTheme)));
  //     }
  //   }, [dispatch]);

  // Function to save the selected theme using a POST request
  const handleThemeChange = async (selectedTheme) => {
    try {
      const response = await createSiteSetting({
        theme: selectedTheme.section,
      }).unwrap(); // RTK Query Mutation

      dispatch(changeFuseTheme(selectedTheme.section)); // Update Redux state after success
    } catch (error) {
      console.error("Failed to save theme:", error.message);
    }
  };

  return (
    <StyledDialog
      TransitionComponent={Transition}
      aria-labelledby="schemes-panel"
      aria-describedby="schemes"
      open={open}
      onClose={onClose}
      BackdropProps={{ invisible: true }}
      classes={{
        paper: "shadow-lg",
      }}
      {...schemesHandlers}
    >
      <FuseScrollbars className="p-16 sm:p-32">
        <IconButton
          className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
          onClick={onClose}
          size="large"
        >
          <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
        </IconButton>

        <Typography className="mb-32" variant="h6">
          Theme Color Options
        </Typography>

        <Typography
          className="mb-24 text-justify text-12 italic"
          color="text.secondary"
        >
          * Selected option will be applied to all layout elements (navbar,
          toolbar, etc.). You can also create your own theme options and color
          schemes.
        </Typography>

        {/* <FuseThemeSelector
          options={themeOptions}
          onSelect={(theme) => {
            console.log("themevcvcvcv", theme);
            localStorage.setItem("theme", JSON.stringify(theme.section)); // Save theme
            dispatch(changeFuseTheme(theme.section));
          }}
        /> */}
        <FuseThemeSelector
          options={themeOptions}
          onSelect={handleThemeChange}
        />
      </FuseScrollbars>
    </StyledDialog>
  );
}

export default ThemesPanel;
