import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomHeader from '../../components/Header';
import GlobalContext from '../../helpers/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from "../../constants/host.js"
import axios from 'axios';

const MarketHome = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const categories = ['Textbooks', 'Electronics', 'Furniture', 'Clothing', 'Appliances', 'Sports Equipment', 'Stationery', 'Musical Instruments', 'Kitchenware', 'Books', 'Art Supplies', 'Room Decor', 'Fitness & Wellness', 'Tickets & Events', 'Miscellaneous'];

const {cartData, setcartData} = useContext(GlobalContext);

const {orderData, setorderData} = useContext(GlobalContext);

 
    
    // const sampleProducts = [
    //   { id: 1, name: 'Diary', price: 10, seller: { name: 'Student 1', id: '1000014132@dit.edu.in' }, image: 'http://surl.li/rvebm', category: 'Textbooks' },
    //   { id: 2, name: 'Wooden Chair', price: 20, seller: { name: 'Student 2', id: '1000014133@dit.edu.in' }, image: 'http://surl.li/rvetu', category: 'Furniture' },
    //   { id: 3, name: 'Shirt', price: 30, seller: { name: 'Student 3', id: '1000014134@dit.edu.in' }, image: 'http://surl.li/rvfbp', category: 'Clothing' },
    //   { id: 4, name: 'Electric Iron', price: 40, seller: { name: 'Student 4', id: '1000014135@dit.edu.in' }, image: 'http://surl.li/rvevt', category: 'Appliances' },
    //   { id: 5, name: 'C-type Charger', price: 50, seller: { name: 'Student 5', id: '1000014136@dit.edu.in' }, image: 'http://surl.li/rvewx', category: 'Electronics' },
    //   { id: 6, name: 'Drafter scale', price: 60, seller: { name: 'Student 6', id: '1000014137@dit.edu.in' }, image: 'http://surl.li/rwaqk', category: 'Stationery' },
    // ];

    //fetch data from backend

     useEffect(()=>{
          getProducts();
   },[])

  const getProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${host.apiUrl}/api/product/get-products`,
        config,
      );
      console.log(response.data.products);

      if (response.data) {
        console.log('products received');
       setProducts(response.data.products);
      } else {
        console.log('products not found');
      }
    } catch (error) {
      console.log(error);
    }
  }



  
  
//not working
  const handleProductPress = (product) => {
    // Navigate to product details screen or perform any action
    console.log('Product pressed:', product);
  };

  
  const handleAddToCart = (product) => {
    const itemExists = cartData.some((item) => item.id === product._id);

    if (!itemExists) 
    console.log('Product added to cart:', product);{
      setcartData([...cartData, product]);
      setNotificationMessage(`${product.productName} added to your cart.`);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  const handleBuyNow = (product) => {
    const itemExists = cartData.some((item) => item.id === product.id);
    if (!itemExists) 
    console.log('Product has been placed for order.', product);{
      setorderData([...orderData, product]);
      setNotificationMessage(`${product.productName} added to your cart.`);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };
  
  const renderProductItem = ({ item, index }) => (
    <View style={styles.productContainer}>
      <View style={styles.productItem}>
        <TouchableOpacity onPress={() => handleProductPress(item)}>
          <View style={styles.imageContainer}>
            {/* Apply opacity style for the image */}
            <Image source={{ uri: item.productImage }} style={[styles.productImage, item.category === 'Drafter scale' && styles.fadedImage]} />
            {item.category === 'Drafter scale' && (
              <View style={styles.notAvailableContainer}>
                <Text style={styles.notAvailableText}>Not Available</Text>
              </View>
            )}
          </View>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productPrice}>Rs {item.price}</Text>
          {/* <Text style={styles.sellerInfo}></Text> */}
          <Text>Description : {item.productDescription}</Text>
          <Text>Condition : {item.productCondition}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addToCartButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleBuyNow(item)}
        >
          <Text style={styles.addToCartButtonText}>
            Buy Now
          </Text>
        </TouchableOpacity>
        {index === 5 && ( // Add button below the sixth image
          <View style={styles.notifyButtonContainer}>
            <TouchableOpacity
              style={styles.notifyButton}
              onPress={() => handleNotifyWhenAvailable(item)}
            >
              <Text style={styles.notifyButtonText}>
                Notify Me When Available
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
  

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, item === selectedCategory && styles.selectedCategory]}
      onPress={() => {
        setSelectedCategory(selectedCategory === item ? null : item);
      }}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const Notification = ({ message }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );

  return (
    <ScrollView backgroundColor="white">
      <View>
        <CustomHeader navigation={navigation} />
        <View style={styles.container}>
          <View style={styles.categories}>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={true}
            />
          </View>
          {/* <Text style={styles.title}>BUY</Text> */}

          <FlatList
            data={products.filter(product => !selectedCategory || product.category === selectedCategory)}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.productList}
          />

          {showNotification && <Notification message={notificationMessage} />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categories: {
    marginBottom: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  productList: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productItem: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    alignItems: 'center', // Centering the image within its container
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    marginBottom: 5,
  },
  productPrice:
 {
    fontSize: 16,
    color: '#888',
  },
  sellerInfo: {
    fontSize: 14,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  notificationContainer: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    bottom: '50%',
    transform: [{ translateX: 20 }, { translateY: 20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  notificationText: {
    color: '#fff',
    textAlign: 'center',
  },
 fadedImage: {
    opacity: 0.5, // Set opacity to make the image look faded
  },
  notAvailableContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red background
    paddingVertical: 5,
  },
  notAvailableText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  notifyButtonContainer: {
    position: 'absolute',
    top: -8, // Adjust the position as needed
    right: 2, // Adjust the position as needed
  },
  notifyButton: {
    backgroundColor: 'green',
    padding: 3,
    borderRadius: 5,
  },
  notifyButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MarketHome;