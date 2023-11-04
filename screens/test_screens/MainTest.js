import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, BackHandler, Button, ScrollView, Alert } from 'react-native';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../../firebaseConfig';
import CountDown from 'react-native-countdown-component';
import { CheckBox } from 'react-native-elements';
import { useNavigation} from "@react-navigation/native";


const MainTest = ({ route }) => {
  const { student } = route.params;
  const { roomNum } = route.params;
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([{ text: '', checked: false }]);
  const [mark, setMark] = useState();
  const [testStarted, setTestStarted] = useState(false);
  const [ownMark, setOwnMark] = useState(0);
  const navigation = useNavigation();


  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    const name = `ოთახი ${roomNum}`;
    const startCountRef = ref(db, `rooms/${name}`);
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const answersData = data.answers.map((answer) => ({ text: answer, checked: false }));
      setQuestion(data.question);
      setMark(parseInt(data.mark));
      setAnswers(answersData);
    });
  }, []);

  //stored email Decoder
  // function decodeEmail(encodedEmail) {
  //   return encodedEmail.replace(/_at_/g, "@").replace(/_/g, ".");
  // }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!testStarted) {
        return true;
      }
      return false;
    });

    return () => {
      backHandler.remove();
    };
  }, [testStarted]);

  const startTest = () => {
    setTestStarted(true);
  };

  const submitAnswers = () => {

    Alert.alert(
      'დასტური',
      'გსურთ თუ არა გამოცდის დროზე ადრე წარდგენა?',
      [
        {
          text: 'არა',
          style: 'cancel', 
        },
        {
          text: 'დიახ',
          onPress: () => {
            const roomNumStr = `room ${roomNum}`;
            const encodedEmail = student.replace(/@/g, "_at_").replace(/\./g, "_");
            const studentPath = `${roomNumStr}/${encodedEmail}`;
            const answersData = answers.map((answer) => ({ text: answer.text, checked: answer.checked }));

            set(ref(db, studentPath), {
              answers: answersData,
              mark: ownMark,
            });
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCheckBox = (index) => {
    const newAnswers = [...answers];
    newAnswers[index].checked = !newAnswers[index].checked;
    setAnswers(newAnswers);

    if (newAnswers[index].checked) {
      setOwnMark(ownMark + (mark / answers.length));
    } else {
      setOwnMark(ownMark - (mark / answers.length));
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.titlecont}>
        <Text style={styles.title}>ოთახი {roomNum}</Text>
        {testStarted ? (
          <CountDown
            until={600}
            size={20}
            onFinish={submitAnswers}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: '#414950' }}
            timeToShow={['M', 'S']}
            timeLabels={{ m: '', s: '' }}
          />
        ) : null}
      </View>
      <View style={styles.studentcont}>
        <Text style={styles.student}>სტუდენტი: {student}</Text>
      </View>
      <View style={styles.questioncont}>
        <Text style={styles.question}>{question}</Text>
      </View>

      {testStarted ? (
        <ScrollView>
          <View>
            {answers.map((answer, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.answercontainer}>
                  <Text style={styles.answer}>{answer.text}</Text>
                </View>
                <CheckBox
                  onPress={() => handleCheckBox(index)}
                  checked={answer.checked}
                  checkedColor="white"
                  uncheckedColor="white"
                  textStyle={{ color: 'white', fontWeight: '600', fontSize: 15 }}
                  size={35}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.middleContainer}>
          <TouchableOpacity style={styles.centeredButton} onPress={startTest}>
            <View style={styles.groupboxTop}>
              <View style={styles.groupboxbot}>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
                  გამოცდის დაწყება
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {testStarted ? (
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 35, }}>
          <View style={{ margin: 15 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>ქულა: {Math.round(ownMark)}/{mark}</Text>
          </View>
          <TouchableOpacity onPress={submitAnswers}>
            <View style={styles.addbutt}>
              <Text style={styles.addtext}>წარდგენა</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}

    </View>
  );
};

export default MainTest;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#414950',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  titlecont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  student: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  studentcont: {
    margin: 10,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  addbutt: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cccccc",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 30
  },
  addtext: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  answer: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  answercontainer: {
    backgroundColor: '#292e33',
    padding: 15,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    flex: 1,
  },
  questioncont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredButton: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupboxTop: {
    backgroundColor: '#cccccc',
    width: 330,
    height: 160,
    borderRadius: 5,
  },
  groupboxbot: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#313131',
    marginRight: 5,
    marginTop: 5,
    width: 320,
    height: 150,
    borderRadius: 5,
  },
});
