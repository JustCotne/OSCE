import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import { db } from '../../firebaseConfig';
import { onValue, ref, set } from 'firebase/database';


const RoomInfo = ( {route} ) => {
    const { data } = route.params;
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['']);
    const [mark,setMark]=useState('');

    useEffect(() => {
        const name = "ოთახი " + data;
        const startCountRef = ref(db, 'rooms/' + name);
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();

            setQuestion(data.question);
            setMark(data.mark);
            setAnswers(data.answers);
        });
    }, []);


  return (
    <View style={styles.main}>

        <View style={styles.titlecontainer}>
            <Text style={styles.title}>ოთახი {data}</Text>
        </View>

        <View style={styles.pointcontainer}>
            <Text style={styles.point}>ქულა: {mark}</Text>
        </View>

        <View style={styles.questcontainer}>
            <Text style={styles.quest}>{question}</Text>
        </View>

        {answers.map((answer, index) => (
            <View style={styles.answercontainer} key={index}>
                <Text style={styles.answer}>{answer}</Text>
            </View>
        ))}

    </View>
  )
}

export default RoomInfo

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#414950',
        flex: 1,
      },
    titlecontainer:{
        justifyContent:'center',
        alignItems:'center',
        margin:20,
    },
    questcontainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:25,
        marginBottom:30,
    },
    answercontainer:{
        backgroundColor:'#292e33',
        padding:15,
        // marginRight:80,
        justifyContent:'center',
        borderRadius:10,
        margin:10,
    },
    title:{
        color:'white',
        fontSize:26,
        fontWeight:'700',
    },
    quest:{
        color:'white',
        fontWeight:'600',
        fontSize:18
    },
    answer:{
        color:'white',
        fontWeight:'600',
        fontSize:15,
    },
    point:{
        fontSize:16,
        color:'white',
        fontWeight:'600',
    },
    pointcontainer:{
        justifyContent:'center',
        alignItems:'flex-end',
        marginRight:20,
    },
})