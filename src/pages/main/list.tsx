import { useNavigate } from "react-router";
import styled from "styled-components";

type ListProps = {
  key: number;
  id: string;
  name: string;
  image: string;
  review: number;
  tip: number;
};

export const List = ({ id, name, image, review, tip }: ListProps) => {
  const navigate = useNavigate();

  return (
    <ListWrapper onClick={() => navigate(`/${id}`)}>
      <img src={image} alt="store image" />
      <StoreInfoWrapper>
        <p className="name">{name}</p>
        <p className="review">⭐️ {review}</p>
        <p className="tip">
          배달비 {tip === 0 ? "무료" : `${tip.toLocaleString()} 원`}
        </p>
      </StoreInfoWrapper>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 22rem;
  height: 5rem;
  padding: 0 0.8rem;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 5.75rem;
    height: 5.75rem;
  }
`;

const StoreInfoWrapper = styled.div`
  margin: auto 1rem;

  .name {
    padding: 0.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 700;
  }

  .review {
    padding: 0.5rem 0;
  }

  .tip {
    padding: 0.15rem 0;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
