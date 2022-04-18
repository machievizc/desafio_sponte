import { ErrorMessage } from "formik";
import styled from "styled-components";

interface Props {
  name: string;
}

const errorMessageToBeStyled = ({ className, ...props }: any) => (
  <ErrorMessage name={props.name}>
    {(msg: string) => <span className={className}>{msg}</span>}
  </ErrorMessage>
);

const StyledErrorMsg = styled(errorMessageToBeStyled)`
  font-size: 12px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export function StyledErrorMessage(props: Props) {
  return <StyledErrorMsg {...props} />;
}
