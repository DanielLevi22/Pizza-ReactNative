import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryProps } from "../../pages/order";

interface ModalPickerProps {
  options:CategoryProps[]
  handleCloseModal: () => void
  selectItem: (item: CategoryProps) => void
}


const { width: Width, height: Height} = Dimensions.get('window')
export function ModalPicker({handleCloseModal,options,selectItem}:ModalPickerProps){ 

 function onPressItem(item: CategoryProps) {
  selectItem(item)
  handleCloseModal()
 }
  const option = options.map((item,index) => (
    <TouchableOpacity key={item.id} style={styles.option} onPress={() => onPressItem(item)}>
        <Text style={styles.item}>
          {item?.name}
        </Text>
    </TouchableOpacity>
  ))
  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
              {option}
          </ScrollView>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    width: Width - 20,
    height: Height / 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 4
  },
  option : {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8a8a8a'
  },
  item: {
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101026'
  }
})