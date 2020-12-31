import React from "react"
import { useMemo } from "react"
import { Spinner, Table } from "react-bootstrap"
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table"
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GlobalFilter } from "./GlobalFilter"

import PaginationBar from "./PaginationBar"

const BasicTable = (props) => {
  const columns = useMemo(() => props.columns, [props.columns])
  const data = useMemo(() => props.data, [props.data])

  const pageSizeOptions = [10, 15, 20]

  const tableInstance = useTable(
    {
      columns,
      data,
      baseurl: props.baseurl,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance

  const { globalFilter, pageIndex, pageSize } = state

  let tableBody = null
  if (props.isLoading) {
    tableBody = (
      <tr>
        <td colSpan={columns.length} className="text-center">
          <Spinner animation="border" />
        </td>
      </tr>
    )
  } else if (props.error) {
    tableBody = (
      <tr>
        <td colSpan={columns.length} className="text-center">
          {props.error}
        </td>
      </tr>
    )
  } else {
    tableBody = page.map((row) => {
      prepareRow(row)
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => {
            return (
              <td
                {...cell.getCellProps()}
                style={{
                  ...cell.getCellProps().style,
                  ...props.getCellStyle(cell),
                }}
              >
                {cell.render("Cell")}
              </td>
            )
          })}
        </tr>
      )
    })
  }

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}>
        {props.children}
      </GlobalFilter>
      <Table {...getTableProps()} striped bordered hover responsive>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    ...column.getHeaderProps().style,
                    ...props.getColumnStyle(column),
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted && (
                      <FontAwesomeIcon
                        className="ml-1"
                        icon={column.isSortedDesc ? faSortDown : faSortUp}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>{tableBody}</tbody>
      </Table>

      <PaginationBar
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        pageCount={pageCount}
        pageIndex={pageIndex}
        nextPage={nextPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </>
  )
}

export default BasicTable
