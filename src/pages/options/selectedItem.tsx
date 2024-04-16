import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { SelectedOptionsState } from "stores/options";
import { OptionsCategory } from "types";

interface SelectedItemProps {
  items: OptionsCategory[];
}

export const SelectedItem = ({ items }: SelectedItemProps) => {
  const selectedOptions = useRecoilValue(SelectedOptionsState);

  const renderItems = (item: OptionsCategory) => {
    const selectedItems = selectedOptions[item.category_name] || [];
    const isAdditionalOption = item.choice_count === 0;
    const emptyBoxCount = isAdditionalOption
      ? 1
      : item.choice_count - selectedItems.length;

    const selectedItem: JSX.Element[] = selectedItems.map((option, idx) => {
      return (
        <SelectedBox key={idx} isAdditionalOption={isAdditionalOption}>
          <span>{option.name}</span>
          {isAdditionalOption && (
            <span>(+{option.price.toLocaleString()})</span>
          )}
        </SelectedBox>
      );
    });

    const emptyItem: JSX.Element[] = Array.from({
      length: emptyBoxCount
    }).map((_, idx) => {
      return (
        <EmptyBox key={idx} isAdditionalOption={isAdditionalOption}>
          +
        </EmptyBox>
      );
    });

    return (
      <>
        {selectedItem}
        {emptyItem}
      </>
    );
  };

  return (
    <ContentContainer>
      {items.map((item, idx) => (
        <GroupWrapper key={idx}>
          <div>
            <p className="title">{item.category_name}</p>
          </div>
          <BoxWrapper>{renderItems(item)}</BoxWrapper>
        </GroupWrapper>
      ))}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  margin: 1.1rem 1.3rem;
`;

const GroupWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  padding: 0.24rem 0;

  .title {
    width: 2.5rem;
    margin-right: 2.5rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    white-space: nowrap;

    &:hover {
      cursor: pointer;
    }
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const EmptyBox = styled.div<{ isAdditionalOption: boolean }>`
  width: 5rem;
  height: 1.7rem;
  border: 1px dashed
    ${(props) => (props.isAdditionalOption ? "#dcdce1" : "#59a5f5")};
  border-radius: 1rem;
  background-color: #ffffff;
  color: ${(props) => (props.isAdditionalOption ? "#dcdce1" : "#59a5f5")};
  font-weight: 700;
  text-align: center;
  line-height: 1.8rem;
`;

const SelectedBox = styled.div<{ isAdditionalOption: boolean }>`
  width: auto;
  height: 1.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isAdditionalOption ? "#00619a" : "#59a5f5"};
  color: ${(props) => (props.isAdditionalOption ? "#f5f5f5" : "#c8ffff")};
  font-size: ${({ theme }) => theme.fontSize.md};
  text-align: center;
  line-height: 1.3rem;
`;
