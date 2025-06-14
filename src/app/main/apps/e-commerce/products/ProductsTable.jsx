import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSelector } from 'react-redux';
import ProductsTableHead from './ProductsTableHead';
import { selectFilteredProducts, useGetECommerceProductsQuery } from '../ECommerceApi';

/**
 * The products table.
 */
function ProductsTable(props) {
	const { navigate } = props;
	const { data, isLoading } = useGetECommerceProductsQuery();
	const products = useSelector(selectFilteredProducts(data));
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tableOrder, setTableOrder] = useState({
		direction: 'asc',
		id: ''
	});

	function handleRequestSort(event, property) {
		const newOrder = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(products.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/e-commerce/products/${item.id}/${item.handle}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, page) {
		setPage(+page);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (products?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no products!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<ProductsTableHead
						selectedProductIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={products.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(products, [tableOrder.id], [tableOrder.direction]).map((n) => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className="h-20 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}
								>
									<TableCell
										className="w-40 md:w-64 text-center"
										padding="none"
									>
										<Checkbox
											checked={isSelected}
											onClick={(event) => event.stopPropagation()}
											onChange={(event) => handleCheck(event, n.id)}
										/>
									</TableCell>

									<TableCell
										className="w-52 px-4 md:px-0"
										component="th"
										scope="row"
										padding="none"
									>
										{n?.images?.length > 0 && n.featuredImageId ? (
											<img
												className="w-full block rounded"
												src={_.find(n.images, { id: n.featuredImageId })?.url}
												alt={n.name}
											/>
										) : (
											<img
												className="w-full block rounded"
												src="assets/images/apps/ecommerce/product-image-placeholder.png"
												alt={n.name}
											/>
										)}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.name}
									</TableCell>

									<TableCell
										className="p-4 md:p-16 truncate"
										component="th"
										scope="row"
									>
										{n.categories.join(', ')}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										align="right"
									>
										<span>$</span>
										{n.priceTaxIncl}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										align="right"
									>
										{n.quantity}
										<i
											className={clsx(
												'inline-block w-8 h-8 rounded mx-8',
												n.quantity <= 5 && 'bg-red',
												n.quantity > 5 && n.quantity <= 25 && 'bg-orange',
												n.quantity > 25 && 'bg-green'
											)}
										/>
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										align="right"
									>
										{n.active ? (
											<FuseSvgIcon
												className="text-green"
												size={20}
											>
												heroicons-outline:check-circle
											</FuseSvgIcon>
										) : (
											<FuseSvgIcon
												className="text-red"
												size={20}
											>
												heroicons-outline:minus-circle
											</FuseSvgIcon>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={products.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(ProductsTable);
