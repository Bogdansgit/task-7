import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (title, id) => toast.success(title, {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	toastId: id
});

export const notifyError = (title, id) => toast.error(title, {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	toastId: id
});

export default notify;
