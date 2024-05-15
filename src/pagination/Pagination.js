// import React, { useState } from "react";

// const Pagination = (perPage, totalPage) => {
//   const total = Math.ceil(totalPage / perPage);
//   const [firstPage, setFirstPage] = useState(0);
//   const [lastPage, setLastPage] = useState(perPage - 1);
//   const [currentPage, setCurrentPage] = useState(1);

//   const displayPage = (pageNo) => {
//     setCurrentPage(pageNo);
//     let last_page = perPage * pageNo - 1;
//     let first_page = perPage * pageNo - perPage;
//     setFirstPage(first_page);

//     if (last_page > totalPage) {
//       setLastPage(totalPage - 1);
//     } else {
//       setLastPage(last_page);
//     }
//   };
//   return [total, firstPage, lastPage, currentPage, displayPage];
// };

// export default Pagination;

const Pagination = () => {
  const totalPages = 100; // Total number of pages
  const currentPage = 3; // Current page
  const perPage = 2; // Number of items per page

  const paginationItems = [];

  // Render "<<", "<" buttons
  paginationItems.push(
    <Pagination.Item key="<<" onClick={() => handlePageChange(1)}>
      &lt;&lt;
    </Pagination.Item>,
    <Pagination.Item
      key="<"
      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
    >
      &lt;
    </Pagination.Item>
  );

  // Render page numbers and ellipses
  if (totalPages <= 7) {
    // Render all pages if total pages are 7 or less
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    // Render pages with ellipses
    const range = 3; // Number of pages to show before and after current page
    let start = Math.max(currentPage - range, 1);
    let end = Math.min(currentPage + range, totalPages);

    if (currentPage - start < range) {
      end = Math.min(start + 2 * range, totalPages);
    } else if (end - currentPage < range) {
      start = Math.max(end - 2 * range, 1);
    }

    if (start > 1) {
      paginationItems.push(<Pagination.Ellipsis key={"startEllipsis"} />);
    }

    for (let i = start; i <= end; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (end < totalPages) {
      paginationItems.push(<Pagination.Ellipsis key={"endEllipsis"} />);
    }
  }

  // Render ">", ">>" buttons
  paginationItems.push(
    <Pagination.Item
      key=">"
      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
    >
      &gt;
    </Pagination.Item>,
    <Pagination.Item key=">>" onClick={() => handlePageChange(totalPages)}>
      &gt;&gt;
    </Pagination.Item>
  );

  return paginationItems;
};

return <Pagination>{Pagination()}</Pagination>;
