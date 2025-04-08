import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import { BASE_URL, GET_SITESETTINGS } from "src/app/constant/constants";
import JwtLoginTab from "./tabs/JwtSignInTab";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { Card, darken } from "@mui/material";
import { motion } from "framer-motion";

// import FirebaseSignInTab from './tabs/FirebaseSignInTab';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    background: `linear-gradient(to right, ${props.color} 0%, ${darken(
      props.color,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  }),
  leftSection: {},
  rightSection: (props) => ({
    background: `linear-gradient(to right, ${props.color} 0%, ${darken(
      props.color,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  }),
}));

const tabs = [
  {
    id: "jwt",
    title: "JWT",
    logo: "assets/images/logo/jwt.svg",
    logoClass: "h-40 p-4 bg-black rounded-12",
  },
];

/**
 * The sign in page.
 */
function SignInPage() {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  function handleSelectTab(id) {
    setSelectedTabId(id);
  }

  const [generalData, setGeneralData] = useState({});
  const footerColor = generalData?.color_code;
  const classes = useStyles({ color: footerColor });
  // get general setting data
  useEffect(() => {
    fetch(`${GET_SITESETTINGS}`)
      .then((response) => response.json())
      .then((data) => setGeneralData(data?.general_settings[0] || {}));
  }, []);
  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col items-center justify-center flex-shrink-0 p-16 md:p-32 w-full min-h-screen"
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-none rounded-20 shadow-2xl overflow-hidden"
      >
        {/* Left Section */}
        <Card
          className={clsx(
            classes.leftSection,
            "flex flex-col flex-1 items-center justify-center shadow-0 w-full"
          )}
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-[96px] max-w-[400px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-[38px]">
                <img
                  className="logo-icon w-[64px]"
                  src="/assets/images/logo/BLUEBAYITLOGO.png"
                  alt="logo"
                />
                <div className="mr-4 w-1 h-[40px]" />
                <div>
                  <Typography
                    className="text-3xl font-semibold logo-text"
                    color="inherit"
                  >
                    {generalData?.site_name}
                  </Typography>
                </div>
              </div>
              {selectedTabId === "jwt" && <JwtLoginTab />}
            </motion.div>
          </CardContent>
        </Card>

        {/* Right Section */}
        <div
          className={clsx(
            classes.rightSection,
            "flex flex-1 items-center justify-center p-[64px] w-full"
          )}
        >
          <div className="max-w-[320px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <img
                src="/assets/images/logos/bbit.png"
                className="text-64 font-semibold logo-text"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SignInPage;
