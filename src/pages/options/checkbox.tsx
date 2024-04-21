import { ChangeEvent } from "react";
import styled from "styled-components";

type CheckBoxProps = {
  key: number;
  category: string;
  name: string;
  price: number;
  description: string;
  selectedCategory: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  category,
  name,
  price,
  description,
  selectedCategory,
  isChecked,
  onChange
}: CheckBoxProps) => {
  const isDisabled =
    selectedCategory && selectedCategory !== category ? true : false;

  return (
    <CheckBoxContainer htmlFor={`${category}-${name}`}>
      <Wrapper>
        <input
          id={`${category}-${name}`}
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
        />
        <p className="option-name">{name}</p>
      </Wrapper>
      <div>
        <Price color={isChecked && !isDisabled ? "#286be4" : "#707376"}>
          +{price.toLocaleString()}원
        </Price>
        <p className="description">{description}</p>
        {isDisabled && (
          <p className="selected-content">{selectedCategory}에서 선택됨</p>
        )}
      </div>
    </CheckBoxContainer>
  );
};

const CheckBoxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 21rem;
  height: 4.5rem;
  margin-bottom: 0.65rem;

  &:hover {
    cursor: pointer;
  }

  .option-name {
    padding-left: 0.15rem;
  }

  .selected-content {
    margin-top: 0.25rem;
    color: #707376;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 400;
  }

  .description {
    margin-top: 0.25rem;
    color: #286be4;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 400;
  }
`;

const Price = styled.p<{ color: string }>`
  color: ${(props) => props.color};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  text-align: end;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
