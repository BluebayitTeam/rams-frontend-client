import { Checkbox } from '@mui/material';
import { memo, useState } from 'react';

function ColumnLabel({ column, dispatchTableColumns }) {
	const [isEditeMode, setIsEditeMode] = useState(false);

	return (
		<div
			id="insideClmSelect"
			className="columnContainer"
		>
			<Checkbox
				id="insideClmSelect"
				className="checkBox"
				checked={column?.show}
				onClick={() => {
					dispatchTableColumns({
						type: column?.show ? 'hide' : 'show',
						id: column?.id
					});
				}}
			/>
			{isEditeMode ? (
				<input
					id="insideClmSelect"
					autoFocus
					value={column?.label}
					onBlur={() => setIsEditeMode(false)}
					onKeyDown={(e) => e.key === 'Enter' && setIsEditeMode(false)}
					onChange={(e) => {
						dispatchTableColumns({
							type: 'changLabel',
							id: column?.id,
							value: e.target.value
						});
					}}
				/>
			) : (
				<h5
					id="insideClmSelect"
					onClick={() => setIsEditeMode(true)}
				>
					{column?.label}
				</h5>
			)}
		</div>
	);
}

export default memo(ColumnLabel);
