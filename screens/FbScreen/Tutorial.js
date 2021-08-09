import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,

} from 'react-native';
import { DataTable,Switch,TextInput,Appbar,Surface,Drawer, Card,Title,Paragraph } from 'react-native-paper';
class Tutorial extends React.Component {
    render() {
        return(
            <Card.Content>
                <Title>Hướng dẫn dùng công cụ:</Title>
                <Paragraph>1. Auto Like </Paragraph>
                <Paragraph>2. Auto Answer</Paragraph>
                <Paragraph>3. Auto Comment </Paragraph>
                <Paragraph>4. Auto Add Friends</Paragraph>
                <Paragraph>5. Auto Comment Filter at gr or page </Paragraph>
                <Paragraph>6. Care Nick</Paragraph>
                <Paragraph>7. Other</Paragraph>
                <Paragraph>8.Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Paragraph>
            </Card.Content>
        )
    }
}
export default Tutorial
