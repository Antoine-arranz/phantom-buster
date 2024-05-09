import { Fragment } from "react/jsx-runtime";
import { IPhantoms } from "../../data/phantoms";
import PhantomCard from "../PhantomCard/PhantomCard";
import Button from "../Button/Button";
import { PhantomLogoSVG } from "../Logo/PhantomBuster";
import { useSearchParams } from "react-router-dom";
import { SEARCH_KEY } from "../SearchBar/SearchBar";
import { useEffect } from "react";
import { SearchParams } from "../../interfaces/searchParams";

interface PhantomListProps {
  phantoms: IPhantoms;
  getPhantoms: (searchParams?: SearchParams) => Promise<IPhantoms>;
  deletePhantom: (id: string) => Promise<void>;
  renamePhantom: (id: string, value: string) => Promise<void>;
  duplicatedPhantom: (id: string) => Promise<void>;
  setPhantoms: React.Dispatch<React.SetStateAction<IPhantoms | undefined>>;
}

const PhantomList = ({
  phantoms,
  getPhantoms,
  deletePhantom,
  renamePhantom,
  duplicatedPhantom,
  setPhantoms,
}: PhantomListProps) => {
  const [searchParams] = useSearchParams();

  const onDeletePhantom = async (id: string) => {
    await deletePhantom(id);
    await retrievePhantomsWithParams();
  };

  const onRenamePhantom = async (id: string, value: string) => {
    await renamePhantom(id, value);
    await retrievePhantomsWithParams();
  };

  const onDuplicatePhantom = async (id: string) => {
    await duplicatedPhantom(id);
    await retrievePhantomsWithParams();
  };
  const retrievePhantomsWithParams = async () => {
    const platformFilter = searchParams.get("Platforms");
    const searchFilter = searchParams.get(SEARCH_KEY);
    if (platformFilter || searchFilter) {
      const phantoms = await getPhantoms({
        platform: platformFilter,
        search: searchFilter,
      });
      if (phantoms) {
        setPhantoms(phantoms);
      }
    } else {
      const phantoms = await getPhantoms();
      setPhantoms(phantoms);
    }
  };

  useEffect(() => {
    retrievePhantomsWithParams();
  }, [searchParams]);

  return (
    <Fragment>
      <div className='mt-4 border-dashed border border-gray-500 text-center p-7 rounded-xl'>
        <PhantomLogoSVG className='m-auto' size={50}></PhantomLogoSVG>

        <Button className=' flex m-auto mt-4 px-2 py-1 text-white  bg-bcg-filter rounded-md hover:bg-bcg-filter-hover'>
          Use a new Phantom
        </Button>
      </div>
      {phantoms &&
        phantoms.map((phantom, index) => (
          <PhantomCard
            renamePhantom={onRenamePhantom}
            handleDeletePhantom={onDeletePhantom}
            duplicatedPhantom={onDuplicatePhantom}
            key={index}
            phantom={phantom}
          />
        ))}
    </Fragment>
  );
};

export default PhantomList;
