import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  return <div className='bg-bcg-primary h-full'>{props.children}</div>;
}

export default Main;
