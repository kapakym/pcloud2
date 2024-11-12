import Button from "../../ui/Button/Button";
import { EButtonType } from "../../ui/Button/button.enums";
import { Modal } from "../../ui/Modal/Modal";

interface ModalDeleteShareLinkProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  filename?: string;
}

export const ModalDeleteShareLink = (props: ModalDeleteShareLinkProps) => {
  const { onClose, open, onClick, filename } = props;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={"Delete share link"}
      renderButtons={() => (
        <div className="flex space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button typeButton={EButtonType.WARNING} onClick={onClick}>
            Delete
          </Button>
        </div>
      )}
    >
      Do you really want to delete the selected {filename} share link (folder)?
    </Modal>
  );
};
