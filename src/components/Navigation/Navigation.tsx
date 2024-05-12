import NavigationLink from "./NavigationLink/NavigationLink";

const Navigation = () => {
  return (
    <div className='flex justify-between items-center flex-auto px-4'>
      <nav className='flex mr-auto border-l pl-4 border-divider gap-10 justify-center'>
        <NavigationLink className='text-primary font-bold'>
          Dashboard
        </NavigationLink>
      </nav>
    </div>
  );
};

export default Navigation;
