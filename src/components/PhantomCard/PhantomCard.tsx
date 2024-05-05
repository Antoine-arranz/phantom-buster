const PhantomCard = ({ phantomCard }: any) => {
  return (
    <div className='px-5 flex flex-col shadow-card p-3 rounded-1.5 w-full border hover:shadow-card h-[14.625rem] border-transparent'>
      <div className='h-2/5 mb-3 flex items-center justify-between'>
        <span>icon</span>
        <span>dropdown menu</span>
      </div>
      <div className='h-2/5 mb-3'>
        <span>{phantomCard.script}</span>
        <h2>{phantomCard.name}</h2>
      </div>
      <div className='h-2/5 flex items-center justify-between space-x-1 '>
        <div>toogle</div>
        <p>off</p>
        <p>{phantomCard.launchType}</p>
        <p>slot</p>
      </div>
    </div>
  );
};

export default PhantomCard;
