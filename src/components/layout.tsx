import { ReactNode } from "react";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <MainLayout>{children}</MainLayout>;
};

const MainLayout = styled.main`
  @media (min-width: 481px) {
    position: relative;
    max-width: 360px;
    height: 100vh;
    overflow: auto;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.color.white};
  }
`;
