import Swal from 'sweetalert2';

const useAlert = () => {
    const showAlert = ({
                           icon = 'success', // success, error, warning, info, question
                           title = 'عملیات انجام شد',
                           text = '',
                           confirmButtonText = 'باشه',
                           timer = null,
                           showCancelButton = false,
                           cancelButtonText = 'لغو',
                       }) => {
        return Swal.fire({
            icon,
            title,
            text,
            confirmButtonText,
            timer,
            showCancelButton,
            cancelButtonText,
        })
    };

    return showAlert;
};

export default useAlert;
