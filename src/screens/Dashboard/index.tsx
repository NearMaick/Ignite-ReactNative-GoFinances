import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import { HighLightCards } from "../../components/HighlightCard/styles";
import {
  TransactionCard,
  ITransactionCardProps,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutButton,
  Icon,
  Transactions,
  Title,
  TransactionList,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

interface IDataListProps extends ITransactionCardProps {
  id: string;
}

const dataKey = "@goFinances:transactions";

export function Dashboard() {
  const [data, setData] = useState<IDataListProps[]>([]);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setData(transactionsFormatted);
  }

  async function removeAll() {
    await AsyncStorage.removeItem(dataKey);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/nearmaick.png" }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Maick</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighLightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 12400"
          lastTransaction="Última entrada 13 de dezembro de 2021"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1500"
          lastTransaction="Última entrada 13 de dezembro de 2021"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16141"
          lastTransaction="De 11 à 25 dezembro de 2021"
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
