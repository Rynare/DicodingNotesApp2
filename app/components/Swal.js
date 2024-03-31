import Swal from 'sweetalert2';
export function runSwal(config) {
    const Toast = Swal.mixin({
        toast: config.isToast || true,
        position: config.position || "top-end",
        showConfirmButton: false,
        timer: config.timer || 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: config.type,
        title: config.title
    });
}