import React from "react";
import styled from "styled-components";
import { StyledErrorMessage } from "../ErrorMessage";

interface Props {
  name: string;
  type: string;
  as?: any;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const inputToBeStyled = ({ className, ...props }: any) => (
  <>
    <input className={className} {...props} />
    <StyledErrorMessage name={props.name} />
  </>
);

const StyledImageInput = styled(inputToBeStyled)`
  width: 100%;
  border-radius: 5px;
  padding: 0 8px;
  color: #0693e3;

  &:focus {
    outline: 1px solid #0693e3;
  }

  ::placeholder {
    color: #8ed1fc;
  }
`;

export function ImageInput(props: Props) {
  return <StyledImageInput {...props} />;
}
