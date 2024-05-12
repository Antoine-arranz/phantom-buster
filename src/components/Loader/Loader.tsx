const Loader = () => {
  return (
    <div
      className='inline-block h-10 w-10 animate-spin rounded-full border-[4px] border-current border-t-transparent text-primary '
      role='status'
      aria-label='loading'
    />
  );
};

export default Loader;
