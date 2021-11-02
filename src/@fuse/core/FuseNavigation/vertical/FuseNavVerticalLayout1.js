import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import FuseNavItem from '../FuseNavItem';

const useStyles = makeStyles(theme => {

	return ({
		navigation: {
			'& .fuse-list-item': {
				'&:hover': {
					backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light
				},
				'&:focus:not(.active)': {
					backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
				}
			},
			'&.active-square-list': {
				'& .fuse-list-item, & .active.fuse-list-item': {
					width: '100%',
					borderRadius: '0'
				}
			},
			'&.dense': {
				'& .fuse-list-item': {
					paddingTop: 0,
					paddingBottom: 0,
					height: 32
				}
			}
		}
	})
});

function FuseNavVerticalLayout1(props) {
	const classes = useStyles(props);
	const { navigation, layout, active, dense, className, onItemClick } = props;
	const dispatch = useDispatch();

	function handleItemClick(item) {
		onItemClick && onItemClick(item);
	}

	return (
		<List
			className={clsx(
				'navigation whitespace-nowrap px-12',
				classes.navigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<FuseNavItem
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
				/>
			))}
		</List>
	);
}

export default FuseNavVerticalLayout1;
