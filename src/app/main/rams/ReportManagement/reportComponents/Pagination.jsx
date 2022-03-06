import { makeStyles } from '@material-ui/core';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@material-ui/icons';
import React, { memo, useMemo } from 'react';
import { getReportPaginationMakeStyles } from '../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportPaginationMakeStyles(theme)
}));

function Pagination({
	page,
	size,
	totalPages,
	totalElements,
	onClickFirstPage = () => null,
	onClickPreviousPage = () => null,
	onClickNextPage = () => null,
	onClickLastPage = () => null
}) {
	const classes = useStyles();

	console.log('paginationProps', {
		page,
		size,
		totalPages,
		totalElements
	});

	const memoizedPrevButtonActive = useMemo(() => {
		const isIctive = page && page !== 1;
		return isIctive;
	}, [page]);

	const memoizedNextButtonActive = useMemo(() => {
		const isIctive = totalPages && page !== totalPages;
		return isIctive;
	}, [page, totalPages]);

	console.log('rendered pagination');
	return (
		<div className={classes.paginationContainer}>
			<FirstPage
				className="pagIcon"
				fontSize="large"
				style={{
					opacity: memoizedPrevButtonActive ? 1 : 0.5,
					cursor: memoizedPrevButtonActive ? 'pointer' : 'default',
					border: memoizedPrevButtonActive || 'none'
				}}
				onClick={() => {
					memoizedPrevButtonActive && onClickFirstPage({ page: 1, size });
				}}
			/>
			<NavigateBefore
				className="pagIcon"
				fontSize="large"
				style={{
					opacity: memoizedPrevButtonActive ? 1 : 0.5,
					cursor: memoizedPrevButtonActive ? 'pointer' : 'default',
					border: memoizedPrevButtonActive || 'none'
				}}
				onClick={() => {
					memoizedPrevButtonActive && onClickPreviousPage({ page: page - 1, size });
				}}
			/>
			{page && totalPages ? (
				<div className="pageNumberContainer">
					<h2>{page}</h2>
					<h4>{page && '/'}</h4>
					<h2>{totalPages}</h2>
				</div>
			) : null}
			<NavigateNext
				className="pagIcon"
				fontSize="large"
				style={{
					opacity: memoizedNextButtonActive ? 1 : 0.5,
					cursor: memoizedNextButtonActive ? 'pointer' : 'default',
					border: memoizedNextButtonActive || 'none'
				}}
				onClick={() => {
					memoizedNextButtonActive && onClickNextPage({ page: page + 1, size });
				}}
			/>
			<LastPage
				className="pagIcon"
				fontSize="large"
				style={{
					opacity: memoizedNextButtonActive ? 1 : 0.5,
					cursor: memoizedNextButtonActive ? 'pointer' : 'default',
					border: memoizedNextButtonActive || 'none'
				}}
				onClick={() => {
					memoizedNextButtonActive && onClickLastPage({ page: totalPages, size });
				}}
			/>
		</div>
	);
}

export default memo(Pagination, (prevProps, nextProps) => {
	const isEqual =
		prevProps.page === nextProps.page &&
		prevProps.size === nextProps.size &&
		prevProps.totalPages === nextProps.totalPages &&
		prevProps.totalElements === nextProps.totalElements;
	return isEqual;
});
