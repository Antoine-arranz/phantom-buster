import { useState } from "react";
import { MoreDotsSVG } from "../Logo/MoreDots";
import Toggle from "react-toggle";
import "./phantomCard.css";
import { IPhantoms } from "../../data/phantoms";

interface PhantomCardProps {
  phantomCard: IPhantoms;
  handleDeletePhantom: (id: string) => void;
}

const PhantomCard = ({
  phantomCard,
  handleDeletePhantom,
}: PhantomCardProps) => {
  const [isToggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
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
  };
  const categoriesText = phantomCard.manifest.tags.categories.map(
    (category, index) => {
      const delimiter =
        index < phantomCard.manifest.tags.categories.length - 1 ? " " : "";
      return category + delimiter;
    }
  );

  const dropDownMenu = (
    <div className='relative'>
      <label
        data-testid='dropDownMenu'
        tabIndex={0}
        className=''
        onClick={toggleMenu}
      >
        <MoreDotsSVG className='w-4 hover:cursor-pointer' />
      </label>
      {isToggleMenuOpen && (
        <ul
          className='shadow-3xl absolute right-2 ml-4 p-4 rounded-md border-red flex flex-col gap-2'
          tabIndex={0}
        >
          <li>
            <button data-testid='dropDownMenu-rename'>Rename</button>
          </li>
          <li>
            <label data-testid='dropDownMenu-duplicate'>Duplicate</label>
          </li>

          <li>
            <label
              data-testid='dropDownMenu-delete'
              onClick={() => onDeletePhantom(phantomCard.id)}
              className=' text-error '
            >
              Delete
            </label>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <div className='bg-bcg-white px-5 flex flex-col shadow-md p-3 rounded-xl w-full hover:shadow-2xl h-[14.625rem]'>
      <div className='h-2/5 mb-3 flex items-center justify-between hover:cursor-grab'>
        <h2>{categoriesText}</h2>
        <span>{dropDownMenu}</span>
      </div>
      <div className='h-2/5 mb-3 hover:cursor-pointer'>
        <span className='text-secondary-text'>{phantomCard.script}</span>
        <h2 className='font-bold text-xl'>{phantomCard.name}</h2>
      </div>
      <div className='h-2/5 flex items-center justify-between space-x-1 '>
        <div className='flex gap-5 text-secondary-text'>
          <Toggle
            className='toggle'
            defaultChecked={isLaunched}
            onChange={handleLaunchChange}
            icons={false}
            id='cheese-status'
          />
          <p className={` ${isLaunched ? "text-bcg-filter font-bold" : ""}`}>
            {isLaunched ? "on" : "off"}
          </p>
          <p>{phantomCard.launchType}</p>
        </div>
        <p>slot</p>
      </div>
    </div>
  );
};

export default PhantomCard;
