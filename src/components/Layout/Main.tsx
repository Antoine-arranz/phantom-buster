import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  return <div>{props.children}</div>;
}

export default Main;
