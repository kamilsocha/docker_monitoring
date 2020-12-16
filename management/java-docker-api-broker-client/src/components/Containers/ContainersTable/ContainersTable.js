import React from "react"
import { Table } from "react-bootstrap"
import { useRouteMatch } from "react-router-dom"
// import { Link } from "react-router-dom"
import ContainersTableRow from "./ContainersTableRow"

const ContainersTable = ({ containers }) => {
  const { url } = useRouteMatch()
  return (
    <Table hover striped bordered responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>State</th>
          <th>Image</th>
          <th>Created</th>
          <th>Published Ports</th>
        </tr>
      </thead>
      <tbody>
        {containers.map((c) => (
          <ContainersTableRow key={c.Id} container={c} />
        ))}
      </tbody>
    </Table>
  )
}

export default ContainersTable

// import { useTable } from "react-table"

// const COLUMNS = [
//   {
//     Header: "Name",
//     accessor: "Names",
//     Cell: ({ cell: { value } }) => {
//       // return <span>{value}</span>
//       return <Link to={`/${value[0]}`}>{value[0]}</Link>
//     },
//   },
//   {
//     Header: "State",
//     accessor: "State",
//   },
//   {
//     Header: "Image",
//     accessor: "Image",
//   },
//   {
//     Header: "Created",
//     accessor: "Created",
//     Cell: ({ cell: { value } }) => {
//       const date = new Date(new Date().getTime() - value)
//       return <span>{date.toLocaleString("PL")}</span>
//     },
//   },
//   {
//     Header: "Published Ports",
//     accessor: "Ports",
//     // accessor: (row, index) => {
//     //   return row.Ports.length !== 0 ?
//     // },
//     Cell: ({ cell: { value } }) => {
//       return value.map((p) => (
//         <span>{`${p.PublicPort || "-"}:${p.PrivatePort}`}</span>
//       ))
//     },
//   },
// ]

// const ContainersTable = ({ containers }) => {
//   const columns = useMemo(() => COLUMNS, [])
//   const data = useMemo(() => containers, [containers])

//   const tableInstance = useTable({ columns, data })

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = tableInstance

//   return (
//     <Table hover striped bordered {...getTableProps} responsive>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </Table>
//   )
// }

// export default ContainersTable
