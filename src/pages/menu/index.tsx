import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider, Header, Layout } from "components";
import { StoreInfo } from "types";
import { StoreApi } from "api";
import axios from "axios";

import backImg from "assets/image/back-icon.png";

export default function Menu() {
  const [store, setStore] = useState<StoreInfo | undefined>(undefined);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const storeInfo = await StoreApi.getStoreInfo(id);

        setStore(storeInfo.store_info);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.result === "error400") {
            alert("잘못된 주소입니다.");
          }
        }
      }
    };

    getInfo();
  }, [id]);

  return (
    <Layout>
      <Header
        title="뒤로가기"
        imageUrl={backImg}
        onClick={() => navigate(-1)}
      />
      <ImageWrapper>
        <img src={store?.image} />
      </ImageWrapper>
      <StoreInfoContainer>
        <p className="name">{store?.name}</p>
        <div className="wrapper">
          <p className="review">⭐️ {store?.review}</p>
          <p className="tip">
            배달비{" "}
            {store?.tip === 0 ? "무료" : `${store?.tip.toLocaleString()} 원`}
          </p>
        </div>
        <Divider />
      </StoreInfoContainer>
      <MenuContainer>
        <p className="title">인기메뉴</p>
        {store?.menu.map((item, idx) => (
          <>
            <MenuItem key={idx}>
              <div>
                <p className="name">{item.name}</p>
                <p className="description">{item.description}</p>
                <p className="price">{item.price.toLocaleString()} 원</p>
              </div>
              <div className="image-wrapper">
                <img src={item.image} />
              </div>
            </MenuItem>
            {idx < store?.menu.length - 1 && <Divider />}
          </>
        ))}
      </MenuContainer>
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

const StoreInfoContainer = styled.section`
  width: 100%;
  padding: 1rem 1rem;

  .name {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
  }
`;

const MenuContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 14px;
  padding: 0.5rem 1rem;

  .title {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    margin: 0.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.base};
  }

  .description {
    margin: 0.5rem 0;
    color: #707376;
  }

  .image-wrapper {
    width: 5.75rem;
    height: 5.75rem;

    img {
      width: 100%;
      border-radius: 0.35rem;
    }
  }
`;
