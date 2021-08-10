import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
    Button,
    SafeAreaView,
    Clipboard

} from 'react-native';
import {
  DataTable,
  Switch,
  TextInput,
  Appbar,
  Surface,
  Drawer,
  Card,
  Title,
  Paragraph,
  ProgressBar, Colors
} from 'react-native-paper';
import Firebase from '../../firebase/Firebase.js'
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
      all : []
    }
  }
  componentDidMount(){
    this.setState({page:0});

  }


  async like() {
    // @ts-ignore
    await Firebase.listen('action',
        'value',
        async(snapshot)=>{
          if(snapshot.val() !== null )
          {
            var arr = Object.values(snapshot.val())
            var idLike = prompt("Type id & delay (miliseconds)","253281089606500&2000").toString();
            var res = idLike.split('&');
            var a =Number.isInteger(parseInt(res[0]))
            var b =Number.isInteger(parseInt(res[1]))

            if (a && b && idLike !== null){
              for (var jndex=0;jndex<arr.length;jndex++){
                fetch('https://graph.facebook.com/v2.3/'+ res[0]+'/likes?access_token='+ arr[jndex].cookie +'&method=post')
                await new Promise(r => setTimeout(r,Math.random()*res[1]));
              }
            }
            else{
              alert("Notify: id & delay  /// ex : 1232133&2000")
            }
            await alert("Success")
          }
        }
        )
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
                <ProgressBar progress={0.5} color={Colors.red800} />
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
                      label="Like ALL"
                      active={this.state.active === 'LIKE'}
                      onPress={() => {this.like()} }
                  />
                </Drawer.Section>
            </View>
        </SafeAreaView>
    );
  }

}


export default FbScreen;
