import React, { Component } from 'react';
import { View, FlatList, Linking } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Body,
  Icon,
  Text,
  List,
  ListItem,
  Right,
  Form,
  Item,
  Label
} from 'native-base';
import PropTypes from 'prop-types';
import { getUserDetails } from '../../services/userDetails'
const propsTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
              fullName: PropTypes.string.isRequired,
              id: PropTypes.number.isRequired,
              chosenDate: PropTypes.string.isRequired,
              email: PropTypes.string.isRequired,
              userGit: PropTypes.string.isRequired
            })
        })
    })
}


class UserDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataRepo: {},
      fullData: {},
      search: ''
    }
    this.arrayholder = [];
  }

  async componentDidMount() {
    try {
      const dataRepo = await getUserDetails();
      this.setState({ dataRepo, fullData: dataRepo });
      console.log(dataRepo)
      this.arrayholder = dataRepo;
    } catch (error) {}
  }

  updateSearch = search => {
    this.setState({ search });
    if (search.length >= 3) {
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        dataRepo: newData,
      });
    } else {
      this.setState({
        dataRepo: this.state.fullData,
      });
    }

  };

  renderItem = ({ item }) => {
    return (
      <ListItem thumbnail>
        <Body>
          <Text>Repositorio: {item.name}</Text>
          <Text>Lenguaje: {item.language}</Text>
          <Text>Brach por Defecto: {item.default_branch}</Text>
          <Text>URL: {item.html_url}</Text>
          <View>
            <Text>Descripcion</Text>
            <Text note numberOfLines={1}>{item.description}</Text>
          </View>
        </Body>
        <Right>
          <Button transparent onPress={() => Linking.openURL(item.html_url)}>
            <Text>Ver Repositorio</Text>
          </Button>
        </Right>
      </ListItem>
    )
  }

  render() {
    const { navigation } = this.props;
    const { fullName, id, chosenDate, email, userGit } = navigation.state.params
    const { dataRepo, search } = this.state;

    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='FontAwesome' name='chevron-left' />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center" }}>Información</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>

        <View style={{ padding: 20}}>
          <Text>
            Nombre Completo: {fullName}
          </Text>
          <Text>
            Cédula: {id}
          </Text>
          <Text>
            Fecha de Nacimiento: {chosenDate}
          </Text>
          <Text>
            Correo Electronico: {email}
          </Text>
          <Text>
            Nombre Usuario Git: {userGit}
          </Text>
        </View>
        
        <View style={{ marginTop: 20 }}>
            <SearchBar
              placeholder="Filtrar aqui..."
              onChangeText={this.updateSearch}
              value={search}
              autoCorrect={false}
            />
        </View>
          <View style={{ marginTop: 10, flex: 4 }}>
            <List>
              <FlatList
                keyExtractor={(item, index) => String(index)}
                data={dataRepo}
                renderItem={this.renderItem}
              />
            </List>
          </View>
      </Container>
    );
  }
}

UserDetails.propTypes = propsTypes
export default UserDetails;
