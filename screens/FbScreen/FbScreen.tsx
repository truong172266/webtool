import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
    Button,
    SafeAreaView,
    Clipboard

} from 'react-native';
import { DataTable,Switch,TextInput,Appbar,Surface,Drawer, Card,Title,Paragraph } from 'react-native-paper';
import Tutorial from "./Tutorial";
import styles from "./styles";
import FbService from "./FbService";
import User from "./AddUser";

class FbScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSwitchOn: false,
      active: 'first',
      visible: false,

    }
  }
  componentDidMount(){
    this.setState({page:0});
  }

  render(){

    // @ts-ignore
    // @ts-ignore
    return (
        <SafeAreaView style={{flex:1}}>
            <User stateModal ={this.state.visible} actionModal ={()=>{this.setState({visible:false})}} />
            {/*// Header*/}
              <View style={{}}>
                <Appbar style={styles.bottom}>
                  <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
                  <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
                  <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
                  <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
                </Appbar>
              </View>

              <View style={styles.sectionTwo}>
                <Tutorial />
                <FbService />
                <Drawer.Section title="Extensions">
                  <Drawer.Item
                      label="ADD User"
                      active={this.state.active === 'ADD User'}
                      onPress={() => { this.setState({ visible: true }); }}
                  />
                  <Drawer.Item
                      label="DEL User"
                      active={this.state.active === 'DEL User'}
                      onPress={() => { this.setState({ active: 'second' }); }}
                  />
                </Drawer.Section>
            </View>
        </SafeAreaView>
    );
  }

}


export default FbScreen;
