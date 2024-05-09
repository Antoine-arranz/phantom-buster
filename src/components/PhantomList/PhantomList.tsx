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
  getPhantoms: (searchParams?: SearchParams | undefined) => void;
  deletePhantom: (id: string) => void;
  renamePhantom: (id: string, value: string) => void;
}

const PhantomList = ({
  phantoms,
  getPhantoms,
  deletePhantom,
  renamePhantom,
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

  const retrievePhantomsWithParams = async () => {
    const platformFilter = searchParams.get("Platforms");
    const searchFilter = searchParams.get(SEARCH_KEY);
    if (platformFilter || searchFilter) {
      await getPhantoms({ platform: platformFilter, search: searchFilter });
    } else {
      await getPhantoms();
    }
  };

  useEffect(() => {
    retrievePhantomsWithParams();
  }, [searchParams]);

  return (
    <Fragment>
      <div className='border-dashed border border-gray-500 text-center p-7 rounded-xl'>
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
            key={index}
            phantom={phantom}
          />
        ))}
    </Fragment>
  );
};

export default PhantomList;
