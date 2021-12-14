import { createMuiTheme } from "@material-ui/core";
import { BASE_URL, GET_AGENTS } from "app/constant/constants";
import axios from "axios";
import MaterialDatatable from "material-datatable";
import { useEffect, useState } from "react";

function AgentMuiTable() {

    const [data, setdata] = useState([])
    const [page, setpage] = useState(0)
    const [rowsPerPage, setrowsPerPage] = useState(10)
    const [totalElement, settotalElement] = useState(0)

    useEffect(() => {
        axios.get(GET_AGENTS).then(res => {
            const { data } = res
            setdata(res.data.agents)
            console.log("data", res)
            setpage(data?.page || 0)
            setrowsPerPage(data?.size - 1 || 10)
            settotalElement(data?.total_elements || 0)
        });
    }, [])

    const columns = [
        {
            field: 'id',
            name: 'SL_NO',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return `${tableMeta.rowIndex + 1}`;
                }
            },
        },
        {
            // field: 'image',
            name: 'Image',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    console.log("imgValue", value.image)
                    return (<img
                        className="h-full block rounded"
                        style={{
                            marginTop: "-10px",
                            marginBottom: "-10px",
                            height: "60px",
                            borderRadius: "15px"
                        }}
                        src={`${BASE_URL}${value.image}`} />
                    )
                }
            },
        },
        {
            field: 'username',
            name: 'UserName',
        },
        {
            field: 'email',
            name: 'Email',
        },
        {
            field: 'primary_phone',
            name: 'Phone',
        },
        {
            field: 'street_address_one',
            name: 'Address',
        },
        // {
        //     field: 'action',
        //     name: 'Action',
        // }
    ];
    // const data = [
    //     { name: "Veeeeery loooooooooong naaaaaaaaaaame", title: "Title 1", location: "Location 1", age: 30, salary: 10 },
    //     { name: "Name 2", title: "Title 2", location: "Location 2", age: 31, salary: 11 },
    // ];

    // const options = {
    //     filterType: 'checkbox',
    //     // customFooter: () => "fotter"
    // };
    const options = {
        filterType: 'checkbox',
        responsive: true,
        page: page,
        count: totalElement,
        rowsPerPage: rowsPerPage,
        onTableChange: (action, tableState, tableState2, tableState3) => {

            console.log("onTableChangeActn", { action, tableState, tableState2, tableState3 })
            // axios.get(`${GET_AGENTS}`).then(res => {
            //     setdata(res.data.agents);
            // })
        }
    };

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MaterialDatatableBodyCell: {
                root: {
                    width: "100%"
                }
            }
        }
    })
    return (
        <div>
            <MaterialDatatable
                title={"Agent List"}
                data={data}
                columns={columns}
                options={options}
                theme={getMuiTheme()}
            />
        </div>
    )
}

export default AgentMuiTable
