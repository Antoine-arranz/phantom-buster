import { useEffect } from "react";
import { useApiHook } from "../../hooks/apiHook";
import { useParams } from "react-router-dom";
import PhantomCard from "../../components/PhantomCard/PhantomCard";

type PhantomDetailParams = {
  id: string;
};

const PhantomDetail = () => {
  const {
    phantom,
    getPhantomById,
    duplicatedPhantom,
    deletePhantom,
    renamePhantom,
    setPhantom,
  } = useApiHook();
  const params = useParams<PhantomDetailParams>();

  useEffect(() => {
    if (params.id) {
      getPhantomById(params.id).then((phantom) => setPhantom(phantom));
    }
  }, []);

  const onRenamePhantom = async (id: string, newName: string) => {
    await renamePhantom(id, newName);
    const phantom = await getPhantomById(id);
    setPhantom(phantom);
  };

  const onDeletePhantom = async (id: string) => {
    await deletePhantom(id);
    const phantom = await getPhantomById(id);
    setPhantom(phantom);
  };
  return (
    <div className='bg-bcg-primary  p-10 h-[calc(100vh-200px)]'>
      {phantom && (
        <PhantomCard
          className='mt-20'
          phantom={phantom}
          duplicatedPhantom={duplicatedPhantom}
          renamePhantom={onRenamePhantom}
          handleDeletePhantom={onDeletePhantom}
        ></PhantomCard>
      )}
    </div>
  );
};

export default PhantomDetail;
