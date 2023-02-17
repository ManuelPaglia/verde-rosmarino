import { Text, Spacer } from "@nextui-org/react";

function AccessHeader({ section }) {
  return (
    <div className="access-header">
      <Spacer y={1.5} />
      <Text h1 size={35}>
        Verde Rosmarino
      </Text>
      <Spacer y={1}></Spacer>
      <Text h1 size={30} color="success">
        {section}
      </Text>
    </div>
  );
}

export default AccessHeader;
