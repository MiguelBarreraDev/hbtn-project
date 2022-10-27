// import
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import { redirect, Route } from "react-router-dom";

/* Components */
// import { Header } from "../components/header/Header";
/* Styles */
import "./students.scss";
import { width } from "@mui/system";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'Nombre', width: 130 },
    { field: 'last_name', headerName: 'Apellido', width: 130 },

    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
];

export function Students() {
    const URL = "http://localhost:5000/students"
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(null)

    const handleClick =() => {
        console.log("desde handle");
        <Route path= "/student/${id}" ></Route>
        // redirect(`/student/${id}`)
    }

    useEffect(()=> {
        axios.get(URL)
        .then(function (response) {
            setLoading(false)
            console.log(response)
            setState(response.data.items)
        })
        .catch(function (error) {
            console.log(error)
            setLoading(false)
        })
    }, [])

    return (
        <div className="component-content">
            <nav className="navbar navbar-expand-lg">
                <select className="form-select" aria-label="Default select example" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Select a cohort</option>
                    <option value="1">16</option>
                    <option value="2">17</option>
                    <option value="3">18</option>
                </select>
                <div className="f-container">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <div className="caption">Students - Cohort 17</div>
            <div style={{ height: 400, width: '100%' }}>
                
            <DataGrid
                components={{
                    LoadingOverlay: LinearProgress,
                }}
                loading = {loading}
                rows={state}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(id)=> {
                    setId(id[0])
                    // console.log(studentid)
                }}
            
            />
            </div>
            <button className="btn btn-outline-success" onClick={()=> handleClick() } type="submit">
                Ver Detalle
            </button>
        </div>
    );
}