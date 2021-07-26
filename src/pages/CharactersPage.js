import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCharacters, charactersSelector, saveCharacter } from '../slices/characters';

import Table from '../components/Table';

const CharactersPage = () => {
  const dispatch = useDispatch();
  const { characters, loading, hasErrors, savedCharacters } = useSelector(charactersSelector);

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

  const handleSaveCharacter = useCallback(
    row => async () => {

      dispatch(saveCharacter(row.id));
    },
    [dispatch]
  );

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
          return <div><img alt={`characher-${row.name}`} height={125} src={row.image} /></div>
        },
        id: "image"
      },
      {

        cell: row =>
          <button style={{ cursor: "pointer" }} onClick={handleSaveCharacter(row)}>
            {savedCharacters[row.id] ? "Delete" : "Save"}
          </button>
      },
      {
        cell: row =>
          <span style={{ height: "60px", width: "100px", fontSize: "36px", lineHeight: "36px" }}>
            {savedCharacters[row.id] ? "💾" : "👍❔"}
          </span>
      }
    ],
    [handleSaveCharacter, savedCharacters]
  );

  const renderCharacters = () => {
    return (
      <Table
        loading={loading}
        hasErrors={hasErrors}
        characters={characters}
        totalRows={totalRows}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        columns={columns}
      />);
  }

  return (
    <section>
      <h1>Rich and Morty Challenge</h1>
      {renderCharacters()}
    </section>
  )
}

export default CharactersPage
