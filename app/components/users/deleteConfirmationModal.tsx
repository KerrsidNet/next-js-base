import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import PNotify from "../PNotify";
import { FaTrash } from "react-icons/fa6";
import { deleteUser } from "@/app/dashboard/users/userService";

interface User {
  id: number | string;
  email: string;
  summary?: string | null;
  name?: string | null;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: (id: any) => void;
  onClose: () => void;
  currentEntry: User | null;
}

const DeleteConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  currentEntry,
}) => {
  const handleDelete = async () => {
    const result = await deleteUser(currentEntry?.id);
    if (result && !result?.error) {
      toast.success(
        <PNotify
          title="Success!"
          text={"User has been deleted with success!"}
        />,
        {
          containerId: "bottom-right",
          icon: <FaTrash />,
        },
      );
      onConfirm(result.message);
    } else {
      toast.error(<PNotify title="Error!" text={result.message} />, {
        containerId: "bottom-right",
        icon: <FaTrash />,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Delete user {currentEntry?.name}</ModalHeader>
        <ModalBody>Are you sure you want to delete this entry?</ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
