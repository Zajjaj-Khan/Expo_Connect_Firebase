import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebase.config";
import { addDoc, collection, onSnapshot, updateDoc,doc, deleteDoc } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons';
export interface Todo {
  title:string;
  done:boolean;
  id:string;
}
 
const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos:Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
  }, []);

  const addTodo = async () => {
    console.log("ADD");
    const doc = addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
    console.log("this is a Doc", doc);
  };

  const renderTodo = ({item}:any) =>{
    const ref = doc(FIRESTORE_DB,`todos/${item.id}`)
    const onToggle = async () => {
      updateDoc(ref,{done:!item.done})
    }
    const deleteTodo = async () => {
      deleteDoc(ref);
    }
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={onToggle} style={styles.todo}>
        {item.done &&  <Ionicons name="checkmark-circle" size={24} color="green" />}
        {!item.done &&  <Ionicons name="radio-button-off" size={24} color="black" />}

        <Text style={styles.todoText}>{item.title}</Text>
        
        </TouchableOpacity>
        <Ionicons name="trash" size={24} color="red" onPress={deleteTodo}/>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </View>
      <View>
        {todos.length > 0 && (
          <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(todo)=> todo.id}
          />
        )}
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  todoContainer:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:'#fff',
    padding:10,
    marginVertical:10,

  },
  todoText:{
    flex:1,
    paddingHorizontal:10,
  },
  todo:{
    flex:1,
    flexDirection: "row",
    alignContent: "center",
  }
});
