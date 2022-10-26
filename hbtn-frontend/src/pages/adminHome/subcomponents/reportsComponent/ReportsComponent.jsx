import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

/* Components */
/* Styles */
import "./reportsComponent.scss";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Fecha', width: 130 },
    {
        field: 'name',
        headerName: 'Registro',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.report_type.name || ''}`,
    },
    {
        field: 'fullName',
        headerName: 'Reporter',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.reporter?.first_name || ''} ${params.row.reporter?.last_name || ''}`,
    },
];

export function ReportsComponent() {
    const URL = "http://localhost:5000/students/3701/reports"
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        axios.get(URL)
        .then(function (response) {
            setLoading(false)
            // const { items } = response.data
            // const newlist = items.map((item) =>{
            //     item.name = item.report_type.name
            //     console.log("miITEMM", item)
            //     item.first_name = item.reporter?.first_name ?? ""
            //     item.last_name = item.reporter?.last_name ?? ""
            //     return item
            // })
            // console.log("NEWLISTTT", newlist)
            //setState(newlist)
            setState(response.data.items)
        })
        .catch(function (error) {
            console.log(error)
            setLoading(false)
        })
    }, [])

    return (
        <div className="reports-content">
            <div className="caption-02">
                <span>
                    Jhon Smith Doe Report's
                </span>
                <button className="btn btn-outline-success" type="submit">
                    Add Report
                </button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={state}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
            </div>
        </div>
    );
}