import styled from "styled-components";
import { LoadingIcon } from "../LoadingIcon";

interface Props {
  type?: string;
  disabled?: boolean;
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonToBeStyled = ({ className, ...props }: any) => (
  <button className={className} {...props}>
    {!props.disabled && props.children}
    {props.disabled && <LoadingIcon />}
  </button>
);

const StyledButton = styled(buttonToBeStyled)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 1px solid #0693e3;
  border-radius: 5px;
  background-color: #0693e3;
  color: #fff;
  font-weight: bold;
  width: 100%;
  padding: 4px 8px;

  &:hover {
    ${(props) =>
      !props.disabled &&
      `color: #fff;
      background-color: #8ed1fc;
    cursor: pointer;`}
  }
`;

export function Button(props: Props) {
  return <StyledButton {...props} />;
}
