import React, { FC, ReactNode } from 'react';
import Header from './Header';
interface LayoutProps {
  isHomePage?: boolean;
  isDark?: boolean;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({
  isHomePage = true,
  children,
  isDark = false,
}) => {
  return (
    <div
      className="page-content dark:bg-bg-dark"
      data-is-root-path={isHomePage}
    >
      <Header />
      <div className="global-wrapper">
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
