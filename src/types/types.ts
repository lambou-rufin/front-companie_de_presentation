import { TableInstance, TableState, Row, Cell } from "react-table";
import { UsePaginationState, UsePaginationInstanceProps } from "react-table";

// Type pour l'état de la table avec pagination
export interface TableStateWithPagination<T extends object>
  extends TableState<T>,
    UsePaginationState<T> {}

// Type pour l'instance de la table avec pagination
export interface TableWithPagination<T extends object>
  extends TableInstance<T>,
    UsePaginationInstanceProps<T> {
  state: TableStateWithPagination<T>;
}
