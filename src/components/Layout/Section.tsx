import { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

function Section({ children }: SectionProps) {
  return <section className='max-w-3xl px-4 m-auto'> {children}</section>;
}

export default Section;
