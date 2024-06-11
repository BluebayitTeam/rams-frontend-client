<Controller
	name="doc2_image"
	control={control}
	render={({ field: { onChange, value } }) => (
		<div className="flex w-full flex-row items-center justify-center ml-16">
			<div className="flex-col">
				<Typography className="text-center">Document 2</Typography>
				<label
					htmlFor="doc2_image-button-file"
					className={clsx(
						classes.productImageUpload,
						'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
					)}
				>
					<input
						accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						className="hidden"
						id="doc2_image-button-file"
						type="file"
						onChange={async (e) => {
							const reader = new FileReader();
							reader.onload = () => {
								if (reader.readyState === 2) {
									setPreviewDoc2File(reader.result);
								}
							};
							reader.readAsDataURL(e.target.files[0]);

							const file = e.target.files[0];

							setFileExtDoc2Name(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

							onChange(file);

							// Force reset the input value to allow re-uploading the same file
							e.target.value = '';
						}}
					/>
					<Icon
						fontSize="large"
						color="action"
					>
						cloud_upload
					</Icon>
				</label>
			</div>
			{!previewDoc2File && (doc2File || doc2File) && (
				<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
					<div
						id="cancelIcon"
						style={{
							position: 'absolute',
							top: '0',
							right: '0',
							zIndex: 1,
							color: 'red',
							cursor: 'pointer'
						}}
					>
						<HighlightOffIcon onClick={handleRemoveDOC2File} />
					</div>
					<div
						style={{
							width: 'auto',
							height: '150px',
							overflow: 'hidden',
							display: 'flex'
						}}
					>
						{['pdf', 'doc', 'docx'].includes(
							(doc2File?.name || doc2File)?.split('.')?.pop()?.toLowerCase()
						) ? (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%'
								}}
							>
								{fileExtDoc2Name === 'pdf' ? (
									<PictureAsPdf
										style={{
											color: 'red',
											cursor: 'pointer',
											display: 'block',
											fontSize: '35px',
											margin: 'auto'
										}}
										onClick={() => window.open(`${BASE_URL}${file}`)}
									/>
								) : (
									<DescriptionIcon
										style={{
											color: 'blue',
											cursor: 'pointer',
											display: 'block',
											fontSize: '137px',

											margin: 'auto'
										}}
										onClick={() => window.open(`${BASE_URL}${file}`)}
									/>
								)}
							</div>
						) : (
							<img
								src={`${BASE_URL}${doc2File}`}
								style={{ height: '100px' }}
							/>
						)}
					</div>
				</div>
			)}

			{previewDoc2File ? (
				<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
					{fileExtDoc2Name === 'pdf' || fileExtDoc2Name === 'doc' || fileExtDoc2Name === 'docx' ? (
						<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
							<div
								id="cancelIcon"
								style={{
									position: 'absolute',
									top: '0',
									right: '0',
									zIndex: 1,
									color: 'red'
								}}
							>
								<HighlightOffIcon
									onClick={() => {
										handleRemoveDOC2File();
									}}
								/>
							</div>
							{fileExtDoc2Name === 'pdf' ? (
								<iframe
									src={previewDoc2File}
									frameBorder="0"
									scrolling="auto"
									height="150px"
									width="150px"
								/>
							) : (
								<DescriptionIcon
									style={{
										color: 'blue',
										cursor: 'pointer',
										display: 'block',
										fontSize: '137px',
										margin: 'auto'
									}}
									onClick={() => window.open(previewDoc2File)}
								/>
							)}
						</div>
					) : (
						<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
							<div
								id="cancelIcon"
								style={{
									position: 'absolute',
									top: '0',
									right: '0',
									zIndex: 1,
									color: 'red'
								}}
							>
								<HighlightOffIcon
									onClick={() => {
										handleRemoveDOC2File();
									}}
								/>
							</div>

							<img
								src={previewDoc2File}
								style={{ height: '140px', width: '150px' }}
							/>
						</div>
					)}
				</div>
			) : (
				!doc2File && (
					<Box
						height={180}
						width={180}
						my={4}
						display="flex"
						alignItems="center"
						gap={4}
						p={2}
						style={{
							width: '150px',
							height: '70px',
							border: '1px solid red'
						}}
						className={clsx(
							classes.productImageUpload,
							'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
						)}
					>
						<Typography className="text-sm font-700">
							<span className="mr-4 text-xs text-red-500">
								Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
							</span>
						</Typography>
					</Box>
				)
			)}
		</div>
	)}
/>;
