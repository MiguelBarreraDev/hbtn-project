import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { Container, FormControl } from '@mui/material';


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

    // Form dialogs 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // slect
    const [registro, setRegistro] = React.useState('');
    const handleChange = (event) => {
        setRegistro(event.target.value);
      };

    console.log("es?", props)
    useEffect(() => {
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
        <div className="component-content">
            <div className="caption-02">
                <span>
                    Jhon Smith Doe Report's
                </span>
                <button className="btn btn-outline-success" onClick={handleClickOpen}>
                    Agregar Reporte
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
            <Dialog open={open} onClose={handleClose} sx="lg">
                <DialogTitle>Agregar Reporte </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor ingrese los datos requeridos aqui.
                    </DialogContentText>
                    <Container>
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                            <InputLabel id="demo-simple-select-label">Registro</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={registro}
                                label="Registro"
                                onChange={handleChange}
                                >
                                    <MenuItem value={10}>MockInterview</MenuItem>
                                    <MenuItem value={20}>Speaker</MenuItem>
                                    <MenuItem value={30}>PLD</MenuItem>
                            </Select>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="descripcion"
                                label="Descripcion"
                                type="textarea"
                                fullWidth
                                variant="standard"
                            />
                        </FormControl>

                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}