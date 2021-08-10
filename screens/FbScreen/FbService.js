import {Card, DataTable, Paragraph, Surface, Switch,  Title,TextInput,ProgressBar, Colors} from "react-native-paper";
import styles from "./styles";
import {Button, View, FlatList, Text, Alert, Clipboard,TouchableOpacity} from "react-native";
import * as React from "react";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Firebase from "../../firebase/Firebase";
const optionsPerPage = [2, 3, 4];
import User from "./AddUser";

var self;
// @ts-ignore
class SmallInfo extends User{
    constructor(props){
        super(props);
        this.state = {
            auto_like: false,
            auto_rr:false,
            auto_answer:false,
            auto_comment:false,
            friend_bool:false,
            auto_care_nick:false,
            action:false,
            data :
                {
                    selected : 1,
                    facebook: '',
                    password:'',
                    cookie:'',
                    like:'',
                    react:'',
                    answer:'',
                    comment:'',
                    friend:'',
                    care_nick:'',
                },
        }

    }
    pushAction(){
         if (this.props.cookie !== ""){
             this.setState({action:true},
                 async ()=>{
                     await Firebase.update(`action`,
                         `${this.props.start}`,
                         {
                             selected : 1,
                             facebook: this.props.facebook,
                             password:this.props.password,
                             key:this.props.start,
                             cookie:this.props.cookie,
                             like:this.state.data.like,
                             react:this.state.data.react,
                             answer:this.state.data.answer,
                             comment:this.state.data.comment,
                             friend:this.state.data.friend,
                             care_nick:this.state.data.care_nick,
                         }
                     )


                     setTimeout(() => {
                             try {
                                 var arr = this.state.data.comment.content.split(',')
                                 if (this.state.auto_comment === true) {
                                     for (var index = 0; index < arr.length; index++) {
                                         fetch('https://graph.facebook.com/v2.3/' + this.state.data.comment.id + '/comments?message=' + arr[index] + '&access_token=' + this.props.cookie + '&method=post')
                                     }
                                 }
                             }
                             catch(e){}
                         }
                         , Math.random()*2000);
                     setTimeout(() => {
                             try{
                                 if (this.state.auto_like === true){
                                     fetch('https://graph.facebook.com/v2.3/'+ this.state.data.like+'/likes?access_token='+ this.props.cookie+'&method=post')
                                 }
                             }
                             catch(e){}
                         }
                         , Math.random()*2000);
                     await alert('Success')
                 }
             )


         }
         else {
             alert("user này thiếu tooken");
         }
    }
    copy (value){
        Clipboard.setString(value);
        return Clipboard.getString();
    }
    render() {
        return(
            <View>
                <DataTable.Row>
                    <DataTable.Cell style={{flex:0.5,borderEndWidth:1,justifyContent:'center'}}>{this.props.number}</DataTable.Cell>
                    <DataTable.Cell  style={styles.textContentFlatlist}>
                        <TouchableOpacity
                            onPress={() => this.copy(`${this.props.facebook}`)}
                        >
                            <AntDesign name={'copy1'} size={15}/>
                        </TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <TouchableOpacity
                            onPress={() => this.copy(`${this.props.password}`)}
                        >
                            <AntDesign name={'copy1'} size={15}/>
                        </TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        {this.props.cookie !== "" ? <TouchableOpacity
                            onPress={() => this.copy(`${this.props.cookie}`)}
                        >
                            <AntDesign name={'copy1'} size={15}/>
                        </TouchableOpacity> : <Text>null</Text>}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <Switch
                            value={this.state.auto_like}
                            onValueChange={() =>{
                                var value = 266
                                try{
                                    if (this.state.auto_like=== false ) {
                                        // var like = prompt("Tool cho biết", "like,https://www.facebook.com/ieltsilgt/photos/a.114187730182504/320427316225210/").toString()
                                        var like = prompt("Tool cho biết", "id_link").toString()
                                        var res = like.split('_')
                                        var c =Number.isInteger(parseInt(like))
                                        var a =Number.isInteger(parseInt(res[0]))
                                        var b =Number.isInteger(parseInt(res[1]))

                                        // if(like !== ''&& (like.includes("www.") || like.includes("https://") ||  like.includes("http://"))){
                                        if(( a &&b) || c){
                                            this.setState({auto_like : !this.state.auto_like})
                                            this.setState(function (prevState){
                                                prevState.data = {
                                                    ...prevState.data,
                                                    like: like,
                                                }
                                            })
                                        }
                                        else {
                                            alert("Độ văn bản lớn hơn hoặc bằng 1 từ và chứa id là một số, đồng thời cách nhau bởi dấu phẩy")
                                            // alert("Độ văn bản lớn hơn hoặc bằng 1 từ và địa chỉ chưa https:// or http:// or www.")
                                        }

                                        value = 172;
                                    } else {
                                        this.setState({auto_answer: false});
                                    }
                                }
                                catch(e){}
                            }
                            }
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <Switch
                            value={this.state.auto_rr}
                            onValueChange={() =>
                            {
                                var value = 266
                                try{
                                    if (this.state.auto_rr === false ) {
                                        var react = prompt("Tool cho biết","answer,https://www.facebook.com/ieltsilgt/photos/a.114187730182504/320427316225210/").toString()
                                        var arr = ["like","tim","haha","thương thương"]
                                        var count = 0;
                                        for (var index = 0; index<4;index ++){
                                            if(react.includes(arr[index])){
                                                count =1;
                                            }
                                        }
                                        if(count === 1 || (react.includes("www.") || react.includes("https://") ||  react.includes("http://")) ){
                                            this.setState({auto_rr : !this.state.auto_rr})
                                            this.setState((prevState)=>{
                                                prevState.data = {
                                                    ...prevState.data,
                                                    react: react,
                                                }
                                            })
                                        }
                                        else {
                                            alert("Hãy nhập một trong bốn chữ cái : like, tim, haha, thương thương, và địa chỉ chứa https:// or http:// or www.");
                                        }

                                        value = 172;li

                                    }

                                    else{
                                        this.setState({ auto_rr: false});
                                    }

                                }
                                catch(e){

                                    }
                            }

                            }
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <Switch
                            value={this.state.auto_answer}
                            onValueChange={() => {
                                var value = 266
                                try{
                                    if (this.state.auto_answer === false ) {
                                        var answer = prompt("Tool cho biết", "Nhập câu trả lời...").toString()
                                        if(answer !== ''&& (answer.includes("www.") || answer.includes("https://") ||  answer.includes("http://"))){
                                            this.setState({auto_answer : !this.state.auto_answer})
                                            this.setState((prevState)=>{
                                                    prevState.data = {
                                                        ...prevState.data,
                                                        answer: answer,
                                                    }
                                            })
                                        }
                                        else {
                                            alert("Độ văn bản lớn hơn hoặc bằng 1 từ và địa chỉ chưa https:// or http:// or www.")
                                        }

                                        value = 172;
                                    } else {
                                        this.setState({auto_answer: false});
                                    }
                                }
                                catch(e){}
                            }
                            }
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <Switch
                            value={this.state.auto_comment}
                            onValueChange={() =>
                            {
                                var value = 266
                                try{
                                    if (this.state.auto_comment === false ) {
                                        var comment = prompt("Tool cho biết", "Your comment...& id").toString()
                                        var res = comment.split("&");
                                        var res1 = res[1].split('_')
                                        var a =Number.isInteger(parseInt(res1[0]))
                                        var b =Number.isInteger(parseInt(res1[1]))
                                        var c = Number.isInteger(parseInt(res[1]))
                                        if((a && b) || c ){
                                            this.setState({auto_comment : !this.state.auto_comment})
                                            this.setState((prevState)=>{
                                                    prevState.data = {
                                                        ...prevState.data,
                                                        comment: {id : res[1],content:res[0]} ,
                                                    }
                                            })

                                        }
                                        else {
                                            alert("Độ văn bản lớn hơn hoặc bằng 1 từ và chứa id là một số và đồng thời cách nhau bởi &")
                                        }
                                        value = 172;
                                    } else {
                                        this.setState({auto_comment: false});
                                    }
                                    console.log(this.state.auto_comment)
                                }
                                catch(e){}
                            }
                            }
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <Switch
                            value={this.state.friend_bool}
                            onValueChange={() =>
                            {
                                var value = 266
                                try{
                                    if (this.state.friend_bool === false ) {
                                        var link = prompt("Tool cho biết", "Nhập link...").toString()
                                        if(link !== '' && (link.includes("www.") || link.includes("https://") ||  link.includes("http://") )){
                                            this.setState({friend_bool : !this.state.friend_bool})
                                            this.setState((prevState)=>{
                                                    prevState.data = {
                                                        ...prevState.data,
                                                        friend: link,
                                                    }
                                            })
                                        }
                                        else {
                                            alert("Độ văn bản lớn hơn hoặc bằng 1 từ và chứa https:// or www. or https://")
                                        }
                                        value = 172;
                                    } else {
                                        this.setState({friend_bool: false});
                                    }
                                }
                                catch(e){}


                            }
                            }
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.textContentFlatlist}>
                        <Switch
                            value={this.state.auto_care_nick}
                            onValueChange={() =>
                            {
                                var value = 266
                                if (this.state.auto_care_nick === false ) {
                                    alert("Tính năng đang được nâng cấp")
                                }
                            }
                            }
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={{borderEndWidth:1, justifyContent:'center'}}>
                        <Button title={
                            this.state.action ?"Wait" :"Start"
                        }  onPress={async()=>{
                            await this.pushAction()
                            await this.setState({action:false})

                        }  }/>

                    </DataTable.Cell>
                </DataTable.Row>
            </View>
        )
    }
}
class FbService extends SmallInfo{
    constructor(props){
        super(props);
        self = this;
        self.state ={
            page : 0,
            itemPerPage : optionsPerPage[0],
            visible:false,
            data : [
                {
                    selected : 1,
                    facebook: '',
                    password:'',
                    cookie:'',
                    like:'',
                    react:'',
                    answer:'',
                    comment:'',
                    friend:'',
                    care_nick:'',
                },
            ]
        };
            Firebase.listen('action',
                'value',
                async (snapshot)=>{
                    if(snapshot.val() != null )
                    {
                        var arr = Object.values(snapshot.val());
                        this.setState({data:arr});
                    }
                }
            )
    }
    componentDidMount(){
        Firebase.listen('action',
        'value',
            async (snapshot)=>{
                if(snapshot.val() != null )
                {
                    var arr = Object.values(snapshot.val());
                    this.setState({data:arr});
                }
            }
        )
    }

    render() {
        return(

            <View >
                <Card style={{width:'170%',alignSelf:'center'}}>
                    <Card.Content>
                        <Title>FB SERVICE</Title>
                        <Paragraph>FB TOOL </Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://cdn.tgdd.vn//GameApp/-1//huong-dan-tao-facebook-avatar-800x450.jpg' }} />
                </Card>
                <Surface style={styles.surface}>
                    <DataTable style={{height:'100%',}} >
                        <DataTable.Header >
                            <DataTable.Title  style={{flex:0.5,borderEndWidth:1,justifyContent:'center'}}>STT</DataTable.Title>
                            <DataTable.Title  style={styles.titleHeader}>FaceBook</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Password</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Cookie</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Auto Like</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Auto RR</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Auto Answer</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Auto Comment</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Auto Kết Bạn</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Auto Care Nick</DataTable.Title>
                            <DataTable.Title style={styles.titleHeader}>Start</DataTable.Title>
                        </DataTable.Header>
                        {
                            (this.state.data !== null) ? <FlatList
                                data = {this.state.data}
                                initialNumToRender={5}
                                keyExtractor={(item,index) => index.toString()}
                                renderItem={({item,index}) =>{
                                    return(
                                        <SmallInfo number={index} facebook={item.facebook} password={item.password} cookie={item.cookie} start={item.key} />
                                    )
                                }}
                            /> : null

                        }


                    </DataTable>
                    <DataTable.Pagination
                        // style={{borderWidth:1,flexDirection:'row', alignContent:'flex-end'}}
                        page={this.state.page}
                        numberOfPages={4}
                        onPageChange={(page) => this.setState({page:page})}
                        label="1-2 of 6"
                        // optionsPerPage ={optionsPerPage}
                        // itemPerPage={this.state.itemPerPage}
                        // setitemPerPage={setitemPerPage}
                        // showFastPagination
                        // optionsLabel={'Rows per page'}
                    />
                </Surface>
            </View>
        )
    }
}
export default FbService
