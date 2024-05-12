import { ReactNode, useEffect, useRef, useState } from "react";
import Toggle from "react-toggle";
import "./phantomCard.css";
import { IPhantom } from "../../../data/phantoms";
import Button from "../../Button/Button";
import { useClickOutside } from "../../../hooks/clickOutsideHook";
import { notifyError } from "../../../utils/notify";
import { Link } from "react-router-dom";
import clsx from "clsx";
import PhantomCardModal from "./PhantomCardModal/PhantomCardModal";
import PhantomCardDropdown from "./PhantomCardDropdown/PhantomCardDropdown";

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

  return (
    <div
      className={clsx(
        "bg-white px-5 flex flex-col shadow-md p-3 rounded-xl w-full hover:shadow-2xl h-[14.625rem]",
        className
      )}
    >
      <PhantomCardModal
        closeModal={closeModal}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        isModalOpen={isModalOpen}
        handleValidateRename={handleValidateRename}
      ></PhantomCardModal>
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
        <PhantomCardDropdown
          dropDownRef={dropDownRef}
          handleClickOnRename={handleClickOnRename}
          isToggleMenuOpen={isToggleMenuOpen}
          handleDuplicatePhantom={handleDuplicatePhantom}
          onDeletePhantom={onDeletePhantom}
          phantomId={phantom.id}
          toggleMenu={toggleMenu}
        />
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
