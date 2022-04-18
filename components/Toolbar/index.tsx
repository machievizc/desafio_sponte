import styled from "styled-components";

interface Props {
  justifyContent: string;
  alignItems: string;
  children: React.ReactNode;
}

const divToBeStyled = ({ className, ...props }: any) => (
  <div className={className}>{props.children}</div>
);

const StyledDiv = styled(divToBeStyled)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};
  ${(props) => props.alignItems && `justify-content: ${props.alignItems}`};
`;

export function Toolbar(props: Props) {
  return <StyledDiv {...props} />;
}
