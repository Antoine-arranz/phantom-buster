import { useEffect } from "react";
import { usePhantomsApi } from "../../hooks/phantomsApiHook";
import { useParams } from "react-router-dom";
import PhantomCard from "../../components/Phantoms/PhantomCard/PhantomCard";
import PhantomNotFound from "../../components/Phantoms/PhantomNotFound/PhantomNotFound";
import Loader from "../../components/Loader/Loader";

type PhantomDetailParams = {
  id: string;
};

const PhantomDetail = () => {
  const {
    phantom,
    loading,
    getPhantomById,
    duplicatedPhantom,
    deletePhantom,
    renamePhantom,
  } = usePhantomsApi();
  const params = useParams<PhantomDetailParams>();

  useEffect(() => {
    if (params.id) {
      getPhantomById(params.id);
    }
  }, []);

  const onRenamePhantom = async (id: string, newName: string) => {
    await renamePhantom(id, newName);
    await getPhantomById(id);
  };

  const onDeletePhantom = async (id: string) => {
    await deletePhantom(id);
    await getPhantomById(id);
  };
  return (
    <div className='bg-main-bcg-color  p-10 h-[calc(100vh-200px)]'>
      {loading ? (
        <Loader />
      ) : phantom ? (
        <PhantomCard
          className='mt-20'
          phantom={phantom}
          duplicatedPhantom={duplicatedPhantom}
          renamePhantom={onRenamePhantom}
          handleDeletePhantom={onDeletePhantom}
        ></PhantomCard>
      ) : (
        <PhantomNotFound message='Phantom not found' linkToDashboard />
      )}
    </div>
  );
};

export default PhantomDetail;
