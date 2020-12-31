import React, { useState, useEffect } from "react"
import { Form, Pagination } from "react-bootstrap"

import { preparePagination, range, BREAK } from "./utils"

const PaginationBar = ({
  pageSize,
  setPageSize,
  pageSizeOptions,
  pageCount,
  pageIndex,
  nextPage,
  previousPage,
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageNeighbours = 1,
}) => {
  const [pages, setPages] = useState([])
  useEffect(() => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (pageCount > totalBlocks) {
      const startPage = Math.max(2, pageIndex - pageNeighbours)
      const endPage = Math.min(pageCount - 1, pageIndex + pageNeighbours)
      const pagination = preparePagination(
        startPage,
        endPage,
        pageCount,
        totalNumbers
      )
      setPages([1, ...pagination, pageCount])
    } else {
      setPages(range(1, pageCount))
    }
  }, [pageCount, pageIndex, pageNeighbours])
  return (
    <>
      <Pagination className="justify-content-center pb-5">
        <Form.Control
          style={{ maxWidth: "120px", cursor: "pointer" }}
          className="mr-2"
          as="select"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Form.Control>
        <Pagination.First
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
        <Pagination.Prev
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        />

        {pages.map((page, index) => {
          if (page === BREAK) return <Pagination.Ellipsis key={index} />

          return (
            <Pagination.Item
              key={index}
              onClick={() => gotoPage(page)}
              active={page === pageIndex}
            >
              {page}
            </Pagination.Item>
          )
        })}

        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
        <Pagination.Last
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </Pagination>
    </>
  )
}

export default PaginationBar
