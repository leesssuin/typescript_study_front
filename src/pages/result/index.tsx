import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { SelectedMenuState, SelectedOptionsState } from "stores";
import { Divider, Header, Layout } from "components";

import backImg from "assets/image/back-icon.png";

export default function Result() {
  const selectedMenu = useRecoilValue(SelectedMenuState);
  const selectedOptions = useRecoilValue(SelectedOptionsState);

  const navigate = useNavigate();

  const selectedAllItems = Object.values(selectedOptions).flatMap(
    (category) => category
  );
  const totalPrice = selectedAllItems.reduce(
    (total, item) => total + item.price,
    selectedMenu.basePrice
  );

  return (
    <Layout>
      <Header
        title="뒤로가기"
        imageUrl={backImg}
        onClick={() => navigate(-1)}
      />
      <ResultContainer>
        <p className="menu-name">{selectedMenu.name}</p>
        {selectedMenu.image.length > 0 && (
          <img src={selectedMenu.image} alt="menu image" />
        )}
        <p className="price">
          가격: {selectedMenu.basePrice.toLocaleString()}원
        </p>
        <div>
          {Object.entries(selectedOptions).map(([category, options], idx) => (
            <OptionContainer key={idx}>
              <p className="category">{category}</p>
              <div className="option-container">
                {options.map((option, idx) => (
                  <Option key={idx} isRequired={option.isRequired}>
                    <span className="option-name">{option.name}</span>
                    {option.price > 0 && (
                      <span>(+ {option.price.toLocaleString()}원)</span>
                    )}
                  </Option>
                ))}
              </div>
            </OptionContainer>
          ))}
        </div>
      </ResultContainer>
      <Notice>결제금액을 확인해주세요</Notice>
      <TotalPriceContainer>
        <Wrapper>
          <p>결제금액</p>
          <p>{totalPrice.toLocaleString()} 원</p>
        </Wrapper>
        <Wrapper>
          <p>배달금액</p>
          <p>{selectedMenu.tip.toLocaleString()} 원</p>
        </Wrapper>
        <Divider />
        <Wrapper>
          <p>총 금액</p>
          <p>{(totalPrice + selectedMenu.tip).toLocaleString()} 원</p>
        </Wrapper>
      </TotalPriceContainer>
    </Layout>
  );
}

const ResultContainer = styled.section`
  width: 96%;
  margin: 1rem auto;
  padding: 0.8rem;
  border: 1px solid #cccccc;
  border-radius: 0.4rem;

  .menu-name {
    padding: 0.8rem 0;
    font-size: ${({ theme }) => theme.fontSize.base};
  }

  img {
    margin: 0.4rem 0;
    width: 5.75rem;
    border-radius: 0.35rem;
  }

  .price {
    padding: 0.4rem 0;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const OptionContainer = styled.div`
  display: flex;
  padding: 0.25rem 0;

  .category {
    width: 30%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 700;
  }

  .option-container {
    width: 70%;
  }
`;

const Option = styled.div<{ isRequired: boolean }>`
  color: ${(props) => (props.isRequired ? "#5c5c5c" : "#0077c2")};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1rem;
  word-break: keep-all;
`;

const Notice = styled.p`
  margin: auto 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const TotalPriceContainer = styled.div`
  width: 96%;
  margin: 1rem auto;
  padding: 0.8rem;
  border: 1px solid #cccccc;
  border-radius: 0.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`;
