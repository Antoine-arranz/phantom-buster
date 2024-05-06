import NavigationLink from "../NavigationLink/NavigationLink";

function Navigation() {
  return (
    <div className='flex justify-between items-center flex-auto px-4'>
      <nav className='flex mr-auto border-l pl-4 border-divider gap-10'>
        <NavigationLink>Dashboard</NavigationLink>
        <NavigationLink>NavigationLinkedIn leads</NavigationLink>
        <NavigationLink>Solution</NavigationLink>
      </nav>
      <div className='flex items-center relative ml-auto gap-10'>
        <NavigationLink variant='borderBlue'>Upgrade</NavigationLink>
        <NavigationLink>02h00m</NavigationLink>
        <NavigationLink>What's new</NavigationLink>
        <NavigationLink>Resources</NavigationLink>
        <NavigationLink>Antoine</NavigationLink>
      </div>
    </div>
  );
}

export default Navigation;
