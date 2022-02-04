import { useState } from "react";
import { Button } from "../../components/Button";
import { CategorySelect } from "../../components/CategorySelect";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import {
  Container,
  Header,
  Title,
  Form,
  TransactionTypes,
  Fields,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => {
                handleTransactionsTypeSelect("up");
              }}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => {
                handleTransactionsTypeSelect("down");
              }}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>

          <CategorySelect title="Categoria" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
