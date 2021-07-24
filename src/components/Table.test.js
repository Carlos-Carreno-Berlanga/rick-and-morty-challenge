import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Table from "./Table";

test('renders loading when loading is true', () => {
    render(
        <Table
            loading
        />);

    expect(screen.getByRole("loading-message")).toBeInTheDocument();
});

test('renders failure when hasErrors is true', () => {
    render(
        <Table
            hasErrors
        />);

    expect(screen.getByRole("failure-message")).toBeInTheDocument();
});


test('renders characters table when we pass characters and other parameters', () => {
    render(
        <Table
            loading={false}
            hasErrors={false}
            characters={{ results: [{ name: "Rick" }, { name: "Morty" }] }}
            columns={[
                {
                    name: "First Name",
                    selector: "name",
                }]}
            totalRows={2}
            currentPage={1}
            handlePageChange={() => console.log("do nothing")}
        />);

    expect(screen.getByRole("characters-table")).toBeInTheDocument();
});