import {
  Container,
  Header,
  Title,
  Footer,
  Amount,
  LastTransaction,
  Icon,
} from "./styles";

interface IProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

const ICON = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({
  title,
  amount,
  lastTransaction,
  type,
}: IProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={ICON[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
