import styled from "styled-components";
import { TabItem } from "../TabItem";

interface Props {
  setTab: (tab: string) => void;
}

const TabListToBeStyled = ({ className, ...props }: any) => (
  <>
    <div className={className}>
      <ul>
        <TabItem
          onClick={() => props.setTab("product-list")}
          children="Produtos"
        />
        <TabItem
          onClick={() => props.setTab("add-product")}
          children="Cadastrar"
        />
      </ul>
    </div>
  </>
);

const StyledTabs = styled(TabListToBeStyled)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  ul {
    list-style: none;
    display: inline-flex;
    gap: 8px;
  }
`;

export function MenuTabs(props: Props) {
  return <StyledTabs {...props} />;
}
