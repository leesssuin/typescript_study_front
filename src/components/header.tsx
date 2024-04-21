import styled from "styled-components";

type HeaderProps = {
  title: string;
  imageUrl?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const Header = ({ title, imageUrl, onClick }: HeaderProps) => {
  return (
    <HeaderWrapper>
      {imageUrl && (
        <div className="image-wrapper" onClick={onClick}>
          <img src={imageUrl} alt="icon image" />
        </div>
      )}
      <p>{title}</p>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 0.5rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;

  .image-wrapper {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%:
    }

    &:hover {
      cursor: pointer;
    }
  }
`;
