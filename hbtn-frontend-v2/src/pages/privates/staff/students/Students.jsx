// import
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import {useStudents} from "@/context";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

/* Styles */
import "./Students.scss";


const columns = [
  { field: 'id', headerName: 'ID', flex: 1, maxWidth: 70},
  {
    field: 'fullName',
    headerName: 'Nombre Completo',
    description: 'Esta columna contiene el nombre y apellido',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
    `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'Puntaje', 
  headerName: 'Puntaje', 
  flex: 1 ,
  valueGetter: (params) =>
    `${params.row.product?.average || '0.00'}`,
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

  // slect cohort
  const [cohort, setCohort] = React.useState('');
  const handleChange = (event) => {
    setCohort(event.target.value);
  };

  useEffect(()=> {
    if (students.length === 0) {
      axios.get(URL)
        .then(function (response) {
          console.log(response.data.items)
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
        {/* <select className="form-select" aria-label="Default select example" defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>Select a cohort</option>
          <option value="1">16</option>
          <option value="2">17</option>
          <option value="3">18</option>
        </select> */}
        <InputLabel id="demo-simple-select-label">Cohort</InputLabel>
        <Select className="select-w"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cohort}
            label="Cohort"
            onChange={handleChange}
            >
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={27}>17</MenuItem>
              <MenuItem value={18}>18</MenuItem>
        </Select>
        <div className="f-container">
          <TextField id="outlined-search" onChange={(e) => buscar(e.target.value)} label="Buscar Estudiante" type="search" />
        {/* {/* <TextField id="outlined-basic" label="Buscar"  variant="outlined" /> */}
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
      <Button  className="mybtn acp-cnl" onClick={handleClick}>Ver Detalle</Button>
    </div>
  );
}
