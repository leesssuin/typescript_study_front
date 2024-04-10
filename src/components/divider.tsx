import styled from "styled-components";

export const Divider = () => {
  return <Line />;
};

const Line = styled.div`
  width: 95%;
  height: 1px;
  margin: 0.25rem 0;
  background-color: #dcdce1;
`;
