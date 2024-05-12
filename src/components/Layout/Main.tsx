import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main = (props: MainProps) => {
  return <div className='bg-main-bcg-color '>{props.children}</div>;
};

export default Main;
