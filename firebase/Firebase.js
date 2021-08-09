import {FirebaseWeb} from "../firebase/FirebaseWeb";
import firebase from "firebase";
const firebaseWeb = FirebaseWeb.database();
class Firebase {
    timeStamp (date){
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime +' | '+ new Date().getDate()+ '/' + (new Date().getMonth()+ 1) + '/'+ + new Date().getFullYear();
    }
    async send (path, data){
        try {
            await firebaseWeb.ref(path).set(data);
        }
        catch(e){
            alert(e);
        }

    }
    async listen (path, type,action){
        try {
            await firebaseWeb.ref(path).orderByKey().on(type,action);
        }
        catch(e){
            alert(e);
        }

    }
    async push (path,data, dataUpdate){
        try {
            await firebaseWeb.ref(path).push(data).then((snap)=>{
                    const key = snap.key;
                    this.send (`${path}/${key}/key`, key
                    );
                }
            );
        }
        catch(e){
            alert(e);
        }
    }
    async update  (path,key,data){
        try {
            this.send (`${path}/${key}`, data
            );
        }
        catch(e){
            alert('error');
        }
    }

}
export default new  Firebase();
