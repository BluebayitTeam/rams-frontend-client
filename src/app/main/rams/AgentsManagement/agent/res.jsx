// eslint-disable-next-line no-lone-blocks
{
	/* <Controller
					name="image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center">File</Typography>
								<label
									htmlFor="image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf"
										className="hidden"
										id="image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewImageFile(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											setFileExtName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

											onChange(file);

											// Reset the input value to allow re-uploading the same file
											e.target.value = null;
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
							{!previewImageFile && (image || image) && (
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
										<HighlightOffIcon onClick={handleRemoveFile} />
									</div>
									<div
										style={{
											width: 'auto',
											height: '150px',
											overflow: 'hidden',
											display: 'flex'
										}}
									>
										{(image?.name || image)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
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
											<img
												src={`${BASE_URL}${image}`}
												style={{ height: '100px' }}
											/>
										)}
									</div>
								</div>
							)}

							{previewImageFile ? (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtName === 'pdf' ? (
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
														handleRemoveFile();
													}}
												/>
											</div>
											<iframe
												src={previewImageFile}
												frameBorder="0"
												scrolling="auto"
												height="150px"
												width="150px"
											/>
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
														handleRemoveFile();
													}}
												/>
											</div>

											<img
												src={previewImageFile}
												style={{ height: '140px', width: '150px' }}
											/>
										</div>
									)}
								</div>
							) : (
								!image && (
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
												Note *(JPG,JPEG,PNG,PDF,GIF)
											</span>
										</Typography>
									</Box>
								)
							)}
						</div>
					)}
				/> */
}
