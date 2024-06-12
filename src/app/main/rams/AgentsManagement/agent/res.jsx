<Controller
	name="doc1_image"
	control={control}
	render={({ field: { onChange, value } }) => (
		<div className="flex w-full flex-row items-center justify-evenly">
			<div className="flex-col">
				<Typography className="text-center">Document 1</Typography>
				<label
					htmlFor="doc1_image-button-file"
					className={clsx(
						classes.productImageUpload,
						'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
					)}
				>
					<input
						accept="image/x-png,image/gif,image/jpeg,application/pdf"
						className="hidden"
						id="doc1_image-button-file"
						type="file"
						onChange={async (e) => {
							const reader = new FileReader();
							reader.onload = () => {
								if (reader.readyState === 2) {
									setPreviewDoc1Image(reader.result);
								}
							};
							reader.readAsDataURL(e.target.files[0]);

							const file = e.target.files[0];

							setFileExtDoc1Name(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

							onChange(file);
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
			{!previewDoc1Image && doc1File && (
				<div
					style={{
						width: 'auto',
						height: '150px',
						overflow: 'hidden',
						display: 'flex'
					}}
				>
					{(doc1File?.name || doc1File)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
						<PictureAsPdf
							style={{
								color: 'red',
								cursor: 'pointer',
								display: 'block',
								fontSize: '35px',
								margin: 'auto'
							}}
							onClick={() => window.open(`${BASE_URL}${doc1File}`)}
						/>
					) : (
						<img
							src={`${BASE_URL}${doc1File}`}
							style={{ height: '150px' }}
						/>
					)}
				</div>
			)}

			{previewDoc1Image && (
				<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
					{fileExtDoc1Name === 'pdf' ? (
						<iframe
							src={previewDoc1Image}
							frameBorder="0"
							scrolling="auto"
							height="150px"
							width="150px"
						/>
					) : (
						<img
							src={previewDoc1Image}
							style={{ height: '150px' }}
						/>
					)}
				</div>
			)}
		</div>
	)}
/>;
