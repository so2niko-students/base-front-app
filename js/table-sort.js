function sortTableByColumn(event) {
    let table = event.target.closest('table');
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));
    let column = event.target.closest('th').cellIndex;

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        switch (true) {
            case aColText > bColText:
                return 1;
            case aColText < bColText:
                return -1;
            case aColText === bColText:
                return 0;
        }
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);


}