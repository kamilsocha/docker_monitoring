export const BREAK = "BREAK"

export const range = (from, to, step = 1) => {
  let length = Math.floor((to - from) / step) + 1
  return Array(length)
    .fill()
    .map((_, idx) => from + idx * step)
}

export const preparePagination = (
  startPage,
  endPage,
  totalPages,
  totalNumbers
) => {
  let pagination = range(startPage, endPage, 1)

  const hasLeftSpill = startPage > 2
  const hasRightSpill = totalPages - endPage > 1
  const spillOffset = totalNumbers - (pagination.length + 1)

  if (hasLeftSpill && !hasRightSpill) {
    return [
      BREAK,
      ...range(startPage - spillOffset, startPage - 1),
      ...pagination,
    ]
  } else if (!hasLeftSpill && hasRightSpill) {
    return [...pagination, ...range(endPage + 1, endPage + spillOffset), BREAK]
  } else {
    return [BREAK, ...pagination, BREAK]
  }
}
