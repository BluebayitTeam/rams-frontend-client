
import { GetApp } from "@material-ui/icons";
import ListIcon from '@material-ui/icons/List';
import PrintIcon from '@material-ui/icons/Print';
import React from 'react';
import { useReactToPrint } from 'react-to-print';

function Menubar({ componentRef, classes }) {

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div
            className={classes.menubar}
        >
            {/* <Pagination
                count={totalPages}
                page={page + 1}
                defaultPage={1}
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
                onChange={handlePagination}
                className={classes.pagination}
            /> */}
            <GetApp
                className="h-72 cursor-pointer inside inside"
                style={{
                    marginLeft: '15px',
                    height: '30px',
                    width: '30px'
                }} />
            <PrintIcon
                onClick={handlePrint}
                className="h-72 cursor-pointer inside"
                style={{
                    height: '30px',
                    marginLeft: '15px',
                    width: '30px'
                }} />

            <ListIcon
                className="h-72 cursor-pointer inside"
                style={{
                    height: '30px',
                    marginLeft: '15px',
                    width: '30px'
                }} />
        </div>
    )
}

export default Menubar
