export const getReportMakeStyles = theme => ({
	headContainer: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 'fit-content'
	},
	pageContainer: {
		width: '100%',
		backgroundColor: 'white',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: '20px',
		// padding: '15px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	menubar: {
		backgroundColor: theme.palette.primary[100],
		display: 'flex',
		alignItems: 'center',
		padding: '5px',
		position: 'sticky',
		top: '0px',
		minWidth: 'fit-content',
		'& .inside': {
			color: theme.palette.primary.main
		},
		'& .icon': {
			margin: '0px 5px',
			height: '40px',
			padding: '5px',
			width: '40px',
			boxSizing: 'border-box !important',
			borderRadius: '50%',
			'&:active': {
				border: '1px solid !important'
			},
			'&:hover': {
				border: '1px solid !important'
			}
		},
		'& .downloadIcon': {
			position: 'relative',
			height: 'fit-content',
			width: 'fit-content',
			margin: '0px 5px',
			borderRadius: '50%',
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'center',
			'&:hover .downloadOptionContainer': {
				display: 'flex !important'
			},
			'& .downloadOptionContainer': {
				display: 'none',
				position: 'absolute',
				width: '150px',
				top: '35px',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingTop: '10px',
				'&:hover': {
					display: 'flex !important'
				},
				'&:hover + svg': {
					border: '1px solid !important'
				},
				'& .indicator': {
					height: '10px',
					width: '10px',
					transform: 'rotate(41deg)',
					backgroundColor: theme.palette.primary[100],
					marginBottom: '-5px'
				},
				'& .downloadOptions': {
					backgroundColor: theme.palette.primary[100],
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					borderRadius: '10px',
					'& .downloadContainer': {
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						width: '80px',
						padding: '5px 3px',
						background: theme.palette.primary.main,
						color: theme.palette.type == 'dark' ? 'black' : 'white',
						borderRadius: '10px'
					}
				}
			}
		},
		'& .columnSelectContainer': {
			position: 'relative',
			height: 'fit-content',
			width: 'fit-content',
			margin: '0px 5px',
			borderRadius: '50%',
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'flex-end',
			'& > .allColumnContainer': {
				maxHeight: '200px',
				overflow: 'auto',
				position: 'absolute',
				top: '50px',
				background: theme.palette.primary[100],
				padding: '10px',
				color: theme.palette.primary.dark,
				borderRadius: '5px',
				'& > .columnContainer': {
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'nowrap',
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: '2px 0px',
					'& > .checkBox': {
						color: theme.palette.primary.dark,
						padding: '0px 5px 0px 0px'
					},
					'& > h5': {
						fontSize: '14.5px',
						whiteSpace: 'nowrap'
					},
					'& > input': {
						position: 'absolute',
						zIndex: 1
					}
				}
			}
		}
	},
	pagination: {
		'& button': {
			color: theme.palette.primary.dark,
			borderColor: theme.palette.primary.dark
		}
	},
	pageHead: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		margin: '10px 0 10px 0',
		'& .logoContainer': {
			// marginRight: '30px',
			height: '50px',
			'& img': {
				height: '100%',
				width: 'auto'
			}
		},
		'& .title': {
			width: 'fit-content'
		}
	},
	table: {
		width: '100%',

		fontFamily: 'Times New Roman, Times, serif',
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '',
		'& .tableRow': {
			height: '12px',
			overflow: 'auto ',
			'&:hover': {
				backgroundColor: theme.palette.primary[50]
			}
		},
		'& .tableCell': {
			padding: '4px',
			fontSize: '11px',
			border: '1px solid black',
			// height: '30px',
			whiteSpace: 'wrap',

			'& div': {
				height: 'fit-content',
				padding: '0px 2px',
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
				overflow: 'hidden'
			}
		},
		'& .tableCellHead': {
			padding: '0px',
			border: '1px solid black',
			textAlign: 'center',
			'& > div': {
				cursor: 'pointer',
				whiteSpace: 'nowrap',

				'&:active': {
					color: 'grey'
				},
				'&:hover .sortIcon': {
					opacity: '1 !important'
				},
				'& .sortIcon': {
					transition: '0.3s',
					opacity: '0',
					color: 'rgb(17, 24, 39)'
				}
			}
		}
	},
	pageBottmContainer: {
		width: '100%',
		padding: '5px',
		height: '20px',

		textAlign: 'center',
		'& h5': {
			whiteSpace: 'nowrap'
		}
	},
	pageFooterContainer: {
		width: '100%',
		// padding: '15px',
		borderTop: '1px solid  gray',
		height: '65px',
		fontSize: '10px',
		textAlign: 'center',
		'& h6': {
			whiteSpace: 'nowrap'
		}
	},
	pageBottm: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		'& > div': {
			display: 'flex',
			flexWrap: 'wrap',
			'& > h5': {
				paddingRight: '5px'
			}
		}
	}
});

export const getReportFilterMakeStyles = theme => ({
	filterMenuContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0px 10px',
		'& .borderTop': {
			borderTop: `1px solid ${theme.palette.primary[100]}`
		},
		'& .allFieldContainer': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			flexWrap: 'wrap',
			'& .fieldContainer': {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				color: theme.palette.primary.main,
				height: '30px',
				width: 'fit-content',
				margin: '10px 5px',
				'& .textField': {
					height: '100%',
					margin: '0px 10px',
					background: 'inherit',
					border: 'none',
					outline: 'none',
					borderBottom: `1px solid ${theme.palette.primary[100]}`,
					color: theme.palette.primary.main,
					width: '100%',
					transition: '0.3s',
					'&:focus': {
						borderBottom: `1px solid ${theme.palette.primary.main}`,
						width: '100px !important'
					},
					'&::placeholder': {
						color: theme.palette.primary.main
					},
					'&::-ms-input-placeholder': {
						color: theme.palette.primary.main
					},
					'&:-ms-input-placeholder': {
						color: theme.palette.primary.main
					}
				},
				'& .selectLabel': {
					cursor: 'pointer',
					overflow: 'hidden',
					transition: '0.3s',
					color: theme.palette.primary.main,
					whiteSpace: 'nowrap'
				},
				'& .dateLabel': {
					width: 'fit-content',
					margin: '3px 5px 0px 8px',
					cursor: 'pointer',
					color: theme.palette.primary.main
				},
				'& .selectOpenIcon': {
					fontSize: '18px',
					overflow: 'hidden'
				},
				'& .selectField': {
					overflow: 'hidden',
					transition: '0.3s',
					'& .endAdornment': {
						'& > button': {
							color: theme.palette.primary.main
						}
					},
					'& .textFieldUnderSelect': {
						'& > div': {
							color: theme.palette.primary.main,
							'&::before': {
								borderColor: theme.palette.primary.main
							}
						}
					}
				},
				'& .icon': {
					fontSize: '20px'
				}
			}
		},
		'& .allKeyWrdContainer': {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center',
			margin: '20px auto',
			paddingTop: '5px',
			borderTop: `1px solid ${theme.palette.primary[100]}`,
			'& .keywordContainer': {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: 'fit-content',
				margin: '2px 5px',
				'& > b': {
					color: theme.palette.primary.main,
					opacity: 0.6,
					fontWeight: 600
				},
				'& > div': {
					padding: '3px 8px',
					fontSize: '14px',
					background: theme.palette.primary[100],
					color: theme.palette.primary.dark,
					margin: '3px 5px',
					borderRadius: '15px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					height: '25px',
					'& > p': {
						marginBottom: '-1px'
					},
					'& .iconWithKeyWord': {
						marginRight: '5px'
					},
					'& .closeIconWithKeyWord': {
						marginLeft: '5px',
						cursor: 'pointer'
					}
				}
			}
		}
	}
});

export const getReportPaginationMakeStyles = theme => ({
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
			borderRadius: '50%',
			'&:active': {
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
});
