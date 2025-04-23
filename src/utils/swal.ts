import Swal from 'sweetalert2'

export const showSwal = ({
  title,
  text,
  icon,
}: {
  title: string
  text: string
  icon: 'success' | 'error' | 'warning' | 'info' | 'question'
}) => {
  Swal.fire({
    title,
    text,
    icon,
    showConfirmButton: false,
    timer: 2000,
    background: '#2B2B31',
    color: '#fff',
    customClass: {
      popup: 'border border-red-500 shadow-lg rounded-lg',
      title: icon === 'error' ? 'text-red-500' : 'text-green-400',
      icon: icon === 'error' ? 'text-red-500' : 'text-green-400',
    },
    didOpen: () => {
      const swalContainer = document.querySelector('.swal2-container') as HTMLElement
      if (swalContainer) {
        swalContainer.style.setProperty('z-index', '1000000', 'important')
      }
    },
  })
}
