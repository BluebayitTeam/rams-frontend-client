import withRouter from "@fuse/core/withRouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
function BmetStampsTable2({
  classes,
  reportTitle,
  tableColumns,
  dispatchTableColumns,
  generalData,
  data,
  serialNumber,
  setPage,
  inSiglePageMode,
  setSortBy,
  setSortBySubKey,
  dragAndDropRow,
}) {
  let pageBasedSerialNo = serialNumber;

  return (
    <div
      className={`${classes.pageContainer} printPageContainer overflow-hidden w-full mb-0`}
      onMouseOver={() => {
        inSiglePageMode || setPage(data.page);
      }}
      style={{
        padding: "10px",
        minHeight: "2000px",
        maxHeight: "2000px",
        display: "block",
      }}
    >
      <div>
        <div className={classes.pageHead} style={{ paddingTop: "300px" }}>
          <h2 className="text-center">পাতা-২</h2>
          <br />
          <br />
        </div>
        <div className={classes.pageHead}>
          <h2 className="title  pl-0 md:-pl-20">প্রশিক্ষণ সনদের বিবরন</h2>
        </div>

        <br />
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
        <p className="text-right">চলমান পাতা-২</p>
      </div>
    </div>
  );
}

export default withRouter(BmetStampsTable2);
