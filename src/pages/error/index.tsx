import { Layout } from "components";
import styled from "styled-components";

import errorImage from "assets/image/error.png";
import { useNavigate } from "react-router-dom";

type ErrorProps = {
  message?: string;
};

export default function Error({ message }: ErrorProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <ContentContainer>
        <img src={errorImage} alt="error image" />
        <p>{message}</p>
        <button onClick={() => navigate("/")}>돌아가기</button>
      </ContentContainer>
    </Layout>
  );
}

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;

  img {
    width: 20rem;
    height: 20rem;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 700;
    text-align: center;
    word-break: keep-all;
  }

  button {
    width: 7rem;
    height: 2rem;
    background-color: #0077c2;
    color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: 0.4rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
