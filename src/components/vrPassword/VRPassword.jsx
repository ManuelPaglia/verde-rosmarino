import { Input } from "@nextui-org/react";

function VRPassword({ value, labelPlaceholder, onChange }) {
  return (
    <Input.Password
      size="lg"
      clearable
      value={value}
      color="success"
      labelPlaceholder={labelPlaceholder}
      css={{ width: "100%" }}
      onChange={(e) => onChange(e)}
    />
  );
}

export default VRPassword;
