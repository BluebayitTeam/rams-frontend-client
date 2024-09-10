import { Navigate } from "react-router-dom";
import ManpowerNoteSheetFemaleApp from "./ManpowerNoteSheetFemaleApp";
import ManpowerNoteSheetFemale from "./manpowerNoteSheetFemale/ManpowerNoteSheetFemale";

/**
 * The E-Commerce app configuration.
 */
const ManpowerNoteSheetFemaleAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/manpowerNoteSheetFemale",
      element: <ManpowerNoteSheetFemaleApp />,
      children: [
        {
          path: "",
          element: <Navigate to="manpowerNoteSheetFemales" />,
        },

        {
          path: "manpowerNoteSheetFemales/:manpowerNoteSheetFemaleId?/*",
          element: <ManpowerNoteSheetFemale />,
        },
      ],
    },
  ],
};
export default ManpowerNoteSheetFemaleAppConfig;
