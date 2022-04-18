import React from "react";
import styled from "styled-components";
import { Field } from "formik";
import { StyledErrorMessage } from "../ErrorMessage";

interface Props {
  name: string;
  type: string;
  disabled?: boolean;
  as?: any;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function handleTextInput(type: string) {
  switch (type) {
    case "textarea":
      return "min-height: 132px; resize: vertical;";
    default:
      return "height: 32px;";
  }
}

const inputToBeStyled = ({ className, ...props }: any) => (
  <>
    <Field
      as={props.as || "input"}
      className={className}
      {...props}
    ></Field>
    <StyledErrorMessage {...props} />
  </>
);

const StyledInput = styled(inputToBeStyled)`
  ${(props: Props) => handleTextInput(props.as)}
  width: 100%;
  border-radius: 5px;
  border: 1px solid #0693e3;
  padding: 0 8px;
  color: #0693e3;

  &:focus {
    outline: 1px solid #0693e3;
  }

  ::placeholder {
    color: #8ed1fc;
  }
`;

export function Input(props: Props) {
  return <StyledInput {...props} />;
}
