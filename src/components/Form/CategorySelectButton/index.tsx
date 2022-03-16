import { RectButtonProps } from "react-native-gesture-handler";
import { Category, Container, Icon } from "./styles";

interface IProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress, testID }: IProps) {
  return (
    <Container testID={testID} onPress={onPress}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Container>
  );
}
