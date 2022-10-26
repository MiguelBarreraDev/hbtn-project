import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

/* Components */
/* Styles */
import "./Reports.scss";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Fecha', width: 130 },
    {
        field: 'name',
        headerName: 'Registro',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.report_type.name || ''}`,
    },
    {
        field: 'fullName',
        headerName: 'Reporter',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.reporter?.first_name || ''} ${params.row.reporter?.last_name || ''}`,
    },
];

export default function Reports(props) {
    const URL = `http://localhost:5000/students/${props.id}/reports`
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)

    console.log("es?", props)
    useEffect(()=> {
        axios.get(URL)
        .then(function (response) {
            setLoading(false)
            console.log(response.data)
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