import { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

function Section({ children }: SectionProps) {
  return <section className='max-w-7xl px-5 py-10 m-auto'> {children}</section>;
}

export default Section;
