import { Text } from "@nextui-org/react";

function AppHeader({ title, subtitle }) {
  return (
    <div className="app-header">
      <Text h2 color="success" size={32}>
        {title}
      </Text>
      <Text color="grey">{subtitle}</Text>
    </div>
  );
}

export default AppHeader;
