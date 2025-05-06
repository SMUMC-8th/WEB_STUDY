import ReactDom from "react-dom";
const Portal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  if (!modalRoot) {
    return null;
  }
  return ReactDom.createPortal(children, modalRoot);
};
export default Portal;
