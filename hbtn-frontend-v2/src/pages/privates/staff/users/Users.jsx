import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

// imports for use components of the form
import React from "react";
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
// alert
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';

/* Styles */
import "./Users.scss";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'apellido', headerName: 'Apellido', width: 130 },

    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'Esta columna contiene el nombre y apellido.',
      sortable: false,
      width: 160,
      valueGetter: (params)=>
        `${params.row.nombre || ''} ${params.row.apellido || ''}`,
    },
  ];

export default function Users() {
    const URL = "http://localhost:5000/users"
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)
    // filtered
    const [ filtered, setFiltered ] = useState([]);

    useEffect(() =>{
        axios.get(URL)
          .then(function (response) {
            setLoading(false)
            setState(response.data)
          })
          .catch(function (error) {
            console.log(error)
            setLoading(false)
          })
    },[])
    
    // function filter
    const buscar = (searchValue) => {
        let filtered = [];
        students.map((student) => {
          if (Object.values(student).join('').toLowerCase().includes(searchValue.toLowerCase())) {
            filtered[filtered.length] = student;
          }
        });
        setFiltered(filtered);
      }
    // end

    // Form dialogs agregar
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // end
    // dialog alert del
    const [open2, setOpen2] = React.useState(false);
    // end

    // seleccionar registro
    const [registro, setRegistro] = React.useState('');
    const handleChange = (event) => {
        setRegistro(event.target.value);
    };

    return (
        <div className="component-content">
            <h1>Users</h1>
            <nav className="navbar navbar-expand-lg">
                <div className="f-container">
                    
                    <form className="d-flex" role="search">
                    <TextField id="outlined-search" onChange={(e) => buscar(e.target.value)} label="Buscar Usuarios" type="search" />
                    </form>
                </div>
            </nav>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={state}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                loading={loading}
            />
            </div>

            <div className="buttons-content">
                <Button className="mybtn acp-cnl" onClick={handleClickOpen}>Nuevo</Button>
                <div className="separator">&nbsp;</div>
                <Button className="mybtn acp-cnl" onClick={handleClickOpen}>Editar</Button>
                <Button className="mybtn acp-cnl" onClick={() => setOpen2(true)} >Eliminar</Button>
            </div>
            {/* alert modal */}
            <React.Fragment>
                <Modal
                    aria-labelledby="alert-dialog-modal-title"
                    aria-describedby="alert-dialog-modal-description"
                    open={open2}
                    onClose={() => setOpen2(false)}
                >
                    <ModalDialog variant="outlined" role="alertdialog">
                    <Typography className="typography"
                        id="alert-dialog-modal-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                        startDecorator={<WarningRoundedIcon />}
                    >
                        Confirmacion
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        textColor="text.tertiary"
                        mb={3}
                    >
                        Estas seguro d eliminar este registro?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button className="warning" variant="plain" color="neutral" onClick={() => setOpen2(false)}>
                        Cancel
                        </Button>
                        <Button className="danger" variant="solid" color="danger" onClick={() => setOpen2(false)}>
                        Eliminar Registro
                        </Button>
                    </Box>
                    </ModalDialog>
                </Modal>
            </React.Fragment>

             {/* dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="mybgk">Accion para Usuarios </DialogTitle>
                <DialogContent className="dialog-content mybgk col-sm-12">
                    <DialogContentText>
                        Por favor ingrese los datos requeridos aqui.
                    </DialogContentText>
                    <Container>
                        <FormControl fullWidth className="form-reports">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div >
                                        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                        <Select className="select-w"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={registro}
                                            label="Rol"
                                            onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Admin</MenuItem>
                                                <MenuItem value={20}>Staff</MenuItem>
                                        </Select>

                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Nombre"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div >
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="apellido"
                                        label="Apellido"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        />
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="correo"
                                        label="Correo"
                                        type="email"
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
