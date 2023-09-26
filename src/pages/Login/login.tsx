import react from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {} from 'react-native-animatable'
import {useNavigation} from "@react-navigation/native";
import {Button} from "@rneui/base";

export default function Login() {
    const navigation = useNavigation();

    // @ts-ignore
    return (
        <SafeAreaView>
            <View style={{alignItems:'center'}}>
                <Text style={{color: "red", fontSize: 50}}> Login </Text>
                <Button onPress={()=> navigation.navigate('bottomTabs')}>
                    <Text>a que no te da pa clickear</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}