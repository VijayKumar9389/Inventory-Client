// Dialog.tsx
import './Dialog.scss';
import React, {useEffect} from "react";
import { MdClose } from "react-icons/md";

interface DialogProps {
    isOpen: boolean;
    toggle: () => void;
    element: JSX.Element;
    heading: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, toggle, element, heading }) => {

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleBodyScroll = () => {
            document.body.style.overflow = isOpen ? 'hidden' : 'auto'; // Prevent scrolling on body when dialog is open
        };

        handleBodyScroll(); // Call the function immediately to set initial overflow state

        if (isOpen) {
            document.body.addEventListener("touchmove", handleBodyScroll, { passive: false });
            document.body.addEventListener("wheel", handleBodyScroll, { passive: false });
        }

        return (): void => {
            document.body.style.overflow = 'auto'; // Reset body overflow when dialog is closed
            document.body.removeEventListener("touchmove", handleBodyScroll);
            document.body.removeEventListener("wheel", handleBodyScroll);
        };
    }, [isOpen]);



    if (isOpen) {
        return (
            <div className="popup-overlay" onClick={toggle}>
                <div className="popup-box" onClick={handleContentClick}>
                    <div className="popup-header">
                        <h2 className="panel-label">{heading}</h2>
                        <button onClick={toggle} className="action-btn"><MdClose /></button>
                    </div>
                    <div className="popup-content" >
                        {element}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Dialog;
