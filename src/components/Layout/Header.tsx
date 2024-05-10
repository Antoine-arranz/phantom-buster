import { Link } from "react-router-dom";
import { PhantomLogoSVG } from "../Logo/PhantomBuster";
import Navigation from "../Navigation/Navigation";
import path from "../../router/path";
function Header() {
  return (
    <header className='bg-base '>
      <div className='flex w-screen px-10 py-5 text-lg items-center py-text-body-primary h-20 '>
        <Link to={path.dashboard}>
          <PhantomLogoSVG />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
