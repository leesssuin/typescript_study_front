import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

type ToastProps = {
  message: string;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Toast = ({ message, onOpen }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [onOpen]);

  return (
    <Wrapper>
      <p>{message}</p>
    </Wrapper>
  );
};

const slideTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(-100px);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 2.1rem;
  width: 15rem;
  height: 2.5rem;
  padding: 0.8rem 1.3rem;
  border-radius: 0.4rem;
  background: rgba(114, 102, 102, 0.6);
  z-index: 1;
  animation: ${slideTop} 0.6s ease-out forwards;

  p {
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 1rem;
    text-align: center;
  }
`;
