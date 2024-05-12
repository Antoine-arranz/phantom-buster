import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  return <div className='bg-main-bcg-color h-full'>{props.children}</div>;
}

export default Main;
