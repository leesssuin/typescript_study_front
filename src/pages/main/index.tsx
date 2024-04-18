import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider, Header, Layout } from "components";
import { StoreInfo } from "types";
import { StoreApi } from "api";
import { List } from "./list";

export default function Main() {
  const [stores, setStores] = useState<StoreInfo[]>([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await StoreApi.getStoreList();

        if (list.result === "success") {
          setStores(list.store_list);
        }
      } catch (err) {
        alert("문제가 생겼습니다. 잠시 후 다시 이용바랍니다.");
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
