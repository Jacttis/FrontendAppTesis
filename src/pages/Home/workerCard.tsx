import react, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

export default function WorkerCard(props : any) {
    const { workerInfo } = props;

    return (
        <Card style={styles.container}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title={workerInfo?.name} subtitle={workerInfo?.email} />
          <Card.Content>
              <Text>{workerInfo?.name}</Text>
              <Text>{workerInfo?.email}</Text>
          </Card.Content>
          <Card.Actions style={styles.buttonContainer}>
              <Button style={styles.button} onPress={()=>{props.onRefused()}}>Nope</Button>
              <Button style={styles.button} onPress={()=>{props.onAccepted()}}>Ok</Button>
          </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            width: '70%',
            padding: 20,
        },
        buttonContainer:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            margin: 1,
            width:'90%',
        },
        button:{
            width:'45%',
        }
    }
);