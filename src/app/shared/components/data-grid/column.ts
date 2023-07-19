export interface Column {
  columnDef: string;
  header: string;
  cell: (element: any) => string | number;
}
