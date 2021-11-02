import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { setMenuItem } from 'app/store/fuse/navigationSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
	layoutRoot: {}
});

function SimpleFullWidthSample() {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setMenuItem())
	}, [])



	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Header</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Content Toolbar</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					<DemoContent />
				</div>
			}
		/>
	);
}

export default SimpleFullWidthSample;
