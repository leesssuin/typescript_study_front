import { ReactNode } from "react";
import styled from "styled-components";

import upImage from "assets/image/up.png";
import downImage from "assets/image/down.png";

interface BottomSheetProps {
  isOpen: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const BottomSheet = ({
  isOpen,
  onClick,
  children
}: BottomSheetProps) => {
  return (
    <Wrapper>
      <BottomSheetHeader onClick={() => onClick(!isOpen)}>
        <img src={isOpen ? downImage : upImage} alt="button image" />
      </BottomSheetHeader>
      <BottomSheetContent isOpen={isOpen}>{children}</BottomSheetContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  border-radius: 1rem 1rem 0 0;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px -5px 16px 0px rgba(169, 169, 169, 0.1);

  &:hover {
    cursor: pointer;
  }
`;

const BottomSheetContent = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 100%;
  height: 9.5rem;
  max-height: ${(props) => (props.isOpen ? 9.5 : 0)}rem;
  overflow-y: scroll;
  transition: max-height 0.5s;
`;
