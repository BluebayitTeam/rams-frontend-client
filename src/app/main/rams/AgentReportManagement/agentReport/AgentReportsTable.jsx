function AgentReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const dispatch = useDispatch();

	const { control, getValues } = methods;

	const [modifiedAgentData, setModifiedAgentData] = useReportData();
	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);

	const componentRef = useRef(null);

	// Prevent automatic fetching by setting enabled: false
	const { data, isLoading, refetch } = useGetAgentReportsQuery({ ...getValues(), page, size }, { enabled: false });

	const { refetch: refetchAll } = useGetAgentAllReportsQuery({ ...getValues() }, { enabled: false });

	const totalData = useSelector(selectFilteredAgentReports(data));

	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const handleGetAgents = async (newPage, callBack) => {
		try {
			const formValues = getValues();
			const page = newPage || 1;
			setPage(page);

			const response = await refetch({ ...formValues, page, size });

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}

					const agentsData = response.data.agents || [];
					setModifiedAgentData(agentsData);
					setInShowAllMode(false);

					setTotalPages(response.data?.total_pages);
					setTotalElements(response.data?.total_elements);
				});
			}
		} catch (error) {
			console.error('Error fetching agents:', error);
		}
	};

	const handleGetAllAgents = async (callBack, callBackAfterStateUpdated) => {
		try {
			const formValues = getValues();

			const response = await refetchAll({ ...formValues });

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}

					setModifiedAgentData(response.data.agents || []);
					setInShowAllMode(true);

					const { totalPages, totalElements } = getPaginationData(response.data.agents, size, page);
					setTotalPages(totalPages);
					setTotalElements(totalElements);
				});

				if (callBackAfterStateUpdated) {
					callBackAfterStateUpdated(response.data);
				}
			}
		} catch (error) {
			console.error('Error fetching all agents:', error);
		}
	};

	return (
		<div className={classes.headContainer}>
			<FormProvider {...methods}>
				<AgentFilterMenu
					inShowAllMode={inShowAllMode}
					handleGetAgents={handleGetAgents}
					handleGetAllAgents={handleGetAllAgents}
				/>
			</FormProvider>
			<ReportPaginationAndDownload
				page={page}
				size={size}
				setPage={setPage}
				setSize={setSize}
				inShowAllMode={inShowAllMode}
				setInShowAllMode={setInShowAllMode}
				componentRef={componentRef}
				totalPages={totalPages}
				totalElements={totalElements}
				onFirstPage={() => handleGetAgents(1)}
				onPreviousPage={() => handleGetAgents(page - 1)}
				onNextPage={() => handleGetAgents(page + 1)}
				onLastPage={() => handleGetAgents(totalPages)}
				handleExelDownload={handleExelDownload}
				handlePrint={handlePrint}
				handleGetData={handleGetAgents}
				handleGetAllData={handleGetAllAgents}
				tableColumns={tableColumns}
				dispatchTableColumns={dispatchTableColumns}
			/>

			<table
				id="table-to-xls"
				className="w-full"
				style={{ minHeight: '270px' }}
			>
				<tbody
					ref={componentRef}
					id="downloadPage"
				>
					{modifiedAgentData.map((agent, index) => (
						<SinglePage
							key={index}
							classes={classes}
							reportTitle="Agent Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={agent}
							serialNumber={index + 1 + (page - 1) * size}
							setPage={setPage}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AgentReportsTable;
