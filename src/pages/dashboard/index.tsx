import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView, Text,StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";


export  function  DashBoard() {
  const [newRequest, setNewRequest] =  useState('')

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function openOrder() {
    if(newRequest === '') {
      return
    }

    try {
      const response = await api.post('/order', {
        table: Number(newRequest)
      })

    navigation.navigate('Order',{ number: newRequest, order_id: response.data.id })
      setNewRequest('')
    } catch (error) {
      console.log(error)
    }



        
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Novo Pedido</Text>
        <TextInput 
          placeholder="Numero da mesa"
          placeholderTextColor="#F0F0F0F0"
          style={styles.input}
          keyboardType="numeric"
          value={newRequest}
          onChangeText={setNewRequest}
        />
        <TouchableOpacity style={styles.button} onPress={openOrder}>
          <Text style={styles.buttonText}>Abrir mesa</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 20 ,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor:  '#101026',
    borderRadius: 4,
    paddingHorizontal: 8 ,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa4',
    borderRadius: 4,
    marginVertical: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})