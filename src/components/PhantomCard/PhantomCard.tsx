import { useState } from "react";
import { MoreDotsSVG } from "../Logo/MoreDots";
import Toggle from "react-toggle";
import "./phantomCard.css";

const PhantomCard = ({ phantomCard }: any) => {
  const [isToggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const toggleMenu = () => {
    setToggleMenuOpen(!isToggleMenuOpen);
  };

  const handleLaunchChange = () => {
    setIsLaunched(!isLaunched);
  };

  const categoriesText = phantomCard.manifest.tags.categories.map(
    (category, index) => {
      console.log("ici ?????");
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
          className='absolute right-2 ml-4 p-3 rounded-md border-red shadow-xl flex flex-col
          gap-2'
          tabIndex={0}
        >
          <li>
            <button data-testid='dropDownMenu-rename'>Rename</button>
          </li>
          <li>
            <label data-testid='dropDownMenu-duplicate'>Duplicate</label>
          </li>

          <li>
            <label data-testid='dropDownMenu-delete' className=' text-error '>
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
        <div className='flex gap-10 text-secondary-text'>
          <Toggle
            className='toggle'
            defaultChecked={isLaunched}
            onChange={handleLaunchChange}
            icons={false}
            id='cheese-status'
          />
          <p>{isLaunched ? "on" : "off"}</p>
          <p>{phantomCard.launchType}</p>
        </div>
        <p>slot</p>
      </div>
    </div>
  );
};

export default PhantomCard;
