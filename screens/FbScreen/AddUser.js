import * as React from 'react';
import {
    View,
} from 'react-native';
import {Modal, Portal, Text, Button, Provider, TextInput, DataTable} from 'react-native-paper';
import FbService from "./FbService";
import Firebase from "../../firebase/Firebase";

export default class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{
                facebook: '',
                password:'',
                cookie:'',
            },
            visible: false ,
        }
    }
    async pushAction(){
        await Firebase.push('action',
            {
                selected : 1,
                facebook: this.state.data.facebook,
                password:this.state.data.password,
                cookie:this.state.data.cookie,
                like:'',
                react:'',
                answer:'',
                comment:'',
                friend:'',
                care_nick:'',
            }
        )
    }
    showModal = () => this.setState({visible:this.props.visible});
    hideModal = () =>this.setState({visible:false});
    containerStyle = {backgroundColor: 'white', padding: 20, width:'30%', alignSelf:'center',justifyContent:'space-between', height:'35%', borderRadius:20};

    render(){

        return (
                <View>
                    <Portal>
                        <Modal visible={this.props.stateModal} onDismiss={this.props.actionModal} contentContainerStyle={this.containerStyle}>
                            <TextInput
                                onChangeText={text => this.setState(
                                    (prevState)=>{
                                        prevState.data = {
                                            ...prevState.data,
                                            facebook: text,
                                        }
                                    }
                                )}
                                defaultValue={this.state.data.facebook}
                                placeholder={"Type ..........."}
                                secureTextEntry={true}
                            />
                            <TextInput
                                defaultValue = {this.state.data.password}
                                onChangeText={(text)=>{
                                    this.setState((prevState)=>{
                                        prevState.data = {
                                            ...prevState.data,
                                            password: text,
                                        }
                                    })
                                }}
                                placeholder={"Type ..........."}
                                secureTextEntry={true}
                            />
                            <TextInput
                                defaultValue = {this.state.data.cookie}
                                onChangeText={(text)=>{
                                    this.setState((prevState)=>{
                                        prevState.data = {
                                            ...prevState.data,
                                            cookie: text,
                                        }
                                    })
                                }}
                                placeholder={"Type ..........."}

                            />
                            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                <Button icon="send" mode="outlined"
                                        contentStyle={{width:'30%', }}
                                        style={{marginTop:20}}
                                        onPress={() => this.pushAction()}>
                                </Button>
                            </View>
                        </Modal>
                    </Portal>
                </View>
        );
    }
};

