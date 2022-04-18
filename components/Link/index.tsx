import { Link as Href } from "react-router-dom";
import styled from "styled-components";

interface Props {
  children: any; //pode ser desde um string até um componente ou div
  to: string;
}

const linkToBeStyled = ({ className, ...props }: any) => (
  <Href className={className} {...props} />
);

const StyledLink = styled(linkToBeStyled)`
  font-size: 14px;
  color: #0693e3;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #8ed1fc;
  }
`;

export function Link(props: Props) {
  return <StyledLink {...props} />;
}
