import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  return <div className='bg-background-color h-full'>{props.children}</div>;
}

export default Main;
