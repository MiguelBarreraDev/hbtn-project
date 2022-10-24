// import
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

/* Components */
// import { Header } from "../components/header/Header";
/* Styles */
import "./Student.scss";
import { Reports } from "./components";
import {useParams} from "react-router-dom";
import {useStudents} from "@/context";

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
    valueGetter: (params) =>
    `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
];

export default function Student () {
  const URL = "http://localhost:5000/students"
  const { students } = useStudents()
  const [student, setStudent] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    if (students.length > 0) {
      setStudent([students.find(student => student.id == params.id)])
    }
  }, [params.id])

  useEffect(() => {
    if (student.length > 0) setLoading(false)
  }, [student])

  useEffect(()=> {
    if (students.length === 0) {
      axios.get(URL, {
        params: {
          ID: params.id
        }
      })
        .then(function (response) {
          setLoading(false)
          setStudent([response.data])
        })
        .catch(function (error) {
          console.log(error)
          setLoading(false)
        })
    }
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
          rows={student}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          loading={loading}
        />
      </div>
      <Reports />
    </div>
  );
}
