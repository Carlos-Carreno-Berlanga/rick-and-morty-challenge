import React from 'react';
import DataTable from "react-data-table-component";

function Table({ loading, hasErrors, characters, columns, totalRows, currentPage, handlePageChange }) {
    if (loading) {
        return <p>
            <span role="loading-message">
                Loading...
            </span>
        </p>
    }
    if (hasErrors) {
        return <p>
            <span role="failure-message">
                Unable to display characthers.
            </span>
        </p>
    }
    if (characters?.results?.length > 0) {
        return (
            <div role="characters-table">
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
                />
            </div>
        );

    }
}

export default Table;