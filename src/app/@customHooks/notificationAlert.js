import Swal from 'sweetalert2';

export const AddedSuccessfully = () => {
	Swal.fire({
		position: 'top-center',
		icon: 'success',
		title: 'Added Successfully',
		showConfirmButton: false,
		timer: 2000
	});
};
export const DeletedSuccessfully = () => {
	Swal.fire({
		position: 'top-center',
		icon: 'success',
		title: 'Deleted Successfully',
		showConfirmButton: false,
		timer: 2000
	});
};
export const RemoveSuccessfully = () => {
	Swal.fire({
		position: 'top-center',
		icon: 'success',
		title: 'Remove Successfully',
		showConfirmButton: false,
		timer: 2000
	});
};
export const UpdatedSuccessfully = () => {
	Swal.fire({
		position: 'top-center',
		icon: 'success',
		title: 'Updated Successfully',
		showConfirmButton: false,
		timer: 2000
	});
};
export const EmabassyAlert = () => {
	Swal.fire({
		position: 'top-center',
		icon: 'error',
		title: 'please check "Embassy" information',
		// text: 'Something went wrong!',
		showConfirmButton: false,
		timer: 2000
	});
};
