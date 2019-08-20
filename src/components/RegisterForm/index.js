import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Body,
    Form,
    Item,
    Input,
    Text,
    Icon,
    Label,
    DatePicker
} from 'native-base';
import Style from './styles'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: 'Elberth',
            id: '23213',
            chosenDate: '15/06/2018',
            email: 'elberth13@gmail.com',
            userGit: 'zhock',
            errors: {
                fullName: false,
                id: false,
                chosenDate: false,
                email: false
            }
        }
        this.setDate = this.setDate.bind(this);
    }
    
    _storeData = async () => {
        const dataUser = {
            fullName: this.state.fullName,
            id: this.state.id,
            chosenDate: this.state.chosenDate,
            email: this.state.email,
            userGit: this.state.userGit
        };
        try {
          await AsyncStorage.setItem('@usuario', JSON.stringify(dataUser));
        } catch (error) {
          console.log('error al guardar usuario');
        }
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate.toString().substr(4, 12) });
    }

    setfullName(fullName) {
        this.setState({ fullName });
    }

    setId(id) {
        this.setState({ id: id.replace(/[^0-9]/g, '')});
    }

    setEmail(email) {
        this.setState({ email });
    }

    setUserGit(userGit) {
        this.setState({ userGit });
    }
    
    submitUser = async () => {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const { fullName, id, chosenDate, email, userGit } = this.state
        if (fullName &&
            id &&
            chosenDate &&
            (email && emailPattern.test(email) === true) &&
            userGit) {
            const errors = {
                fullName: false,
                id: false,
                chosenDate: false,
                email: false,
                userGit: false
            }
            this.setState({ errors });
            await this._storeData();
            this.props.navigation.navigate('UserDetails', this.state);
        } else {
            const errors = {
                fullName: false,
                id: false,
                chosenDate: false,
                email: false,
                userGit: false                
            } 
            if (!fullName) errors.fullName = true
            if (!id) errors.id = true 
            if (!chosenDate) errors.chosenDate = true 
            if (!email || emailPattern.test(email) === false) errors.email = true
            if (!userGit) errors.userGit = true 
            this.setState({ errors })  
        }
        
    }

    render() {
        const { fullName, id, chosenDate, email, userGit, errors } = this.state
        return (
            <Container>
                <Header>
                    <Body>
                        <Title style={Style.title}>Registro de Usuario</Title>
                    </Body>
                </Header>
                <Content style={Style.content}>
                    <Form>
                        <Item floatingLabel error={errors.fullName}>
                            <Label>Nombre Completo</Label>
                            <Input
                                value={fullName} 
                                onChangeText={(fullName) => this.setfullName(fullName)}
                            />
                            {errors.fullName &&  <Icon name='close-circle' />}
                        </Item>
                        <Item floatingLabel error={errors.id}>
                            <Label>Cédula</Label>
                            <Input 
                                value={id} 
                                onChangeText={(id) => this.setId(id)}
                            />
                            {errors.id &&  <Icon name='close-circle' />}
                        </Item>
                        <Item error={errors.chosenDate}>
                            <DatePicker
                                maximumDate={new Date()}
                                locale={"es"}
                                modalTransparent={true}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Selecciona Fecha de Nacimiento"
                                textStyle={Style.textDataPicker}
                                placeHolderTextStyle={Style.placeHoldertPicker}
                                onDateChange={this.setDate}
                                disabled={false}
                            ></DatePicker>
                        </Item>

                        <Item floatingLabel error={errors.email}>
                            <Label>Correo Electronico</Label>
                            <Input 
                                value={email} 
                                onChangeText={(email) => this.setEmail(email)}
                            />
                            {errors.email &&  <Icon name='close-circle' />}
                        </Item>
                        <Item floatingLabel error={errors.userGit} last>
                            <Label>Usuario GitHub</Label>
                            <Input
                                autoCapitalize = 'none' 
                                autoCorrect={false}
                                value={userGit} 
                                onChangeText={(userGit) => this.setUserGit(userGit)}
                            />
                            {errors.userGit &&  <Icon name='close-circle' />}
                        </Item>
                    </Form>
                </Content>
                <Content style={Style.contentButton}>

                    <Button
                        large block
                        onPress={() => this.submitUser()}
                    >
                        <Text>Consultar</Text>

                    </Button>

                </Content>
            </Container>
        );
    }
}

export default RegisterForm;
