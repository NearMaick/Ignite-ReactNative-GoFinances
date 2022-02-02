import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export function TransactionCard() {
  return (
    <Container>
      <Title>Desenvolvimento de sites</Title>
      <Amount>R$12000</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>21/12/2021</Date>
      </Footer>
    </Container>
  );
}
