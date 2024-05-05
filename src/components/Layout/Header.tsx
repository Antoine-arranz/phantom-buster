import { PhantomLogoSVG } from "../Logo/PhantomBuster";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className='bg-base '>
      <div className='flex w-screen px-10 py-5 text-lg items-center py-text-body-primary h-20 '>
        <PhantomLogoSVG />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
