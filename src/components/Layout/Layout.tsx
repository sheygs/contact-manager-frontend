import { ReactNode } from 'react';
import { NavBar } from '../NavBar';

interface Props {
  navbar: boolean;
  children: ReactNode;
}

export const Layout = ({ navbar = true, children }: Props): JSX.Element => {
  return (
    <>
      {navbar && <NavBar />}
      <div className="container">{children}</div>
    </>
  );
};
