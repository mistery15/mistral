import React, { FC } from 'react';

interface ModalProps {
    isOpen: boolean,
    onClose: (isClosed: boolean) => void,
    size?: 'normal' | 'large'
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose, size = "normal" }) => {

    return  isOpen ? (
        <div onClick={() => onClose(false)} className="Modal">
            <div onClick={e => e.stopPropagation()} className={`modal-content ${size}`}>
                {children}
            </div>
        </div>
    ) : null;
};

export { Modal };