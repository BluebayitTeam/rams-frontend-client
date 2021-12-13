import { GET_AGENTS } from "app/constant/constants";
import axios from "axios";
import MaterialDatatable from "material-datatable";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'id',
        name: 'SL_NO',
    },
    {
        field: 'image',
        name: 'Image',
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

const options = {
    filterType: 'checkbox',
};
// const options = {
//     serverSide: true,
//     onTableChange: (action, tableState) => {
//         xhrRequest(`${GET_AGENTS}`, result => {
//             this.setState({ data: result });
//         });
//     }
// };

function AgentMuiTable() {

    const [data, setdata] = useState([])

    useEffect(() => {
        axios.get(GET_AGENTS).then(res => {
            setdata(res.data.agents)
        });
    }, [])


    return (
        <div>
            <MaterialDatatable
                title={"Agent List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default AgentMuiTable
