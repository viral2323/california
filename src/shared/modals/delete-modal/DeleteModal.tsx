import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { activateRegulation, deleteRegulations } from "../../../services/apiServices";
import showToast from "../../../components/toast";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function DeleteModal(props: any) {
  const {regulationId, open, handleClose, isActivate} = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDeleteRegulation = async () => {
    if(isActivate){
      const response = await activateRegulation({regulationId})

      if(response && response.hasOwnProperty('isSuccessful') && response.isSuccessful == true){
        showToast('Regulation activated successfully', 'success', 3000)
        handleClose(true,true)
      }else{
        showToast('Something went worng!', 'error', 3000)
        handleClose(true)
      }

    }else{
      const response = await deleteRegulations({regulationId})
      if(response.hasOwnProperty('isSuccessful') && response.isSuccessful){
        showToast('Regulation is deleted!', 'success', 3000)
        handleClose(false,true)
      }else{
        showToast('Something went wrong!', 'error', 3000)
        handleClose(false)
      }
    }
    
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">{isActivate ? "Activate Regulation" : "Delete item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isActivate ? "Are you sure? do you want to Activate this item" : 'Are you sure? do you want to delete this item'}
          </DialogContentText>
          {isActivate && 
            <DialogContentText sx={{marginTop: '15px'}}><InfoOutlinedIcon/> Also Activating 2 child regulations and 3 Rules.</DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} variant="contained">
            Disagree
          </Button>
          <Button onClick={handleDeleteRegulation} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteModal;
