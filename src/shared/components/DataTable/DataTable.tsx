// import React from "react";
// import {
//   useTable,
//   usePagination,
//   TableInstance,
//   Column,
//   UsePaginationInstanceProps,
//   UsePaginationState,
//   TableState,
//   Row,
//   Cell,
// } from "react-table";
// import "./DataTable.css";

// interface DataTableProps<T extends object> {
//   columns: Column<T>[];
//   data: T[];
//   onRowClick?: (row: T) => void;
// }

// // Définir un type personnalisé pour l'état de la table avec pagination
// interface TableStateWithPagination<T extends object>
//   extends TableState<T>,
//     UsePaginationState<T> {}

// // Définir un type personnalisé pour l'instance de la table avec pagination
// interface TableWithPagination<T extends object>
//   extends TableInstance<T>,
//     UsePaginationInstanceProps<T> {
//   state: TableStateWithPagination<T>;
// }

// const DataTable = <T extends object>({
//   columns,
//   data,
//   onRowClick,
// }: DataTableProps<T>) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable<T>(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 } as Partial<TableStateWithPagination<T>>,
//     },
//     usePagination
//   ) as TableWithPagination<T>; // Cast explicite pour inclure les propriétés de pagination

//   return (
//     <>
//       <table {...getTableProps()} className="table table-hover">
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()} key={column.id}>
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row: Row<T>) => {
//             prepareRow(row);
//             return (
//               <tr
//                 {...row.getRowProps()}
//                 key={row.id}
//                 onClick={() => onRowClick && onRowClick(row.original)}
//                 style={{ cursor: "pointer" }}
//               >
//                 {row.cells.map((cell: Cell<T>) => (
//                   <td {...cell.getCellProps()} key={cell.column.id}>
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <div className="pagination">
//         <button onClick={previousPage} disabled={!canPreviousPage}>
//           {"<"}
//         </button>
//         <span>
//           {pageIndex + 1} of {pageOptions.length}
//         </span>
//         <button onClick={nextPage} disabled={!canNextPage}>
//           {">"}
//         </button>
//         <select
//           value={pageSize}
//           onChange={(e) => setPageSize(Number(e.target.value))}
//         >
//           {[10, 20, 30, 40, 50].map((size) => (
//             <option key={size} value={size}>
//               Show {size}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default DataTable;

import React from "react";
import {
  useTable,
  usePagination,
  TableInstance,
  Column,
  Row,
  Cell,
} from "react-table";
import PaginationControls from "../Pagination/PaginationControls"; // Créer un composant séparé pour la pagination
import "./DataTable.css";
import { TableStateWithPagination, TableWithPagination } from "types/types";  // Séparer les types dans un fichier à part


interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const DataTable = <T extends object>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0 } as Partial<TableStateWithPagination<T>>,
    },
    usePagination
  ) as TableWithPagination<T>;

  // Rendu de la table avec ses en-têtes et lignes
  const renderTableBody = () => {
    return page.map((row: Row<T>) => {
      prepareRow(row);
      return (
        <tr
          {...row.getRowProps()}
          key={row.id}
          onClick={() => onRowClick && onRowClick(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.cells.map((cell: Cell<T>) => (
            <td {...cell.getCellProps()} key={cell.column.id}>
              {cell.render("Cell")}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div>
      {/* Table */}
      <table {...getTableProps()} className="table table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>{renderTableBody()}</tbody>
      </table>

      {/* Pagination */}
      <PaginationControls
        pageIndex={pageIndex}
        pageSize={pageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageOptions.length}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default DataTable;
