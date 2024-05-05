const PhantomCard = ({ phantomCard }: any) => {
  return (
    <div className='bg-white-500 border-2 border-black'>
      <div className='flex gap-2 bg-white-500'>
        <span>icon</span>
        <span>dropdown menu</span>
      </div>
      <div className='flex gap-2'>
        <span>{phantomCard.script}</span>
        <h2>{phantomCard.title}</h2>
      </div>
      <div className='flex gap-2'>
        <div>toogle</div>
        <p>off</p>
        <p>{phantomCard.launchType}</p>
        <p>slot</p>
      </div>
    </div>
  );
};

export default PhantomCard;
