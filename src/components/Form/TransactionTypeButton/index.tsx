import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";

interface IProps extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
  onPress: () => void;
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
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={ICONS[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
