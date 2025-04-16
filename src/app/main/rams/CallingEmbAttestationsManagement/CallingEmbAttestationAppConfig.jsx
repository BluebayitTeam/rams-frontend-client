import { Navigate } from "react-router-dom";
import CallingEmbAttestationApp from "./CallingEmbAttestationApp";
import CallingEmbAttestation from "./CallingEmbAttestation/CallingEmbAttestation";

/**
 * The E-Commerce app configuration.
 */
const CallingEmbAttestationAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/malayasiaStatus",
      element: <CallingEmbAttestationApp />,
      children: [
        {
          path: "",
          element: <Navigate to="malayasiaStatuss" />,
        },

        {
          path: "malayasiaStatuss/:malayasiaStatussId/:fromSearch?",
          element: <CallingEmbAttestation />,
        },
      ],
    },
  ],
};
export default CallingEmbAttestationAppConfig;
