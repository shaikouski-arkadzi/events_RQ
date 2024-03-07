import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <motion.dialog 
      className="modal"
      ref={dialog}
      onClose={onClose}
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
    >
      {children}
    </motion.dialog>,
    document.getElementById('modal')
  );
}
