import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQuery";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function AddProject() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    status: "new",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: data.name,
      description: data.description,
      status: data.status,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });

  const handleSubmit = () => {
    if (data.name && data.description && data.status) {
      addClient(data.name, data.description, data.status);
      setOpen(false);
    }

    setData({
      name: "",
      description: "",
      status: "",
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Project
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Project
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ my: 2, width: { sm: "500px", sx: "320px" } }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={data.name}
              onChange={handleChange("name")}
              fullWidth
            />
          </Box>
          <Box sx={{ my: 2, width: { sm: "500px", sx: "320px" } }}>
            <TextField
              id="outlined-basic"
              label="description"
              variant="outlined"
              rows={4}
              value={data.description}
              onChange={handleChange("description")}
              fullWidth
            />
          </Box>
          <Box sx={{ my: 2, width: { sm: "500px", sx: "320px" } }}>
            <TextField
              id="outlined-basic"
              label="status"
              variant="outlined"
              value={data.status}
              onChange={handleChange("status")}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
