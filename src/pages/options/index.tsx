import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";

import { BottomSheet, Divider, Header, Layout, Toast } from "components";
import { Menu, Option, OptionsCategory } from "types";
import { SelectedOptionsState } from "stores";
import { SelectedItem } from "./selectedItem";
import { Checkbox } from "./checkbox";
import { StoreApi } from "api";

import backImg from "assets/image/back-icon.png";

export default function Options() {
  const [menuInfo, setMenuInfo] = useState<Menu | undefined>(undefined);
  const [options, setOptions] = useState<OptionsCategory[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(SelectedOptionsState);

  const categoryRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const { id, menuId } = useParams();
  const navigate = useNavigate();

  const totalChoiceCount = options.reduce(
    (acc, cur) => acc + cur.choice_count,
    0
  );
  const isComplete = selectedCount >= totalChoiceCount ? true : false;

  useEffect(() => {
    const getMenuOptions = async () => {
      try {
        const menuData = await StoreApi.getOptions(id, menuId);

        if (menuData.result === "success") {
          setMenuInfo(menuData.menu_options);
          setOptions(menuData.menu_options.order_options);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.result === "error400") {
            alert("잘못된 주소입니다.");
          }
        }
      }
    };

    getMenuOptions();
  }, []);

  useEffect(() => {
    const checkedCount = Object.values(selectedOptions).reduce(
      (sum, currentArray) => sum + currentArray.length,
      0
    );

    if (checkedCount === 1 && !isSheetOpen && !isFirstOpen) {
      setIsSheetOpen(true);
      setIsFirstOpen(true);
    }

    setSelectedCount(checkedCount);
  }, [selectedOptions]);

  const HandleCheckChange = (
    options: Option,
    category: string,
    choiceCount: number
  ) => {
    const { name, id, price } = options;
    const currentSelectedOptions = selectedOptions[category] || [];

    setSelectedOptions((prevSelectedItem) => {
      const updatedSelectedItem = { ...prevSelectedItem };
      const isAlreadyChecked = currentSelectedOptions.some(
        (item) => item.id === id
      );
      const isDisabled = getSelectedCategory(id);

      // 선택 갯수 제한
      if (
        !isAlreadyChecked &&
        currentSelectedOptions.length >= choiceCount &&
        choiceCount !== 0
      ) {
        return prevSelectedItem;
      }

      // 다른 카테고리에서 체크된 경우
      if (isDisabled && !isAlreadyChecked) {
        return prevSelectedItem;
      }

      // 체크 on/off
      if (isAlreadyChecked) {
        updatedSelectedItem[category] = currentSelectedOptions.filter(
          (item) => item.name !== name
        );
      } else {
        updatedSelectedItem[category] = [
          ...currentSelectedOptions,
          {
            id: id,
            name: name,
            category: category,
            price: price,
            isChecked: true,
            isRequired: choiceCount > 0 ? true : false
          }
        ];
      }

      return updatedSelectedItem;
    });
  };

  const handleCompleteButtonClick = () => {
    const requiredCheckCount = Object.values(selectedOptions).reduce(
      (total, items) => {
        return total + items.filter((item) => item.isRequired).length;
      },
      0
    );

    if (requiredCheckCount < totalChoiceCount) {
      setIsToastOpen(true);
    } else {
      navigate(`/${id}/${menuId}/result`);
    }
  };

  const isChecked = (currentId: string) => {
    return Object.values(selectedOptions)
      .flat()
      .some((selected) => selected.id === currentId && selected.isChecked);
  };

  const getSelectedCategory = (id: string) => {
    const result = Object.entries(selectedOptions).find(([_, items]) =>
      items.some((item) => item.id === id)
    );

    return result ? result[0] : "";
  };

  return (
    <Layout>
      <Header
        title="뒤로가기"
        imageUrl={backImg}
        onClick={() => navigate(-1)}
      />
      <ImageWrapper>
        <img src={menuInfo?.image} />
      </ImageWrapper>
      <MenuInfoContainer>
        <p className="menu-name">{menuInfo?.name}</p>
        <p className="menu-description">{menuInfo?.description}</p>
        <p className="menu-price">{menuInfo?.price.toLocaleString()} 원</p>
      </MenuInfoContainer>
      {options &&
        options.map((option, idx) => (
          <OptionContainer key={idx}>
            <div
              className="category-name"
              ref={(element) => {
                if (categoryRef) {
                  categoryRef.current[option.category_name] = element;
                }
              }}
            >
              <p>
                {option.category_name}
                {option.choice_count === 0
                  ? ""
                  : ` (필수선택 ${option.choice_count} 개)`}
              </p>
            </div>
            {option.options.map((item, idx) => (
              <>
                <Checkbox
                  key={idx}
                  category={option.category_name}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  isChecked={isChecked(item.id)}
                  selectedCategory={getSelectedCategory(item.id)}
                  onChange={() =>
                    HandleCheckChange(
                      item,
                      option.category_name,
                      option.choice_count
                    )
                  }
                />
                {idx < option.options.length - 1 && <Divider />}
              </>
            ))}
          </OptionContainer>
        ))}
      <Wrapper>
        <BottomSheet isOpen={isSheetOpen} onClick={setIsSheetOpen}>
          <SelectedItem items={options} categoryRef={categoryRef} />
        </BottomSheet>
        <Button
          isComplete={isComplete}
          selectedCount={selectedCount}
          onClick={handleCompleteButtonClick}
        >
          {selectedCount === 0 ? "" : `(${selectedCount}개)`} 선택완료
        </Button>
        {isToastOpen && (
          <Toast message="필수선택을 확인해주세요 😊" onOpen={setIsToastOpen} />
        )}
      </Wrapper>
    </Layout>
  );
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 17rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuInfoContainer = styled.section`
  padding: 0.5rem;

  .menu-name {
    margin: 0.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  .menu-description {
    margin: 0.5rem 0;
    color: #707376;
  }

  .menu-price {
    margin: 0.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;

  .category-name {
    width: 21rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.4rem;
    background-color: #f7f7f9;

    p {
      color: #707376;
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: 700;
      text-align: center;
      line-height: 2.5rem;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

const Button = styled.button<{ isComplete: boolean; selectedCount: number }>`
  width: 96%;
  height: 3rem;
  margin: 0.5rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isComplete && props.selectedCount !== 0 ? "#0077c2" : "#efeff4"};
  color: ${(props) => (props.isComplete ? "#ffffff" : "#a3a9ad")};
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    cursor: pointer;
  }
`;
