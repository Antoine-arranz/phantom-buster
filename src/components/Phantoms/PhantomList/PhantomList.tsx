import { Fragment } from "react/jsx-runtime";
import { IPhantoms } from "../../../data/phantoms";
import PhantomCard from "../PhantomCard/PhantomCard";
import Button from "../../Button/Button";
import { PhantomLogoSVG } from "../../Logo/PhantomBuster";
import { SearchParams } from "../../../interfaces/searchParams";
import { notifyError } from "../../../utils/notify";
import PhantomNotFound from "../PhantomNotFound/PhantomNotFound";

interface PhantomListProps {
  phantoms: IPhantoms;
  getPhantoms: (searchParams?: SearchParams) => Promise<void>;
  deletePhantom: (id: string) => Promise<void>;
  renamePhantom: (id: string, value: string) => Promise<void>;
  duplicatedPhantom: (id: string) => Promise<void>;
}

const PhantomList = ({
  phantoms,
  getPhantoms,
  deletePhantom,
  renamePhantom,
  duplicatedPhantom,
}: PhantomListProps) => {
  const onDeletePhantom = async (id: string) => {
    await deletePhantom(id);
    await getPhantoms();
  };

  const onRenamePhantom = async (id: string, value: string) => {
    await renamePhantom(id, value);
    await getPhantoms();
  };

  const onDuplicatePhantom = async (id: string) => {
    await duplicatedPhantom(id);
    await getPhantoms();
  };

  return (
    <Fragment>
      <div className='mt-4 border-dashed border border-gray-500 text-center p-7 rounded-xl'>
        <PhantomLogoSVG className='m-auto' size={50}></PhantomLogoSVG>

        <Button
          handleOnClick={() => notifyError("Working progress")}
          className=' flex m-auto mt-4 px-2 py-1 text-white  bg-primary rounded-md hover:bg-filter-hover'
        >
          Use a new Phantom
        </Button>
      </div>
      {phantoms && phantoms.length ? (
        phantoms.map((phantom, index) => (
          <PhantomCard
            renamePhantom={onRenamePhantom}
            handleDeletePhantom={onDeletePhantom}
            duplicatedPhantom={onDuplicatePhantom}
            key={index}
            phantom={phantom}
          />
        ))
      ) : (
        <PhantomNotFound
          message={"No phantom found change filter or add a new one"}
        />
      )}
    </Fragment>
  );
};

export default PhantomList;
