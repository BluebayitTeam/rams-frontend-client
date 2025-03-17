import Swal from 'sweetalert2';

export const AddedSuccessfully = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Added Successfully',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const DeletedSuccessfully = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Deleted Successfully',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const RemoveSuccessfully = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Remove Successfully',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const Updated = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Updated',
    showConfirmButton: false,
    timer: 4000,
  });
};
export const UpdatedSuccessfully = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Updated Successfully',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const EmabassyAlert = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'error',
    title: 'please check "Embassy" information',
    // text: 'Something went wrong!',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const dateAlert = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'error',
    title: 'Age Must be Between 22-35',
    // text: 'Something went wrong!',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const UsernameAlert = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'error',
    title: 'user name already exit',
    // text: 'Something went wrong!',
    showConfirmButton: false,
    timer: 2000,
  });
};
export const ErrorAlert = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'error',
    title: 'user name already exit',
    // text: 'Something went wrong!',
    showConfirmButton: false,
    timer: 2000,
  });
};

export const CustomNotification = (type, message) => {
  if (type === 'success') {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `${message}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (type === 'error') {
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: `${message}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (type === 'warning') {
    Swal.fire({
      position: 'top-center',
      icon: 'warning',
      title: `${message}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
