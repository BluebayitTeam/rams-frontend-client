/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import withRouter from "@fuse/core/withRouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Interweave } from "interweave";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from "src/app/constant/constants";
import {
  BMET_STAMP_FORM_FOOTER,
  BMET_STAMP_FORM_HEADER,
} from "src/app/constant/FormContentTitle/formContentTitle";

function BmetStampsTable(props) {
  const {
    reportTitle,
    classes,
    generalData,
    inSiglePageMode,
    tableColumns,
    serialNumber,
    data,
    setPage,
  } = props;

  let pageBasedSerialNo = serialNumber;

  const [formContentHeaderData, setFormContentHeaderData] = useState();

  useEffect(() => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };

    fetch(
      `${GET_FORM_CONTENT_DETAILS_BY_TITLE}${BMET_STAMP_FORM_HEADER}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) =>
        setFormContentHeaderData(data.formcontent_detail[0]?.details || "")
      );

    fetch(
      `${GET_FORM_CONTENT_DETAILS_BY_TITLE}${BMET_STAMP_FORM_FOOTER}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) =>
        setFormContentHeaderData(data.formcontent_detail[0]?.details || "")
      );
  }, [data.data]);
  return (
    <div
      className={`${classes.pageContainer} printPageContainer  overflow-hidden w-full mb-0`}
      onMouseOver={() => {
        inSiglePageMode || setPage(data.page);
      }}
      style={{
        padding: "20px",
        overflow: "hidden",
        pageBreakBefore: "always",
      
      }}
    >
      <div style={{ paddingTop: "250px" }}>
        <h2 className="text-center">পাতা-১</h2> 
        <br />
        <div className={classes.pageHead}>
          <h2 className="title  pl-0 md:-pl-20">{reportTitle}</h2>
        </div>
        <div>
          <Interweave
            allowAttributes
            allowElements
            disableLineBreaks={true}
            content={formContentHeaderData}
          />
        </div>
        <br />
       
        <Table
          aria-label="simple table"
          className={classes.table}
          style={{ border: "1px solid black" }}
        >
          <TableHead style={{ backgroundColor: "#D7DBDD", height: "35px" }}>
            <TableRow>
              {tableColumns.map((column, indx) => {
                return column.show ? (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ border: "1px solid black", padding: "0px 5px" }}
                    className="tableCellHead"
                    onDrop={(e) =>
                      dispatchTableColumns({
                        type: "dragAndDrop",
                        // dragger: e.dataTransfer.getData('draggerLebel'),
                        dropper: column.id,
                      })
                    }
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div
                      // draggable={true}
                      onDragStart={(e) =>
                        e.dataTransfer.setData("draggerLebel", column.id)
                      }
                      onClick={() => {
                        if (column.sortAction !== false) {
                          setSortBy(
                            data.sortBy === column.name ? "" : column.name
                          );
                          setSortBySubKey &&
                            column.subName &&
                            setSortBySubKey(column.subName);
                        }
                      }}
                      style={{
                        margin: indx === 0 && "0px -5px 0px 5px",
                      }}
                    >
                      {column.label}
                    </div>
                  </TableCell>
                ) : null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((dataArr, idx) => (
              <TableRow
                key={dataArr.id}
                className="tableRow cursor-pointer"
                hover
                onDrop={(e) =>
                  dragAndDropRow(
                    e.dataTransfer.getData("draggerId"),
                    data.size * (data.page - 1) + idx
                  )
                }
                onDragOver={(e) => e.preventDefault()}
                draggable={true}
                onDragStart={(e) => e.dataTransfer.setData("draggerId", idx)}
              >
                {tableColumns.map((column) => {
                  return column.show ? (
                    <TableCell
                      align="center"
                      className="tableCell"
                      style={{ border: "1px solid black", padding: "0px 5px" }}
                    >
                      <div>
                        {column?.subName
                          ? dataArr?.[column.name]?.[column?.subName]
                          : column.type === "date"
                            ? dataArr?.[column.name]
                              ? moment(new Date(dataArr?.[column.name])).format(
                                  "DD-MM-YYYY"
                                )
                              : ""
                            : column.name
                              ? dataArr?.[column.name]
                              : column?.isSerialNo
                                ? dataArr.hideSerialNo || pageBasedSerialNo++
                                : dataArr.getterMethod
                                  ? dataArr.getterMethod(dataArr)
                                  : column.getterMethod
                                    ? column.getterMethod(dataArr)
                                    : ""}
                      </div>
                    </TableCell>
                  ) : null;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <p className="text-right">চলমান পাতা-১</p>
      </div>
    </div>
  );
}

export default withRouter(BmetStampsTable);
