import FuseLoading from "@fuse/core/FuseLoading";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BASE_URL, GET_SITESETTINGS } from "src/app/constant/constants";
import JwtLoginTab from "./tabs/JwtSignInTab";

/**
 * The sign in page.
 */
function SignInPage() {
  const [selectedTabId, setSelectedTabId] = useState("jwt");
  const [generalData, setGeneralData] = useState({});
  const [loading, setLoading] = useState(true); // New loading state
  // const colorCode = generalData?.color_code;
  const colorCode = localStorage.getItem("color_code");

  useEffect(() => {
    const storedColorCode = localStorage.getItem("color_code");
    if (storedColorCode) {
      setGeneralData((prevData) => ({
        ...prevData,
        color_code: storedColorCode,
      }));
    }

    fetch(`${GET_SITESETTINGS}`)
      .then((response) => response.json())
      .then((data) => {
        const settings = data?.general_settings[0] || {};
        setGeneralData(settings);
        if (settings.color_code) {
          localStorage.setItem("color_code", settings.color_code);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Show loading indicator while data is being fetched
  if (loading) {
    return <FuseLoading className="min-h-screen" />;
  }

  return (
    <div
      style={{ backgroundColor: colorCode }}
      className="flex flex-col items-center justify-center flex-shrink-0 p-16 md:p-32 w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row w-[500px] max-w-none rounded-20 shadow-2xl overflow-hidden"
      >
        {/* Left Section */}
        <Card
          className="flex flex-col flex-1 items-center py-[86px] justify-center shadow-0 w-full"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full  max-w-[400px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center ">
                <img
                  className="logo-icon w-[84px]"
                  // src="/assets/images/logo/BLUEBAYITLOGO.png"
                  src={`${BASE_URL}${generalData?.logo}`}
                  alt="logo"
                />
                <div className="mr-4 w-1 h-[40px]" />
                <div>
                  <Typography
                    className="text-2xl font-semibold logo-text"
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
        {/* <div className="flex md:flex-1 items-center justify-center p-[64px] w-full">
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
        </div> */}
      </motion.div>
    </div>
  );
}

export default SignInPage;
