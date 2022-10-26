// import
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
/* Styles */
import "./Students.scss";
import { useNavigate } from "react-router-dom";
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

export default function Students() {

  const buscar = (searchValue) => {
    let filtered = [];
    students.map((student) => {
      if (Object.values(student).join('').toLowerCase().includes(searchValue.toLowerCase())) {
        filtered[filtered.length] = student;
      }
      //if (student.first_name == searchValue || student.last_name == searchValue) filtered[filtered.length] = student;
    });
    setFiltered(filtered);
  }
  const navigate = useNavigate()
  const URL = "http://localhost:5000/students"
  const { students, setStudents  } = useStudents()
  const [ filtered, setFiltered ] = useState([]);
  const [loading, setLoading] = useState(!Boolean(students.length))
  const [id, setId] = useState(null)

  useEffect(()=> {
    if (students.length === 0) {
      axios.get(URL)
        .then(function (response) {
          setLoading(false)
          setStudents(response.data.items)
          setFiltered(response.data.items)
        })
        .catch(function (error) {
          console.log(error)
          setLoading(false)
        })
    }
  }, [])

  const handleClick = () => navigate(`/students/${id}`)

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
            <input className="form-control me-2" type="search" onChange={(e) => buscar(e.target.value)} placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>

      <div className="caption">Students - Cohort 17</div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          loading={loading}
          onSelectionModelChange={(id) => {
            setId(id[0])
          }}
        />
      </div>
      <button
        className="btn btn-success"
        onClick={handleClick}
      >
        Ver Detalle
      </button>
    </div>
  );
}
