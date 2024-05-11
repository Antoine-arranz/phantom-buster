import { RefObject } from "react";
import Button from "../../../Button/Button";
import { MoreDotsSVG } from "../../../Logo/MoreDots";

interface PhantomCardDropdownProps {
  phantomId: string;
  toggleMenu: () => void;
  isToggleMenuOpen: boolean;
  dropDownRef: RefObject<HTMLDivElement>;
  handleClickOnRename: () => void;
  handleDuplicatePhantom: (id: string) => void;
  onDeletePhantom: (id: string) => void;
}

const PhantomCardDropdown = ({
  phantomId,
  toggleMenu,
  isToggleMenuOpen,
  dropDownRef,
  handleClickOnRename,
  handleDuplicatePhantom,
  onDeletePhantom,
}: PhantomCardDropdownProps) => {
  return (
    <span>
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
                <Button handleOnClick={() => handleDuplicatePhantom(phantomId)}>
                  Duplicate
                </Button>
              </li>

              <li>
                <Button handleOnClick={() => onDeletePhantom(phantomId)}>
                  Delete
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </span>
  );
};

export default PhantomCardDropdown;
