import styled from "styled-components";
import * as FaIcons from "react-icons/fa";

interface Props {
  type?: string;
  disabled?: boolean;
  children?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonToBeStyled = ({ className, ...props }: any) => (
  <i className={className} {...props}>
    {(() => {
      switch (props.children) {
        case "plus":
          return <FaIcons.FaPlus color={props.color} />;
        case "edit":
          return <FaIcons.FaPen color={props.color} />;
        case "delete":
          return <FaIcons.FaTrash color={props.color} />;
        default:
          <FaIcons.FaPlus color={props.color || "blue"} />;
          return null;
      }
    })()}
  </i>
);

const StyledButton = styled(buttonToBeStyled)`
  &:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    transform: scale(1.2);
  }
`;

export function IconButton(props: Props) {
  return <StyledButton {...props} />;
}
