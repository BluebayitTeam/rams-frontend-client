import { makeStyles } from '@material-ui/core';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@material-ui/icons";
import React from 'react';


const useStyles = makeStyles(theme => ({
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'fit-content',
        color: theme.palette.primary.main,
        height: '40px',
        '& .pagIcon': {
            height: '40px',
            padding: '5px',
            width: '40px',
            '&:active': {
                borderRadius: '50%',
                border: '1px solid'
            }
        },
        '& .pageNumberContainer': {
            margin: '0px 10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& h2': {
                padding: '0px 3px'
            }
        }
    }
}))


function Pagination({
    page,
    size,
    totalPages,
    totalElements,
    onClickFirstPage = () => null,
    onClickPreviousPage = () => null,
    onClickNextPage = () => null,
    onClickLastPage = () => null,
}) {

    const classes = useStyles()

    console.log("paginationProps", {
        page,
        size,
        totalPages,
        totalElements,
    })

    return (
        <div className={classes.paginationContainer}>
            <FirstPage className='pagIcon cursor-pointer' fontSize='large'
                onClick={() => { (page === 1) || onClickFirstPage({ page: 1, size }) }}
            />
            <NavigateBefore className='pagIcon cursor-pointer' fontSize='large'
                onClick={() => { (page === 1) || onClickPreviousPage({ page: page - 1, size }) }}
            />
            {(page && totalPages) ? (
                <div className='pageNumberContainer'>
                    <h2>{page}</h2>
                    <h4>{page && '/'}</h4>
                    <h2>{totalPages}</h2>
                </div>
            ) : null}
            <NavigateNext className='pagIcon cursor-pointer' fontSize='large'
                onClick={() => { (page === totalPages) || onClickNextPage({ page: page + 1, size }) }}
            />
            <LastPage className='pagIcon cursor-pointer' fontSize='large'
                onClick={() => { (page === totalPages) || onClickLastPage({ page: totalPages, size }) }}
            />
        </div>
    )
}

export default Pagination
