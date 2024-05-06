const PhantomCard = ({ phantomCard }: any) => {
  return (
    <div className='bg-bcg-white px-5 flex flex-col shadow-md p-3 rounded-xl w-full hover:shadow-2xl h-[14.625rem]'>
      <div className='h-2/5 mb-3 flex items-center justify-between hover:cursor-grab'>
        <span>icon</span>
        <span>dropdown menu</span>
      </div>
      <div className='h-2/5 mb-3 hover:cursor-pointer'>
        <span className='text-secondary-text'>{phantomCard.script}</span>
        <h2 className='font-bold text-xl'>{phantomCard.name}</h2>
      </div>
      <div className='h-2/5 flex items-center justify-between space-x-1 '>
        <div className='flex gap-10 text-secondary-text'>
          <div>toogle</div>
          <p>off</p>
          <p>{phantomCard.launchType}</p>
        </div>
        <p>slot</p>
      </div>
    </div>
  );
};

export default PhantomCard;
