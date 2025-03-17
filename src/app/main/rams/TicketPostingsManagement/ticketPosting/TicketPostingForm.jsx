import { useParams } from "react-router-dom";
import { getAgents, getPassengers } from "app/store/dataSlice";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER,
  SEARCH_TICKETPOSTING,
} from "src/app/constant/constants";
import Swal from "sweetalert2";
import MultipleTicketsTable from "./MultipleTicketsTable";
import { useCreateTicketPostingMutation } from "../TicketPostingsApi";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import CustomDropdownField from "src/app/@components/CustomDropdownField";
import { Button } from "@mui/material";
import axios from "axios";
import { CustomNotification } from "src/app/@customHooks/notificationAlert";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
}));

function TicketPostingForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue, setError, getValues } = methods;
  const [createTicketPosting] = useCreateTicketPostingMutation();
  const routeParams = useParams();
  const classes = useStyles(props);
  const agents = useSelector((state) => state.data.agents);
  const [mltTicketList, setMltTicketList] = useState([]);
  console.log("mltTicketList", mltTicketList);
  const [selectedTickets, setSelectedTickets] = useState([]);

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getAgents());
  }, []);

  const handleGetAvaiableTicketForPosting = async () => {
    try {
      const authTOKEN = {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      };

      const response = await axios.get(
        `${SEARCH_TICKETPOSTING}?customer=${watch("customer") || ""}&date_after=${
          watch("date_after") || ""
        }&date_before=${watch("date_before") || ""}`,
        authTOKEN
      );

      setMltTicketList(response?.data?.ticketpostings);
    } catch (error) {
      console.error(error);
      setMltTicketList([]);
      CustomNotification("error", error?.response?.data?.detail);
    }
  };

  useEffect(() => {
    handleGetAvaiableTicketForPosting();
  }, [watch("customer"), watch("date_after"), watch("date_before")]);

  function handleSaveTicketposting() {
    createTicketPosting({ ids: selectedTickets })
      .unwrap()
      .then((data) => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully post this Ticket",
          showConfirmButton: false,
          timer: 2000,
        });

        setMltTicketList([]);
      });
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <CustomDatePicker
          name="date_after"
          label="Date From"
          placeholder="DD-MM-YYYY"
        />

        <CustomDatePicker
          name="date_before"
          label="Date To"
          placeholder="DD-MM-YYYY"
        />
      </div>

      <CustomDropdownField
        name="customer"
        label="Customer"
        options={agents}
        optionLabelFormat={(option) =>
          `${option.first_name || ""} ${option.agent_code || ""}`
        }
      />

      {mltTicketList?.length > 0 && (
        <div>
          <MultipleTicketsTable
            tickets={mltTicketList}
            setSelectedTickets={setSelectedTickets}
            selectedTickets={selectedTickets}
          />
        </div>
      )}

      {mltTicketList?.length > 0 && (
        <Button
          className="whitespace-nowrap mt-20 mx-auto text-center"
          variant="contained"
          color="secondary"
          onClick={handleSaveTicketposting}
          disabled={selectedTickets.length === 0}
        >
          Submit Posting
        </Button>
      )}
    </div>
  );
}

export default TicketPostingForm;
