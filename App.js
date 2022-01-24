import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchList, setSearchList] = useState();

  const handleChange = (e, setState) => {
    setState(e);
  };

  const handlerSubmitButton = async () => {
    if ((description && title) !== "") {
      let newTodoItems = [
        ...todoList,
        { title: title, description: description, status: false },
      ];
      setTodoList(newTodoItems);
      await AsyncStorage.setItem("List", JSON.stringify(newTodoItems));
    }
  };

  const DelData = (item) => {
    const deleteTodo = todoList.filter((data, index) => index != item);
    setTodoList(deleteTodo);
  };

  const ChangingStatus = (item) => {
    const previsousData = {
      description: item?.item?.description,
      title: item?.item?.title,
      status: !item?.item?.status,
    };
    const doneTask = todoList.filter((data, index) => index != item?.index);
    let newTodoItems = [...doneTask, previsousData];
    setTodoList(newTodoItems);
  };
  const SearchingTitle = (e) => {
    console.log(e);
    const searchListValue = todoList.filter((data) => data?.title == e);
    console.log("Search List Value", searchListValue);
    setSearchList([searchListValue]);
  };
  const TodoAppData = (item) => {
    console.log("ITEM", item);
    return (
      <>
        <View style={styles.container1}
        >
          <View>
            <Checkbox
              status={item?.item?.status ? "checked" : "unchecked"}
              onPress={() => {
                ChangingStatus(item);
              }}
            />
          </View>
          <View>
            <Text>{item?.item?.title}</Text>
            <Text>{item?.item?.description}</Text>
          </View>
          <TouchableOpacity onPress={() => DelData(item?.index)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "#185854", fontWeight:"Bold", }}>TODO LIST APP</Text>
        </View>
        <View style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter Title"
            onChangeText={(e) => handleChange(e, setTitle)}
          />
          </View>
          <View style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter Description"
            onChangeText={(e) => handleChange(e, setDescription)}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: "flex-center",
            alignItems: "flex-center",
          }}
        >
          <TouchableOpacity
            onPress={handlerSubmitButton}
            style={styles.submitButtonStyle}
          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}
        >
          <TextInput
            placeholder="Search Title"
            onChangeText={(e) => SearchingTitle(e)}
          />
        </View>
          <FlatList
            extraData={todoList}
            renderItem={TodoAppData}
            data={todoList}
          />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },

  container1: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    paddingHorizontal: 25,
    paddingVertical: 6,
  },

  submitButtonStyle: {
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#258bbe",
  },

  searchContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});