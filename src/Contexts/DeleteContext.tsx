import { createContext } from "react";







type alertProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


export const DeleteContext = createContext<alertProps>({

  open:false,
  setOpen:() => {}
});


