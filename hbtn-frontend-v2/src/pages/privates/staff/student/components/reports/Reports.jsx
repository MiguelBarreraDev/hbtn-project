/* Components */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

// imports for use components of the form
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

// imports for use Date / Time 
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/* Styles */
import "./Reports.scss";

const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 70},
    {
        field: 'name',
        headerName: 'Tipo de Registro',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 2,
        valueGetter: (params) =>
            `${params.row.report_type.name || ''}`,
    },
    { field: '', headerName: 'Nota', flex: 1 },
    {
        field: 'fullName',
        headerName: 'Registrado Por',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        valueGetter: (params) =>
            `${params.row.reporter?.first_name || ''} ${params.row.reporter?.last_name || ''}`,
    },
    { field: 'date', headerName: 'Fecha', flex: 1 },
];


export default function Reports(props) {
    const URL = `http://localhost:5000/students/${props.id}/reports`
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)

    // date form
    const [value, setValue] = React.useState(dayjs(new Date()));
    const handleChanges = (newValue) => {
        setValue(newValue);
    };

    // Form dialogs 
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // seleccionar registro
    const [registro, setRegistro] = React.useState('');
    const handleChange = (event) => {
      setRegistro(event.target.value);
    };

    useEffect(() => {
        axios.get(URL)
            .then(function (response) {
                // console.log(response.data)
                setLoading(false)
                setState(response.data.items)
            })
            .catch(function (error) {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <div className="cl">
            <div className="caption caption-report">
                <span>
                    Reportes
                </span>
                <button className="mybtn acp-cnl" onClick={handleClickOpen}>
                    Agregar Reporte
                </button>
            </div>
            <div style={{ height: 320, width: '100%' }}>
                <DataGrid
                    rows={state}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="mybgk">Agregar Reporte </DialogTitle>
                <DialogContent className="dialog-content mybgk col-sm-12">
                    <DialogContentText>
                        Por favor ingrese los datos requeridos aqui.
                    </DialogContentText>
                    <Container>
                        <FormControl fullWidth className="form-reports">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div >
                                        <InputLabel id="demo-simple-select-label">Registro</InputLabel>
                                        <Select className="select-w"
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
                                        id="name"
                                        label="Nota"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Fecha:"
                                            inputFormat="MM/DD/YYYY"
                                            type="datetime-local"
                                            value={value}
                                            onChange={handleChanges}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </Stack>
                                    </LocalizationProvider>
                                    <div >
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="descripcion"
                                        label="Descripcion"
                                        type="textarea"
                                        fullWidth
                                        variant="standard"
                                        />
                                    </div>
                                </div>
                            </div>

                        </FormControl>

                    </Container>
                </DialogContent>
                <DialogActions className="mybgk">
                    <Button  className="acp-cnl mybtn" onClick={handleClose}>Cancelar</Button>
                    <Button className="mybtn acp-cnl" onClick={handleClose}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}