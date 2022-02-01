import React from "react";
import {
  Container,
  Header,
  Title,
  Footer,
  Amount,
  LastTransaction,
  Icon,
} from "./styles";

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 17.200,00</Amount>
        <LastTransaction>Última entrada: 14 de abril</LastTransaction>
      </Footer>
    </Container>
  );
}
