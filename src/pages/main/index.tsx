import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Divider, Header, Layout } from "components";
import { RESULT_MESSAGE } from "const";
import { StoreInfo } from "types";
import { StoreApi } from "api";
import { List } from "./list";

export default function Main() {
  const [stores, setStores] = useState<StoreInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await StoreApi.getStoreList();

        if (list.result === RESULT_MESSAGE.SUCCESS) {
          setStores(list.store_list);
        }
      } catch (err) {
        navigate("/error");
      }
    };

    getList();
  }, []);

  return (
    <Layout>
      <Header title="마라탕" />
      <ListContainer>
        {stores.map((store, idx) => (
          <>
            <List
              key={idx}
              id={store._id}
              name={store.name}
              image={store.image}
              review={store.review}
              tip={store.tip}
            />
            {idx < stores.length - 1 && <Divider />}
          </>
        ))}
      </ListContainer>
    </Layout>
  );
}

const ListContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
  padding: 0 1rem;
`;
