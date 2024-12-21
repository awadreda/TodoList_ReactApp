import { createContext } from "react";



type ToastCOntextObj = {


  showHideTost:(lol:string) => void
}


export const TosatContext = createContext<ToastCOntextObj>({

  
  showHideTost:() =>{}
  
});
