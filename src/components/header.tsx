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
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;

  .image-wrapper {
    margin-right: 10px;

    &:hover {
      cursor: pointer;
    }
  }
`;
