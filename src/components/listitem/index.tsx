import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ItemProps } from "../../pages/order";
import { Feather} from "@expo/vector-icons"

interface ListProps {
  data: ItemProps,
  deleteItem: (id: string) => void
}
export function ListItem({data, deleteItem}: ListProps) {

  async function handleDeleteItem() {
    deleteItem(data.id)
  }
  return(
    <View style={styles.container}>
        <Text style={styles.item}>{data.amount} - {data.name}</Text>

        <TouchableOpacity onPress={handleDeleteItem}>
          <Feather name="trash-2" color="#ff3f4b" size={25}  />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101026',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',	
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
    borderRadius:4,
    borderWidth: 0.3,
    borderBlockColor: '#8a8a8a8a'
  },
  item: {
    color: '#fff'
  }
})