export  type todoObj = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};



export type TodoPorps = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
  handleDeleteClick: (todo: TodoPorps) => void;
  handleClickUpdateButton: (todo: TodoPorps) => void;
};




export enum EMethodReducer {
  Add = 1,
  Update,
  Delete,
  Check,
  Get,
}
