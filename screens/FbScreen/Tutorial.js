import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button, TouchableOpacity,

} from 'react-native';
import { Video } from 'expo-av';
import { DataTable,Switch,TextInput,Appbar,Surface,Drawer, Card,Title,Paragraph } from 'react-native-paper';
function Tutorial ()  {
        const [status, setStatus] = React.useState({});
        const [url, setUrl] = React.useState('');
        const test = React.useEffect(
            ()=>{
                fetch("https://template-ui-default-rtdb.firebaseio.com/tutorial.json").then(res => res.json()).then(
                    result => {
                        setUrl(url)
                    }
                )
            }
        );
        const video = React.useRef(
            null

        );


        return(
            <Card.Content style={{ maxWidth:'30%'}}>
                <Title>Hướng dẫn dùng công cụ:</Title>
                <Paragraph style={styles.paramain}>1. Auto Like : Ex  = 257404382527504</Paragraph>
                <Paragraph >/// Note: id là một chuỗi số </Paragraph>
                <Paragraph style={styles.paramain}>2. Auto Answer</Paragraph>
                <Paragraph style={styles.paramain}>3. Auto Comment : Ex = answer1,answer2,asnwer3 & 257404382527504   </Paragraph>
                <Paragraph >/// Note : nhiều câu trả lời thì thì cách nhau bằng , spam tin nhắn đc đấy :))</Paragraph>
                <Paragraph>Và: id đứng sau & và là một chuỗi số </Paragraph>
                <Paragraph style={styles.paramain}>4. Auto Add Friends</Paragraph>
                <Paragraph style={styles.paramain}>5. Auto Comment Filter at gr or page </Paragraph>
                <Paragraph style={styles.paramain}>6. Care Nick</Paragraph>
                <Paragraph style={styles.paramain}>7. LIKE ALL : EX: 257404382527504 & 2000</Paragraph>
                <Paragraph style={styles.paramain}>/// Note: id & delay , nhập id & thời gian delay bằng ms  </Paragraph>
                <Paragraph style={styles.paramain}>8. Other</Paragraph>
                <TouchableOpacity onPress={()=>window.open("https://www.youtube.com/watch?v=Cm0Q4fhwtSw")}>
                    <Paragraph style={{color:'#4630EB'}}>9. Video hướng dẫn >> Click</Paragraph>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>window.open("https://id.atpsoftware.vn/")}>
                    <Title style={{color:'#3366BB'}}>GET ID ONLINE HERE </Title>
                </TouchableOpacity>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri:"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />


                {/*<View style={styles.buttons}>*/}
                {/*    <Button*/}
                {/*        title={status.isPlaying ? 'Pause' : 'Play'}*/}
                {/*        onPress={() =>*/}
                {/*            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()*/}
                {/*        }*/}
                {/*    />*/}
                {/*</View>*/}
            </Card.Content>
        )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: 200,
        marginTop:30
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paramain:{
        color:'red'
    }
});
export default Tutorial
