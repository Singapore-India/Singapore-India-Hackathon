import React ,{useEffect}from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import navigationOptions from "./Marketplace.navigationOptions";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const CouponItem = ({ coupon, onBuyPress }) => {
  const { title, price, description } = coupon;

  return (
    <View style={[{paddingVertical:7,backgroundColor:"#ffff",margin:"1%",borderRadius:5, display:"flex",flexDirection:"row",justifyContent:"space-between",padding:2}]}>
      <View >

      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.price,{fontWeight:"800",color:"#FFD700"}]}> {price} 🪙</Text>
      <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button , {justifyContent:"center",alignItems:"center"}]}
        onPress={()=>{
          onBuyPress();
          alert("You have successfully purchased!!");
        }}
        
      >
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Marketplace () {
  const coupons = [
    { id: 1, title: "DMart 20% off", price: 200, description: "You can get max discount upto 200",couponCode:"DMART20" },
    { id: 2, title: "Myntra 50% off", price: 500, description: "Max 500 Discount ",couponCode:"MYNTRA50" },
    { id: 3, title: "Flat 200 off Coffee", price: 400, description: "Flat 200 off on minm purchase of 1000",couponCode:"COFFEE200" },
  ];
  const [completed, setCompleted] = React.useState(false);

  const handleBuyPress = async(couponId) => {

    let user;
    AsyncStorage.getItem("userName").then((res) => {
      console.log('res',res);
      user = res;
      axios.post("10.1.156.61:8000/api/user/buy/",{
      "username": user,
      "productPrice":coupons[couponId-1].price,
    }).then((res) => {
      axios.post("10.1.156.61:8000/api/user/addcoupon/",{
        "username": user,
        "coupon":coupons[couponId-1]
      })
      console.log(res);
      
      setCompleted(true);
    }).catch((err) => {
      console.log(err);
    })
      // console.log(user);
    }).catch((err) => {
      console.log(err);
    });
    
    
    // Logic to handle buy button pre
    console.log(`Buy button pressed for coupon with ID: ${couponId}`);
  };

  useEffect(() => {}, [completed]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Coupons</Text>
      {coupons.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          onBuyPress={() => handleBuyPress(coupon.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    marginBottom: 10,
  },
  description: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#rgba(51, 153, 102, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
Marketplace.navigationOptions = navigationOptions;


