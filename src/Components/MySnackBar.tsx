// import Button from "@mui/material/Button";
import Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


type mySnackBarPorps = {

  open :boolean
  message:string

}


export default function MySnackBar({open , message}:mySnackBarPorps) {



  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };
  

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert
          // onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
