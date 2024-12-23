// import { TurnSharpLeft } from "@mui/icons-material";
import React, { createContext, ReactNode, useContext, useState } from "react";
import MySnackBar from "../Components/MySnackBar";











type ToastCOntextObj = {


  showHideTost:(lol:string) => void
}


type ToastProviderProps = {
  children: ReactNode;
};



// eslint-disable-next-line react-refresh/only-export-components
export const TosatContext = createContext<ToastCOntextObj>({

  
  showHideTost:() =>{}
  
});



export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
 
    const [open, setOpen] = useState(false);
  
   const [message, setMessage] = useState("");

 
 
 

    function showHideTost(message: string) {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 2000);

      setMessage(message);
    }

 
 
  return (
    <>
      <TosatContext.Provider value={{ showHideTost }}>
        <MySnackBar open={open} message={message} />

        {children}
      </TosatContext.Provider>
    </>
  );
};




// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {

  return useContext(TosatContext);
}








