import React ,{useEffect}from "react";
import { ScrollView,View, Text, StyleSheet, TouchableOpacity,Clipboard } from "react-native";
import navigationOptions from "./Coupons.navigationOptions";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";



// const CopyToClip = () => {
//     const copyToClipboard = () => {
//       const textToCopy = 'This is the text to be copied';
  
//       Clipboard.setString(textToCopy);
//     };
// };


const CouponItem = ({ coupon }) => {
  const { title,couponCode, price, description } = coupon;

  return (
    <View style={[{paddingVertical:7,paddingHorizontal:5,backgroundColor:"#ffff",margin:"1%",borderRadius:5, display:"flex",flexDirection:"row",justifyContent:"space-between",padding:2}]}>
      <View >

      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.price,{fontWeight:"800",color:"#FFD700"}]}> {price} 🪙</Text>
      <Text style={styles.description}>{description}</Text>
      </View>
      {/* <View style={[{borderStyle:"dashed" ,borderColor:"black"}]}> */}
      <TouchableOpacity 
    //   onPress={() => {Clipboard.setString(couponCode)}}
        style={[{justifyContent:"center",alignItems:"center" ,borderStyle:"dashed", borderWidth: 2,borderColor:"black" , paddingHorizontal:2,paddingVertical:4}]}>
        <Text selectable={true} style={[styles.buttonText,{color:"black" }]}>{couponCode}</Text>
      </TouchableOpacity>
      </View>
    // </View>
  );
};

export default function Coupons () {

    const [coupons,setCoupons] = React.useState([]);
  const [completed, setCompleted] = React.useState(false);

  const handleBuyPress = async(couponId) => {

  };

  const fetchCoupons = async() => {
    try{
        let user;
        AsyncStorage.getItem("userName").then((res) => {
            console.log('res',res);
            user = res;
        
            axios.post("http://10.1.156.61:8000/api/user/getcoupons/",{
            "username": user,
            }).then((res) => {
              console.log("ccccc",res.data.coupons);
              setCoupons(res.data.coupons);
            }).catch((err) => {
              console.log(err);
            });
            // setCompleted(true);
          }).catch((err) => {
            console.log(err);
          })
      

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {fetchCoupons()}, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Your Coupons</Text> */}
      <ScrollView>
      {coupons?.map((coupon,idx) => (
        <CouponItem
          key={idx}
          coupon={coupon}
        //   onBuyPress={() => handleBuyPress(coupon.id)}
        />
      ))}
      </ScrollView>
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
Coupons.navigationOptions = navigationOptions;


