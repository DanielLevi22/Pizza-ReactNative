import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import {  ModalPicker } from "../../components/modalpicker";
import { ListItem } from "../../components/listitem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
type RouteDetailsParams = {
  Order: {
    number: string | number
    order_id: string | number
  }
}

type OrderRouteProps = RouteProp<RouteDetailsParams, 'Order'>
 
export type CategoryProps  = {
  id: string
  name: string
}

type ProductProps = {
  id: string
  name: string
}

export type ItemProps = {
  id: string
  product_id: string
  name: string
  amount: number | string
}
export function Order() {
const  [category, setCategory] = useState<CategoryProps[]>([])
const [ categorySelected, setCategorySelected] = useState<CategoryProps>()
const [amount,setAmount] = useState('1')
const [showModal, setShowModal] = useState(false)
const [ products, setProducts] = useState<ProductProps []>([])
const [productSelected, setProductSelected] = useState<ProductProps | null>()
const [showModalProduct, setShowModalProduct] = useState(false)
const [ items, setItems ] = useState<ItemProps[]>([])


  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
  const route = useRoute<OrderRouteProps>()
  
  async function handleCloseOrder() {
    try {
      const response = await api.delete('/order', {
        params: {
          order_id: route.params.order_id
        }
      })
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
   }



   function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item)
   }

   function closeModal() {
    setShowModal(false)
   }
   function handleChangeProduct(item: ProductProps) {
    setProductSelected(item)
   }
   
   async function handleAdd() {
 
    const response = await api.post('/order/add', {
      order_id: route.params.order_id,
      product_id: productSelected?.id,
      amount: Number(amount)
    })


    let data:ItemProps = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount
    }
    setItems([data,...items])
   }

  async function handleDeleteItem(id: string) {

   await api.delete('/order/delete', {
      params: {
        item_id: id
      }
    })
    let removeItem = items.filter(item => item.id !== id)
    setItems(removeItem)
  }
  function handleFinishOrder() {
    navigation.navigate("FinishOrder", {
      number: Number(route.params?.number),
      order_id: String(route.params?.order_id
)
    })
  }

   useEffect(() => {
   async function getInfo() {
    const response = await api.get('category')
    setCategory(response.data)
    setCategorySelected(response.data[0])
   }

   getInfo()

   },[])

   useEffect(() => {
    async function getProduct() {
     const response = await api.get('/category/product', {
      params: {
        category_id: categorySelected?.id
      }
     })
     setProducts(response.data)
     setProductSelected(response.data[0])
  
    }
 
    getProduct()
 
    },[categorySelected])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}> Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          {items.length <=0 && (
            <Feather name="trash-2" size={28} color="#ff3f4b"/>
          )

          }
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
        <Text style={{color: '#fff'}}>{categorySelected?.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={() => setShowModalProduct(true)}>
        <Text style={{color: '#fff'}} >{productSelected?.name}</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          style={[styles.input, { width: '60%', textAlign: 'center'}]}
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
        />
      </View >

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        
          disabled={items.length === 0}
          style={[styles.button, { opacity: items.length ===  0 ? 0.3 : 1}]}
        >
          <Text style={styles.buttonText} onPress={handleFinishOrder}>Avançar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
      style={{flex: 1, marginTop: 24}}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <ListItem data={item} deleteItem={handleDeleteItem} />
        }
      />

      <Modal
        transparent
        visible={showModal}
        animationType="fade"
      >
        <ModalPicker 
          handleCloseModal={closeModal}
          options={category}
          selectItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent
        visible={showModalProduct}
        animationType="fade"
      >
         <ModalPicker 
          handleCloseModal={() => setShowModalProduct(false)}
          options={products}
          selectItem={handleChangeProduct}
        />

      </Modal>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b2e',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 14
  },
  input: {
    backgroundColor: '#101026',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#fff',
    fontSize: 20
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  actions: {
    flexDirection: 'row',
    width: '100%',	
    justifyContent: 'space-between',
  },
  buttonAdd: {
    backgroundColor:"#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: ' 20%'
  },
  buttonText: {
    color: '#101026',
    fontSize: 18,
    fontWeight: 'bold', 
  },
  button: {
    backgroundColor: '#3fffa3',
    width: '75%' ,
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})