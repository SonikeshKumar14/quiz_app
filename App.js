import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {englishData} from './src/EnglishQuestion';
import Questionitem from './Questionitem';

const {height, width} = Dimensions.get('window');
const App = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [question, setQuestion] = useState(englishData);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const OnSelectOption = (index, x) => {
    const tempData = question;
    tempData.map((item, ind) => {
      if (ind == index) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestion(temp);
  };

  const getTextScore = () => {
    let marks = 0;
    question.map(item => {
      if (item.marked !== -1) {
        marks = marks + 5;
      }
    });
    return marks;
  };
  const reset = () => {
    const tempData = question;
    tempData.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestion(temp);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 20,
            color: '#000',
          }}>
          English Question :{' ' + currentIndex + '/' + englishData.length}
        </Text>
        <Text
          style={{
            marginRight: 20,
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
          }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({animated: true, index: 0});
          }}>
          Reset
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 30}}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={englishData}
          renderItem={({item, index}) => {
            return (
              <Questionitem
                data={item}
                selectedOption={x => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex > 1 ? 'purple' : 'gray',
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log(currentIndex);
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: currentIndex - 2,
              });
            }
          }}>
          <Text style={{color: '#fff'}}>Previous</Text>
        </TouchableOpacity>
        {currentIndex == 8 ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              height: 50,
              width: 100,
              borderRadius: 10,
              marginLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'purple',
              height: 50,
              width: 100,
              borderRadius: 10,
              marginLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}
            onPress={() => {
              if (question[currentIndex - 1].marked !== -1) {
                if (currentIndex < question.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }
            }}>
            <Text style={{color: '#fff'}}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
                color: 'grey',
              }}>
              Text Score
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: '800',
                alignSelf: 'center',
                marginTop: 20,
                color: 'green',
              }}>
              {getTextScore()}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'grey',
                  alignSelf: 'center',
                  height: 40,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
