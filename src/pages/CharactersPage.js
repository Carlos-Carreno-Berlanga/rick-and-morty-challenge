import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCharacters, charactersSelector } from '../slices/characters';

import DataTable from "react-data-table-component";

const CharactersPage = () => {
  const dispatch = useDispatch();
  const { characters, loading, hasErrors } = useSelector(charactersSelector);

  useEffect(() => {
    setTotalRows(characters?.info?.count);
  }, [characters?.info?.count]);


  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage))
  }, [dispatch, currentPage]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };


  const handleDelete = row => {
    console.log("HOLA", row);
  }

  const columns = useMemo(
    () => [
      {
        name: "First Name",
        selector: "name",
      },
      {
        name: "Status",
        selector: "status",
      },
      {
        name: "Type",
        selector: "type",
      },
      {
        name: "Image",
        cell: (row) => {
          return <div><img height={125} src={row.image} /></div>
        },
        id: "image"
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: row => <button onClick={() => handleDelete(row)}>Delete</button>
      }
    ],
    [handleDelete]
  );



  const renderCharacters = () => {
    if (loading) return <p>Loading...</p>
    if (hasErrors) return <p>Unable to display characthers.</p>
    if (characters?.results?.length > 0) {

      return (
        <DataTable
          title="Users"
          columns={columns}
          data={characters?.results}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          paginationPerPage={20}
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
      {renderCharacters()}
    </section>
  )
}


export default CharactersPage
