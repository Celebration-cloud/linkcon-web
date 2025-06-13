/* eslint-disable prettier/prettier */
"use client";

import { InputNumber } from "primereact/inputnumber";

export const IncrementButton = ({ value, setValue }) => (
  <InputNumber
    showButtons
    className="bg-inherit"
    decrementButtonClassName="bg-red-500"
    incrementButtonClassName="bg-green-500"
    inputClassName="w-14 h-10 border-2 pl-2 bg-inherit"
    inputId="minmax-buttons"
    max={100}
    min={1}
    mode="decimal"
    value={value}
    onValueChange={(e) => setValue(e.value)}
  />
);
