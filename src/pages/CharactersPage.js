import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCharacters, postsSelector } from '../slices/posts';

import DataTable from "react-data-table-component";

const CharactersPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasErrors } = useSelector(postsSelector);

  useEffect(() => {
    setTotalRows(posts?.info?.count);
  }, [posts?.info?.count]);


  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage))
  }, [dispatch, currentPage]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const columns = useMemo(
    () => [
      {
        name: "First Name",
        selector: "name",
        sortable: true
      },
      {
        name: "Status",
        selector: "status",
        sortable: true
      },
      {
        name: "Type",
        selector: "type",
        sortable: true
      },
      // {
      //   // eslint-disable-next-line react/button-has-type
      //   cell: row => <button onClick={handleDelete(row)}>Delete</button>
      // }
    ],
    // [handleDelete]
  );

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts.</p>
    if (posts?.results?.length > 0) {

      return (
        <DataTable
          title="Users"
          columns={columns}
          data={posts?.results}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangePage={handlePageChange}
          selectableRows={false}
          paginationComponentOptions={{ noRowsPerPage: true }}
          onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />);

    }
  }

  return (
    <section>
      <h1>Rich and Morty Challenge</h1>
      {renderPosts()}
    </section>
  )
}


export default CharactersPage
