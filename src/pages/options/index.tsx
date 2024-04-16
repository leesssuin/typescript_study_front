import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";

import { SelectedOptionsState } from "stores/options";
import { Menu, Option, OptionsCategory } from "types";
import { Divider, Header, Layout } from "components";
import { Checkbox } from "./checkbox";
import { StoreApi } from "api";

import backImg from "assets/image/back-icon.png";

export default function Options() {
  const [menuInfo, setMenuInfo] = useState<Menu | undefined>(undefined);
  const [options, setOptions] = useState<OptionsCategory[]>([]);
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(SelectedOptionsState);

  const { id, menuId } = useParams();
  const navigate = useNavigate();

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
            isChecked: true
          }
        ];
      }

      return updatedSelectedItem;
    });
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
            <div className="category-name">
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
