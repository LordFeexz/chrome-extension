import swal from "sweetalert2";

export const swalError = (err: any) => {
  swal.fire({
    title: "Error",
    text: err,
    icon: "warning",
    closeButtonHtml: "Ok",
  });
};