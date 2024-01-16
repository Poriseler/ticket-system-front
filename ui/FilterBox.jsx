import styled from "styled-components";

const Select = styled.select`
  padding: 2px 1px;
  border-radius: 6px;
  justify-self: flex-end;
`;
const Option = styled.option`
  padding: 2px 1px;
`;

function FilterBox({ options, handleChange }) {
  return (
    <Select onChange={(e) => handleChange(e.target.value)}>
      {options?.map((option) => {
        return (
          <Option key={option.value} label={option.label} value={option.value}>
            {option.label}
          </Option>
        );
      })}
    </Select>
  );
}

export default FilterBox;
