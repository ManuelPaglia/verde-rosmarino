import { Input } from "@nextui-org/react"

function VRInput({value, labelPlaceholder, onChange}) {
  return (
    <Input
    size="lg"
    color="success"
    value={value}
    labelPlaceholder={labelPlaceholder}
    clearable
    css={{ width: "100%" }}
    onChange={(e) => onChange(e)}
  />
  )
}

export default VRInput