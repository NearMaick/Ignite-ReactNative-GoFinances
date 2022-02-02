import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface IProps extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const ICONS = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: IProps) {
  return (
    <Container isActive={isActive} type={type} {...rest}>
      <Icon name={ICONS[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
