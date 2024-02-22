import React, { FC } from "react";

type DropdownProps = {
  selectedOption: MediaDeviceInfo;
  handleSelectOption: (option: React.ChangeEvent<HTMLSelectElement>) => void;
  title: string;
  selectOptions: MediaDeviceInfo[];
};
const DropDown: FC<DropdownProps> = ({
  selectedOption,
  handleSelectOption,
  title,
  selectOptions,
}) => {
  return (
    <div>
      <p>{title}</p>
      <select
        id="mic"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleSelectOption(e)
        }
        value={selectedOption?.deviceId}
      >
        {selectOptions.map((options, index) => (
          <option key={index} value={options?.deviceId}>
            {options?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
