// import
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

/* Components */
import { Reports } from "./components";
import {useParams} from "react-router-dom";
import {useStudents} from "@/context";

/* Styles */
import "./Student.scss";


const columns = [
  { field: 'id', headerName: 'ID', flex: 1, maxWidth: 70},
  {
    field: 'fullName',
    headerName: 'Nombre Completo',
    description: 'This column has a value getter and is not sortable.',
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

      <div className="caption">Student - Cohort {student[0]?.cohort?.number}</div>
      <div className="container-data-grid" style={{ height: 180, width: '100%' }}>
        <DataGrid
          rows={student}
          columns={columns}
          pageSize={1}
          // rowsPerPageOptions={[null]}
          loading={loading}
        />
      </div>
      <Reports id={params.id} />
    </div>
  );
}
