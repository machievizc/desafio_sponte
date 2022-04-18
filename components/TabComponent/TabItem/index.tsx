import styled from "styled-components";

interface Props {
  children?: string;
  onClick: () => void;
}

const ItemToBeStyled = ({ className, ...props }: any) => (
  <>
    <li className={className}>
      <button {...props}>{props.children}</button>
    </li>
  </>
);

const StyledTabItem = styled(ItemToBeStyled)`
  button {
    font-size: 16px;
    font-weight: bold;
    color: #0693e3;
    padding: 2px 18px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export function TabItem(props: Props) {
  return <StyledTabItem {...props} />;
}
