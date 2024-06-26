export const getAccountFormStyles = theme => ({
	mainContainer: {
		width: '100%',
		border: `2px solid ${theme.palette.primary.dark}`,
		borderRadius: '5px',
		height: 'fit-content',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		padding: '20px'
	},
	btnContainer: {
		cursor: 'pointer',
		borderRadius: '3px',
		fontWeight: 'bold',
		borderWidth: '2px',
		height: '50px',
		width: '50px',
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.background.default,
		'&:hover': {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.primary.dark,
			borderColor: theme.palette.primary.dark
		}
	},
	tblContainer: {
		borderRadius: '5px'
	},
	table: {
		minWidth: 600
	},
	tableHead: {
		backgroundColor: theme.palette.primary.main
	},
	tableCell: {
		color: theme.palette.background.paper
	},
	tableCellInBody: {
		border: `1px solid ${theme.palette.primary.dark}`,
		fontWeight: 'bold',
		color: theme.palette.primary.dark
	}
});
