export  type todoObj = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};



export type TodoPorps = {
  id: string;
  title: string;
  deteles: string;
  isCompleted: boolean;
  handleDeleteClick:(todo:TodoPorps) => void
  handleClickUpdateButton:(todo:TodoPorps) => void
};