import Button from "../../../Button/Button";
import Modal from "../../../Modal/Modal";

interface PhantomCardModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidateRename?: () => void;
}

const PhantomCardModal = ({
  isModalOpen,
  closeModal,
  inputValue,
  handleInputChange,
  handleValidateRename,
}: PhantomCardModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      close={closeModal}
      title='Edit Phantom name'
      content='Phantom'
    >
      <input
        className='rounded-1.5 w-full text-body-primary font-medium px-2 py-1.5 border-2 border-primary '
        type='text'
        value={inputValue}
        name='modal'
        onChange={handleInputChange}
      />
      <div className='flex justify-end mt-4 border-1'>
        <Button
          handleOnClick={closeModal}
          className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400'
        >
          Cancel
        </Button>
        <Button
          handleOnClick={handleValidateRename}
          className='ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default PhantomCardModal;
