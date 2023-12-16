import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPopupProps {
  show: boolean;
  title: ReactNode;
  onClose?: (...args: any[]) => void;
  children: ReactNode;
  container?: Element | DocumentFragment;
}

const Popup: FC<IPopupProps> = ({
  show,
  title,
  onClose = () => {},
  children,
  container = document.body,
}) => {
  if (show) document.body.style.overflow = "hidden";

  if (!show) {
    document.body.style.overflow = "auto";
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] [body]:overflow-hidden">
      <div className="w-[90%] sm:max-w-[510px] px-8 py-10 bg-white fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
        <div className="flex flex-col">
          {title}

          <button
            className="text-[50px] absolute top-[17px] right-[17px]"
            onClick={onClose}
          >
            &times;
          </button>

          <div>{children}</div>
        </div>
      </div>
    </div>,
    container
  );
};

export default Popup;
