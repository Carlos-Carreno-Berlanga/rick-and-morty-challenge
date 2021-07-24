import React from 'react';
import DataTable from "react-data-table-component";

function Table({ loading, hasErrors, characters, columns, totalRows, currentPage, handlePageChange }) {
    if (loading) {
        return <p>
            <span role="loading-message">Loading...
            </span>
        </p>
    }
    if (hasErrors) {
        return <p>Unable to display characthers.</p>
    }
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
            />);

    }
}

export default Table;