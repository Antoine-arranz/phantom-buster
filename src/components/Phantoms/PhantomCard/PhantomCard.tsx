import { ReactNode, useEffect, useRef, useState } from "react";
import { MoreDotsSVG } from "../../Logo/MoreDots";
import Toggle from "react-toggle";
import "./phantomCard.css";
import { IPhantom } from "../../../data/phantoms";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import { useClickOutside } from "../../../hooks/clickOutside";
import { notifyError } from "../../../utils/notify";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface PhantomCardProps {
  phantom: IPhantom;
  handleDeletePhantom: (id: string) => void;
  renamePhantom: (id: string, input: string) => void;
  duplicatedPhantom: (id: string) => void;
  className?: ReactNode;
}

const PhantomCard = ({
  phantom,
  handleDeletePhantom,
  renamePhantom,
  duplicatedPhantom,
  className,
}: PhantomCardProps) => {
  const [isToggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [timeRemain, setTimeRemain] = useState<number>(
    phantom.nextLaunchIn || 0
  );
  const [inputValue, setInputValue] = useState<string>(phantom.name);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropDownRef, () => closeDropDownMenu());

  const formatTimeRemain = (timeRemain: number) => {
    const hours = Math.floor(timeRemain / 3600);
    const minutes = Math.floor((timeRemain % 3600) / 60);
    const remainingSeconds = timeRemain % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timeRemain > 0) {
        setTimeRemain(timeRemain - 1);
      } else {
        if (phantom.nextLaunchIn) {
          setTimeRemain(phantom.nextLaunchIn);
        }
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timeRemain]);

  const toggleMenu = () => {
    setToggleMenuOpen(!isToggleMenuOpen);
  };

  const onDeletePhantom = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Phantom ?"
    );
    if (confirmDelete) {
      handleDeletePhantom(id);
    }
    setToggleMenuOpen(!isToggleMenuOpen);
  };
  const handleLaunchChange = () => {
    setIsLaunched(!isLaunched);
    setTimeRemain(phantom.nextLaunchIn || 0);
  };

  const handleClickOnRename = () => {
    setModalOpen(true);
    setToggleMenuOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setToggleMenuOpen(false);
  };

  const closeDropDownMenu = () => {
    setToggleMenuOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleValidateRename = async () => {
    if (inputValue) {
      renamePhantom(phantom.id, inputValue);
      setInputValue(inputValue);
      closeModal();
      return;
    }
    notifyError("Phantom name cannot be empty");
  };

  const handleDuplicatePhantom = async (id: string) => {
    duplicatedPhantom(id);
    setToggleMenuOpen(false);
  };
  const dropDownMenu = (
    <div className='relative'>
      <label tabIndex={0} className='' onClick={toggleMenu}>
        <MoreDotsSVG className='w-4 hover:cursor-pointer' />
      </label>
      {isToggleMenuOpen && (
        <div ref={dropDownRef}>
          <ul
            className='shadow-3xl absolute right-2 ml-4 p-4 rounded-md border-red flex flex-col gap-2'
            tabIndex={0}
          >
            <li>
              <Button handleOnClick={() => handleClickOnRename()}>
                Rename
              </Button>
            </li>
            <li>
              <Button handleOnClick={() => handleDuplicatePhantom(phantom.id)}>
                Duplicate
              </Button>
            </li>

            <li>
              <Button handleOnClick={() => onDeletePhantom(phantom.id)}>
                Delete
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  const modalView = (
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

  return (
    <div
      className={clsx(
        "bg-white px-5 flex flex-col shadow-md p-3 rounded-xl w-full hover:shadow-2xl h-[14.625rem]",
        className
      )}
    >
      {modalView}
      <div className='h-2/5 mb-3 flex items-center justify-between hover:cursor-grab'>
        <div className='flex sm:gap-5 flex-wrap'>
          {phantom.manifest.tags.categories.map((category) => (
            <Button
              key={category}
              className='border rounded-xl p-3 cursor-default text-primary font-bold'
            >
              {category}
            </Button>
          ))}
        </div>
        <span>{dropDownMenu}</span>
      </div>
      <Link
        to={`/phantom/${phantom.id}`}
        className='h-2/5 mb-3 hover:cursor-pointer'
      >
        <span className='text-secondary'>{phantom.script}</span>
        <h2 className='font-bold text-xl'>{phantom.name}</h2>
      </Link>
      <div className='h-2/5 flex items-center justify-between space-x-1 '>
        <div className='flex gap-5 text-secondary'>
          <Toggle
            className='toggle'
            defaultChecked={isLaunched}
            onChange={handleLaunchChange}
            icons={false}
            id='cheese-status'
          />
          <p className={` ${isLaunched ? "text-primary font-bold" : ""}`}>
            {isLaunched ? "on" : "off"}
          </p>
          <p>{phantom.launchType}</p>
          <p>
            {isLaunched && phantom.nextLaunchIn && formatTimeRemain(timeRemain)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhantomCard;
