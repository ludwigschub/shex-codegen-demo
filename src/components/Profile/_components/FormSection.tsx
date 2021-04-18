import React from "react";
import { TextInput, Text } from "@primer/components";
import styles from "./../Profile.module.css";

export interface FormSectionProps {
  label: string;
  name: string;
  defaultValue?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  name,
  label,
  placeholder,
  defaultValue,
  onChange,
}) => {
  return (
    <div className={styles.section}>
      <Text className={styles.label} fontWeight="bold">
        {label}
      </Text>
      <TextInput
        css=""
        name={name}
        placeholder={placeholder ?? label}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};
