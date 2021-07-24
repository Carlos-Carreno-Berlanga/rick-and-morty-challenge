import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Table from "./Table";

test('renders a number input with a label "Favorite Number"',  () => {
    render(
        <Table
            loading
        />)

    expect(screen.getByRole("loading-message")).toBeInTheDocument();

})