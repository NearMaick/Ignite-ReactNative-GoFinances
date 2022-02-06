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
  LoadContainer,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

interface IDataListProps extends ITransactionCardProps {
  id: string;
}

interface IHighLightDataProps {
  amount: string;
}
interface IHighLightData {
  entries: IHighLightDataProps;
  expensive: IHighLightDataProps;
  total: IHighLightDataProps;
}

const dataKey = "@goFinances:transactions";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<IHighLightData>(
    {} as IHighLightData
  );

  const theme = useTheme();

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        if (item.type === "positive") entriesTotal += Number(item.amount);

        if (item.type === "negative") expensiveTotal += Number(item.amount);

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

    const total = entriesTotal - expensiveTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });

    setTransactions(transactionsFormatted);
    setIsLoading(false);
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
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              amount={highLightData.entries.amount}
              lastTransaction="Última entrada 13 de dezembro de 2021"
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highLightData.expensive.amount}
              lastTransaction="Última entrada 13 de dezembro de 2021"
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highLightData.total.amount}
              lastTransaction="De 11 à 25 dezembro de 2021"
            />
          </HighLightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
