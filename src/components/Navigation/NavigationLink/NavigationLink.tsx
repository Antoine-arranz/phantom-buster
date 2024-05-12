import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import path from "../../../router/path";

export interface NavigationLinkProps {
  children: ReactNode;
  link?: string;
  className: string;
}

const NavigationLink = ({ children, className }: NavigationLinkProps) => {
  return (
    <NavLink className={className} to={path.dashboard}>
      {children}
    </NavLink>
  );
};

export default NavigationLink;
