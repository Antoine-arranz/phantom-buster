import Link from "../Link/Link";

function Navigation() {
  return (
    <div className='flex justify-between items-center flex-auto px-4'>
      <nav className='flex mr-auto border-l pl-4 border-divider gap-10'>
        <Link link={"dashboard"}>Dashboard</Link>
        <Link>LinkedIn leads</Link>
        <Link>Solution</Link>
      </nav>
      <div className='flex items-center relative ml-auto gap-10'>
        <Link variant='borderBlue'>Upgrade</Link>
        <Link>02h00m</Link>
        <Link>What's new</Link>
        <Link>Resources</Link>
        <Link>Antoine</Link>
      </div>
    </div>
  );
}

export default Navigation;
