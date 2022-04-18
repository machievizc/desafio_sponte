import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

interface Props {
  value: Date;
  name?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

function DatePickerToBeStyled({ className, ...props }: any) {
  const [startDate, setStartDate] = useState(new Date());
  const minDate = new Date(new Date().getMonth(), new Date().getDay());

  return (
    <>
      <div className={className}>
        <DatePicker
          {...props}
          minDate={minDate}
          maxDate={new Date()}
          className="date-picker"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
    </>
  );
}

const StyledDatePickerDiv = styled(DatePickerToBeStyled)`
  .react-datepicker-wrapper {
    width: 100px !important;
    input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #0693e3;
      padding: 0 8px;
      color: #0693e3;
      height: 30px;

      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: 1px solid #0693e3;
      }

      ::placeholder {
        color: #8ed1fc;
      }
    }
  }
`;

export function StyledDatePicker(props: Props) {
  return <StyledDatePickerDiv {...props} />;
}
