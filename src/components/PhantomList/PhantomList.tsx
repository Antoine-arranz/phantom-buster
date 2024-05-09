import { Fragment } from "react/jsx-runtime";
import { IPhantoms } from "../../data/phantoms";
import PhantomCard from "../PhantomCard/PhantomCard";
import Button from "../Button/Button";
import { PhantomLogoSVG } from "../Logo/PhantomBuster";

interface PhantomListProps {
  phantoms: IPhantoms;
  handleDeletePhantom: (id: string) => void;
}

const PhantomList = ({ phantoms, handleDeletePhantom }: PhantomListProps) => {
  console.log("??", phantoms);
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
            handleDeletePhantom={handleDeletePhantom}
            key={index}
            phantom={phantom}
          />
        ))}
    </Fragment>
  );
};

export default PhantomList;
