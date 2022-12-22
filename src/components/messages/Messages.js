import Swal from "sweetalert2";

export const errorMessage = (message) => {
    const dialog = Swal.fire({
            title: message,
            text: "Do you want to continue?",
            icon: "error",
            confirmButtonColor: "#0CC8A8",
            confirmButtonText: "OK",
        })
    ;
    return dialog;
}

export const successfulMessage = (title) => {
    const dialog = Swal.fire({
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    })
    return dialog;
}

export const confirmationMessage = (title) => {
    const dialog = Swal.fire({
        title: "Confirmation",
        text: title,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3298dc",
        cancelButtonColor: "#f14668",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
    });
    return dialog;
}
