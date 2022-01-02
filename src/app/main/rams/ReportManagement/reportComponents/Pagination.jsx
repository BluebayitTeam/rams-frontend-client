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
        height: '30px',
        '& .icon': {
            // height: '100%'
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
            <FirstPage className='icon cursor-pointer' fontSize='large'
                onClick={() => onClickFirstPage({ page: 1, size })}
            />
            <NavigateBefore className='icon cursor-pointer' fontSize='large'
                onClick={() => onClickPreviousPage({ page: page - 1, size })}
            />
            <div className='pageNumberContainer'>
                <h2>{page}</h2>
                <h4>{page && '/'}</h4>
                <h2>{totalPages}</h2>
            </div>
            <NavigateNext className='icon cursor-pointer' fontSize='large'
                onClick={() => onClickNextPage({ page: page + 1, size })}
            />
            <LastPage className='icon cursor-pointer' fontSize='large'
                onClick={() => onClickLastPage({ page, size })}
            />
        </div>
    )
}

export default Pagination
