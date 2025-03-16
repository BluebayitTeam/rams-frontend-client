/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  tooltipClasses,
} from "@mui/material";
import {
  getAgencys,
  getAgents,
  getAirways,
  getBranches,
  getCountries,
  getCurrencies,
  getCurrentstatuses,
  getEmployees,
  getGDSs,
  getPassengers,
  getProfessions,
} from "app/store/dataSlice";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Delete } from "@mui/icons-material";

import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  BASE_URL,
  DELETE_TICKETSALE_WITH_IMAGE,
  GET_TICKETSALES_WITH_IMAGE,
} from "src/app/constant/constants";
import { activeCncl, ticketSalesTicketStatus } from "src/app/@data/data";
import { PictureAsPdf } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DescriptionIcon from "@mui/icons-material/Description";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import CustomDropdownField from "src/app/@components/CustomDropdownField";
import CustomTextField from "src/app/@components/CustomTextField";
import CustomCheckbox from "src/app/@components/CustomCheckbox";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateTicketSaleMutation,
  useCreateTicketSingleSaleMutation,
  useGetTicketTempTableDataQuery,
} from "../TicketSalesApi";
import axios from "axios";
import moment from "moment";

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function TicketSaleForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue, setError, getValues, reset } =
    methods;
  const { errors } = formState;
  const routeParams = useParams();
  const { ticketSaleId } = routeParams;
  const classes = useStyles(props);
  const passengers = useSelector((state) => state.data.passengers);
  const professions = useSelector((state) => state.data.professions);
  const countries = useSelector((state) => state.data.countries);
  const branches = useSelector((state) => state.data.branches);
  const agents = useSelector((state) => state.data.agents);
  const GDSs = useSelector((state) => state.data.gdss);
  const employees = useSelector((state) => state.data.employees);
  const airways = useSelector((state) => state.data.airways);
  const currencies = useSelector((state) => state.data.currencies);
  const { data, refetch } = useGetTicketTempTableDataQuery();
  const iataTableData = data?.iata_ticket_temp_temps;
  const [mtlTicketDetails, setMltTicketDetails] = useState([]);

  const [createTicketSale] = useCreateTicketSaleMutation();
  // const [createTicketSingleSale] = useCreateTicketSingleSaleMutation();

  useEffect(() => {
    dispatch(getProfessions());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getPassengers());
    dispatch(getAgencys());
    dispatch(getBranches());
    dispatch(getEmployees());
    dispatch(getAirways());
    dispatch(getGDSs());
    dispatch(getCurrencies());
    dispatch(getCurrentstatuses());
    setValue("sales_amount", 0);
    setValue("purchase_amount", 0);
    refetch();
  }, []);

  const handleDeleteTicketPicsale = async (id) => {
    try {
      const response = await axios.delete(
        `${DELETE_TICKETSALE_WITH_IMAGE}${id}`
      );
      const data = response.data;
      DeletedSuccessfully();
      // Call function to refresh the table data after deletion
      refetch();

      console.log("Successfully deleted:", data);
    } catch (error) {
      console.error("Error deleting ticket sale:", error);
    }
  };

  function handleSubmitTicketSale() {
    createTicketSale(getValues());
    AddedSuccessfully();
    refetch();
    reset({});
    navigate("/apps/ticketSale/ticketSales");
  }

  const CreateInputFields = () => {
    const fields = [];
    for (let i = 0; i < Number(watch("qty")); i++) {
      const Specific_ticket_number = Number(watch("tkt_num")) + i;
      setValue(`items.${i}.ticket_no`, Specific_ticket_number);
      fields.push({
        ticket_no: Specific_ticket_number,
        pax_name: "",
        passport_no: "",
      });
    }
    console.log(`gasjfsdf`, fields);
    // setInputFields(data);
    setMltTicketDetails(fields);

    setValue("pax_name", "");
    setValue("passenger", "");
  };
  return (
    <div>
      {ticketSaleId !== "new" && (
        <Controller
          name="mlt_ticket_update"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormControlLabel
                label="All Ticket Update in this Invoice"
                control={
                  <Checkbox
                    {...field}
                    checked={field.value ? field.value : false}
                  />
                }
              />
            </FormControl>
          )}
        />
      )}
      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full md:w-1/2 px-2">
          <CustomDropdownField
            name="branch"
            label="Branch"
            options={branches}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <CustomDropdownField
            name="customer"
            label="Customer"
            options={agents}
            optionLabelFormat={(option) =>
              `${option.first_name || ""} ${option.last_name || ""}`
            }
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full md:w-1/2 px-2">
          <CustomDropdownField
            name="ticket_agency"
            label="Ticket Agency"
            options={agents}
            optionLabelFormat={(option) =>
              `${option.first_name || ""} ${option.last_name || ""}`
            }
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <CustomDropdownField
            name="issue_person"
            label="Issue Person"
            options={employees}
            optionLabelFormat={(option) =>
              `${option.first_name || ""} ${option.last_name || ""}`
            }
            required
          />
        </div>
      </div>

      {ticketSaleId === "new" && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomCheckbox name="is_other_entry" label="Other" />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <CustomCheckbox
              name="is_multi_ticket_entry"
              label="Multiple Ticket No"
            />
          </div>
        </div>
      )}

      {!watch("is_multi_ticket_entry") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomDropdownField
              name="passenger"
              label="Passenger"
              options={passengers}
              disabled={watch("pax_name")?.length > 1}
              optionLabelFormat={(option) => `${option.passenger_name || ""}`}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mt-8">
            <CustomTextField
              name="pax_name"
              label="Pax Name"
              disabled={watch("passenger")}
            />
          </div>
        </div>
      )}

      {watch("is_multi_ticket_entry") && (
        <div className="flex md:space-x-12 flex-col md:flex-row my-10">
          <h3>Please Enter Ticket Number and Quantity :</h3>
        </div>
      )}
      {watch("is_multi_ticket_entry") && (
        <div className="flex md:space-x-12 flex-col md:flex-row">
          <CustomTextField
            name="tkt_num"
            label="Ticket No"
            placeholder="Ticket number must be 10 digits"
          />{" "}
          <CustomTextField
            name="qty"
            label="QTY"
            placeholder="Ticket number must be 10 digits"
            disabled={watch("tkt_num")?.length !== 10}
          />
          <Button
            className=" "
            variant="contained"
            color="secondary"
            onClick={() => {
              CreateInputFields();
            }}
            disabled={
              watch("tkt_num")?.length !== 10 || watch("qty")?.length === 0
            }
            style={{
              backgroundColor: "#ea5b78",
              color: "white",
              padding: "13px",
              height: "40px",
              marginTop: "13px",
              marginLeft: "30px",
            }}
          >
            Create
          </Button>
        </div>
      )}

      {watch("is_multi_ticket_entry") &&
        mtlTicketDetails?.length > 0 &&
        mtlTicketDetails?.map((data, idx) => (
          <div key={idx} className="flex md:space-x-12 flex-col md:flex-row">
            <CustomTextField
              name={`items.${idx}.ticket_no`}
              label="Ticket No"
              placeholder="Ticket No"
              defaultValue={data.ticket_no} // Set default value from data
            />
            <CustomTextField
              name={`items.${idx}.pax_name`}
              label="Pax Name"
              defaultValue={data.pax_name} // Set default value from data
            />
            <CustomTextField
              name={`items.${idx}.passport_no`}
              label="Passport No"
              defaultValue={data.passport_no} // Set default value from data
            />
          </div>
        ))}

      {!watch("is_multi_ticket_entry") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField name="passport_no" label="Passport No" />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField
              name="ticket_no"
              label="Ticket No"
              placeholder="Ticket number must be 10 digits"
              required
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className=" w-full md:w-6/12 px-2">
          <CustomDatePicker
            name="issue_date"
            label="Issue Date"
            placeholder="DD-MM-YYYY"
            required
          />
        </div>

        <div className="w-full md:w-1/2 px-2">
          <CustomDatePicker
            name="flight_date"
            label="Flight Date"
            placeholder="DD-MM-YYYY"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full ">
        <div className="w-full mt-8 md:w-1/2 px-2">
          <CustomDropdownField
            name="current_airway"
            label="Current Airway"
            options={airways}
            optionLabelFormat={(option) => `${option.name || ""} `}
            required
          />
        </div>
        <div className="w-full mt-[1.7rem]  md:w-1/2 px-2">
          <CustomTextField name="flight_no" label="Flight No" />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full md:w-1/2 px-2">
          <CustomTextField name="_class" label="Class name" />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <CustomTextField name="sector" label="Sector Name" />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full md:w-1/2 px-2">
          <CustomTextField name="flight_time" label="Flight Time" />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <CustomTextField name="arrived_time" label="Arrival Time" />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full mt-8 md:w-1/2 px-2">
          <CustomTextField name="airline_pnr" label="Airline PNR" />
        </div>
        <div className="w-full mt-[1.7rem] md:w-1/2 px-2">
          <CustomDatePicker
            name="return_flight_date"
            label="Return Flight Date"
            placeholder="DD-MM-YYYY"
            required
          />
        </div>
      </div>

      {watch("is_sales_purchase_amount_only") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField name="sales_amount" label="Sales Amount" />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField name="purchase_amount" label="Purchase Amount" />
          </div>
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="mt-[-0.3rem] mb-16 w-full md:w-6/12 px-2">
          <CustomDropdownField name="gds" label="GDS" options={GDSs} />
        </div>
        <div className="mt-8 mb-16 w-full md:w-6/12 px-2">
          <CustomTextField name="gds_pnr" label="GDS PNR" />
        </div>
      </div>

      {!watch("is_sales_purchase_amount_only") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField
              name="fare_amount"
              label="Ticket Fare Amount"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField name="tax_amount" label="Tax Amount" required />
          </div>
        </div>
      )}

      {!watch("is_sales_purchase_amount_only") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField
              name="customer_commission_rate"
              label="Customer Comission(%)"
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField
              name="customer_commission_amount"
              label="Customer Comission Amount"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full md:w-1/2 px-2">
          <CustomTextField
            name="airline_commission_rate"
            label="Airline Comission Rate(%)"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <CustomTextField
            name="airline_commission_amount"
            label="Airline Comission Amount"
          />
        </div>
      </div>

      {!watch("is_sales_purchase_amount_only") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full mt-8 md:w-1/2 px-2">
            <CustomDropdownField
              name="Currency"
              label="Currency"
              options={currencies}
            />
          </div>
          <div className="w-full mt-[1.7rem] md:w-1/2 px-2">
            <CustomTextField name="dollar_rate" label="Dollar Rate" />
          </div>
        </div>
      )}

      {!watch("is_sales_purchase_amount_only") && (
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField name="service_charge" label="Service Charge" />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <CustomTextField name="govt_vat_rate" label="Govt Vat Rate" />
          </div>
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full mt-8 md:w-1/2 px-2">
          <CustomTextField name="tax_amount" label="Tax Amount" />
        </div>
        {!watch("is_sales_purchase_amount_only") && (
          <div className="w-full mt-[0.9rem] md:w-1/2 px-2">
            <CustomTextField name="sales_amount" label="Sales Amount" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full">
        {!watch("is_sales_purchase_amount_only") && (
          <div className="w-full mt-[0.7rem]  md:w-1/2 px-2">
            <CustomTextField name="purchase_amount" label="Purchase Amount" />
          </div>
        )}
        <div className="w-full md:w-1/2 px-2">
          <CustomDropdownField
            name="ticket_status"
            label="Ticket Status"
            options={ticketSalesTicketStatus}
          />
        </div>
      </div>

      <CustomTextField name="detail" label="Details" />

      {/* {
        <Button
          className="whitespace-nowrap mx-4 my-4 "
          variant="contained"
          color="secondary"
          // disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleAddTicketSale}
        >
          Add
        </Button>
      } */}

      {iataTableData?.length > 0 && (
        <div>
          <h2 className="my-5 text-danger font-bold text-center border-bottom mb-10">
            Ticket Details
          </h2>
          <TableContainer component={Paper} className="mb-48">
            <Table
              sx={{ minWidth: 650 }}
              aria-label="customized  table p-3 mt-10"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    SL
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Issue date
                  </TableCell>

                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Issue Person.
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    User
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Passenger Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Ticket Agency Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Flight Date
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    GDS
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    GDS PNR
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Airline PNR
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Return Flight Date
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Ticket No
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Sector
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Air Way
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Flight No
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Class
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Fare Amount
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Airline Commision Amount
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Customer Commision Amount
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Tax Amount
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Service Charge
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Airlines Net Rate
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Sales Amount
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whitespace-nowrap p-5 text-center border-1 border-gray"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {iataTableData.map((n, idx) => (
                  <TableRow
                    key={idx}
                    className="p-4 md:p-16 border-1 border-gray px-5"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="p-4 md:p-16 border-1 border-gray px-5"
                    >
                      {idx + 1}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {moment(new Date(n.issue_date)).format("YYYY-MM-DD")}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {`${n.issue_person?.first_name} ${n.issue_person?.last_name}`}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {`${n.issue_person?.first_name} ${n.issue_person?.last_name}`}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.final_passenger}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {`${n.ticket_agency?.first_name} ${n.ticket_agency?.last_name}`}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {moment(new Date(n.flight_date)).format("YYYY-MM-DD")}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.gds?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.gds_pnr}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.airline_pnr}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {moment(new Date(n.return_flight_date)).format(
                        "YYYY-MM-DD"
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.ticket_no}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.sector}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.current_airway?.name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.flight_no}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n?._class}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.fare_amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.airline_commission_amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.customer_commission_amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.tax_amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.service_charge}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.purchase_amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      component="th"
                      scope="row"
                    >
                      {n.sales_amount}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-1 border-gray px-5"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <div>
                        <Delete
                          onClick={(event) => handleDeleteTicketPicsale(n.id)}
                          className="cursor-pointer"
                          style={{ color: "red" }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {
            <Button
              className="whitespace-nowrap mx-4 my-4 "
              variant="contained"
              color="secondary"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSubmitTicketSale}
            >
              Save
            </Button>
          }
        </div>
      )}
    </div>
  );
}

export default TicketSaleForm;
