import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import { api } from '../../services/api';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Title,
  Tab,
  Tabs,
  Button,
  Card,
  CardItem,
} from 'native-base';

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    leagues: [],
    time: []
  };

  async componentDidMount() {
    try {
      const response = await api.get('/auth/ligas');
      const responseTeamInfo = await api.get('/auth/time')

      console.log(response.data);
      this.setState({ leagues: response.data.ligas, time: responseTeamInfo.data.time });
    } catch (_err) {
      console.log(_err);
    }
  }

  renderLeagues = () => (
    this.state.leagues.map(league => {
      return (
        <ListItem
          avatar
          key={league.liga_id}
          onPress={() => {
            this.props.navigation.push('DadosLiga', { slug: league.slug })
          }
          }>
          <Left>
            <Thumbnail source={{ uri: league.url_flamula_png }} />
          </Left>
          <Body>
            <Text>{league.nome}</Text>
            <Text note>{league.descricao}</Text>
          </Body>
        </ListItem>
      )
    })
  )

  render() {
    return (
      <Container>
        <Header style={styles.cabecalho} hasTabs>
          <Left />
          <Body>
            <Title style={styles.cabecalhoTexto}>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff' }}>
          <Tab heading="Minhas Ligas"
            tabStyle={{ backgroundColor: '#e3672a' }}
            textStyle={{ color: '#fff' }}
            activeTabStyle={{ backgroundColor: '#e3672a' }}
            activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}
          >
            <Content>
              <List>
                {this.renderLeagues()}
              </List>
            </Content>
          </Tab>
          <Tab heading="Meu Time"
            tabStyle={{ backgroundColor: '#e3672a' }}
            textStyle={{ color: '#fff' }}
            activeTabStyle={{ backgroundColor: '#e3672a' }}
            activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}>
            <Content>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: this.state.time.foto_perfil }} />
                    <Body>
                      <Text>{this.state.time.nome}</Text>
                      <Text note>{this.state.time.nome_cartola}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Thumbnail source={{ uri: this.state.time.url_camisa_png }} style={{height: 400, width: 400, flex: 1}} />
                </CardItem>
                <CardItem>
                  <Left>
                    <Text note>Últ. pontuação</Text>
                    <Text>89.99</Text>
                  </Left>
                  <Body />
                  <Right>
                    <Text note>Patrimônio</Text>
                    <Text>C$ 136,27</Text>
                  </Right>
                </CardItem>
              </Card>
              <Button danger block style={styles.buttonLogout}>
                <Text>Sair!</Text>
              </Button>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: '#e3672a',
  },
  cabecalhoTexto: {
    color: '#fff',
  },
  buttonLogout: {
    margin: 5
  },
})
