import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  buttonContent: ReactNode
}

const Modal = ({ isOpen, onClose, children, buttonContent }: ModalProps) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1D1D23] bg-opacity-50 p-4">
      <div className="bg-[#2B2B31] w-full md:max-w-lg max-w-[350px] rounded-2xl md:px-6 p-4 shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-5 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          {buttonContent}
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
