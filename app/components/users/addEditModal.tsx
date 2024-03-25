import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdEmail, MdLock } from "react-icons/md";
import { z, ZodError } from "zod";
import { addUser, updateUser } from "@/app/api/users/route";
import { toast } from "react-toastify";
import PNotify from "../PNotify";

interface User {
  id: number | string;
  email: string;
  password: string;
  summary?: string | null;
  name?: string | null;
}

interface AddEditModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: any) => void;
  currentEntry: User | null;
  onUpdateUser: (data: any) => void; // Define a more specific type for data
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onOpenChange,
  currentEntry,
  onUpdateUser,
}) => {

  // Define Zod schema for the form data
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: !currentEntry ? z.string().min(1, "Password is required") : z.string().optional(),
  });

  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password?: string;
  }>({
    name: currentEntry?.name ?? "",
    email: currentEntry?.email ?? "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleValueChange = (key: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data against the schema
      const validatedData = schema.parse(formData);

      setIsLoadingAction(true);
      const result = currentEntry
        ? await updateUser(currentEntry?.id, validatedData)
        : await addUser(validatedData);
      if (result && !result.error) {
        onUpdateUser(result.data);
        setIsLoadingAction(false);
        onOpenChange(false);
        return toast.success(
          <PNotify
            title="Success!"
            icon="fas fa-check"
            text={"User updated with success!"}
          />,
          {
            containerId: "bottom-right",
          },
        );
      } else {
        setFormErrors({ email: result?.message?.email ?? "Invalid error" });
        setIsLoadingAction(false);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        // Handle validation errors
        const errors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          const path = error.path.join(".");
          errors[path] = error.message;
        });
        setFormErrors(errors);
      } else {
        // Handle other errors
        console.error("Error updating user:", err);
        return toast.error(
          <PNotify
            title="Error!"
            icon="fas fa-check"
            text={"Failed to update user!"}
          />,
          {
            containerId: "bottom-right",
          },
        );
      }
      setIsLoadingAction(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Edit User {currentEntry?.name}
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              autoFocus
              endContent={
                <FaUser className="text-default-400 pointer-events-none flex-shrink-0 self-center text-xl" />
              }
              required
              label="Name"
              name="name"
              variant="bordered"
              isInvalid={!!formErrors["name"]}
              color={formErrors["name"] ? "danger" : "default"}
              errorMessage={formErrors["name"]}
              value={formData.name}
              onValueChange={(value) => handleValueChange("name", value)}
            />
            <Input
              endContent={
                <MdEmail className="text-default-400 pointer-events-none flex-shrink-0 self-center text-xl" />
              }
              required
              label="Email"
              name="email"
              variant="bordered"
              isInvalid={!!formErrors["email"]}
              color={formErrors["email"] ? "danger" : "default"}
              errorMessage={formErrors["email"]}
              value={formData.email}
              onValueChange={(value) => handleValueChange("email", value)}
            />
            {!currentEntry && (
              <Input
                endContent={
                  <MdLock className="text-default-400 pointer-events-none flex-shrink-0 self-center text-xl" />
                }
                required
                type="password"
                label="Password"
                name="password"
                variant="bordered"
                isInvalid={!!formErrors["password"]}
                color={formErrors["password"] ? "danger" : "default"}
                errorMessage={formErrors["password"]}
                value={formData.password}
                onValueChange={(value) => handleValueChange("password", value)}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Close
            </Button>
            <Button isLoading={isLoadingAction} color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditModal;
