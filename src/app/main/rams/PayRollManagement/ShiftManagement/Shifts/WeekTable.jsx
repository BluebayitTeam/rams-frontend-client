import { Box, Paper, Typography } from "@mui/material";
import { Fragment, memo } from 'react';
import { useGetShiftTimetableQuery } from "../ShiftApi";

const weeks = [
  { day: "Sunday" },
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
];

function WeekTable() {
  const shiftId = localStorage.getItem('shiftId'); // Retrieve the current shiftId
  const { data: timetable, error, isLoading } = useGetShiftTimetableQuery({ page: 1, size: 10, searchKey: '' });

  // const timetable = useSelector(
  //   ({ shiftsManagement }) => shiftsManagement?.shift?.daytime
  // );
  const data = [];
  data.push(timetable);
  console.log("shift_data timetable", timetable);
  return (
    <Paper
      className="w-full rounded-40 shadow"
      style={{ backgroundColor: "#e7eaed" }}
    >
      {/* sx={{ minWidth: 800 }} */}
      <div className="flex items-center justify-between p-20 h-64">
        <Typography className="text-16 font-medium">
          {" "}
          Shift Time Period
        </Typography>
      </div>

      <Box className="w-full px-28">
        <table style={{ border: "1px solid gray", width: "100%" }}>
          <thead>
            <tr style={{ border: "1px solid gray" }}>
              <th> Day</th>
              {/* Display 24 hour system header */}
              {Array.from({ length: 24 }).map((_, index) => {
                console.log("indexDay", index);
                return (
                  <th style={{ border: "1px solid gray" }} key={index}>
                    {index}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* Display table data */}
            {data.map((data, index) => {
              return (
                <Fragment key={index}>
                  {weeks.map((e) => (
                    <tr style={{ border: "1px solid gray" }} key={index}>
                      <td style={{ border: "1px solid gray" }}>{e.day}</td>
                      {/* Highlight cells with color */}
                      {Array.from({ length: 24 }).map((_, index) => {
                        const hour = index.toString().padStart(2, "0");
                        const [startHour, startMinute] = (
                          data?.timetable?.checkin_end ?? ""
                        )
                          .split(":")
                          .map(Number);
                        const [endHour, endMinute] = (
                          data?.timetable?.checkout_end ?? ""
                        )
                          .split(":")
                          .map(Number);
                        const currentHour = Number(hour);

                        const currentMinute = Number(0); // use 0 for the minute since it is not provided in the hour value
                        let isHighlighted = false;
                        if (startHour <= endHour) {
                          // If start and end times are on the same day
                          isHighlighted =
                            (currentHour > startHour ||
                              (currentHour === startHour &&
                                currentMinute >= startMinute)) &&
                            (currentHour < endHour ||
                              (currentHour === endHour &&
                                currentMinute <= endMinute));
                        } else {
                          // If start and end times are on different days
                          isHighlighted =
                            (currentHour >= startHour &&
                              currentHour < 24 &&
                              currentMinute >= startMinute) ||
                            (currentHour >= 0 && currentHour <= endHour) ||
                            (currentHour === endHour &&
                              currentMinute <= endMinute) ||
                            (currentHour >= startHour && currentHour <= 23);
                          // add check for 22:00 to 23:00 on the same day
                          // isHighlighted =
                          // 	isHighlighted ||
                          // 	(currentHour === 22 && currentMinute >= startMinute) ||
                          // 	currentHour === startHour;
                        }

                        const isFriday = e.day === "Friday";
                        const isSaturday = e.day === "Saturday";
                        const isSunday = e.day === "Sunday";
                        const isMonday = e.day === "Monday";
                        const isTuesday = e.day === "Tuesday";
                        const isWednesday = e.day === "Wednesday";
                        const isThursday = e.day === "Thursday";
                        const isFridayUnhighlighted = isFriday && !data?.friday;
                        const isSaturdayUnhighlighted =
                          isSaturday && !data?.saturday;
                        const isSundayUnhighlighted = isSunday && !data?.sunday;
                        const isMondayUnhighlighted = isMonday && !data?.monday;
                        const isTuesdayUnhighlighted =
                          isTuesday && !data?.tuesday;
                        const isWednesdayUnhighlighted =
                          isWednesday && !data?.wednesday;
                        const isThursdayUnhighlighted =
                          isThursday && !data?.thursday;
                        const cellStyle = {
                          backgroundColor:
                            isFridayUnhighlighted ||
                              isSaturdayUnhighlighted ||
                              isSundayUnhighlighted ||
                              isMondayUnhighlighted ||
                              isTuesdayUnhighlighted ||
                              isWednesdayUnhighlighted ||
                              isThursdayUnhighlighted
                              ? "white"
                              : isHighlighted
                                ? data?.timetable?.color
                                : "white",

                          border: isHighlighted ? "none" : "1px solid #d9cfcf",
                        };
                        return <td key={index} style={cellStyle}></td>;
                      })}
                    </tr>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
}

export default memo(WeekTable);
