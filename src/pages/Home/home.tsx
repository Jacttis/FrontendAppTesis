import react, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import WorkerCard from './workerCard';

export default function Home() {
    const [workers, setWorkers] = useState<{[key: string]: any}>([]);

    useEffect(()=>{
        getStartupData();
    },[]);

    useEffect(()=>{
        console.log(workers);
    },[workers]);

    const getStartupData = () => {
        let workersMock = [ 
            { name: "Worker 1", email: "worker1@example.com" },
            { name: "Worker 2", email: "worker2@example.com" },
            { name: "Worker 3", email: "worker3@example.com" },
            { name: "Worker 4", email: "worker4@example.com" },
            { name: "Worker 5", email: "worker5@example.com" },
            { name: "Worker 6", email: "worker6@example.com" },
            { name: "Worker 7", email: "worker7@example.com" },
            { name: "Worker 8", email: "worker8@example.com" },
            { name: "Worker 9", email: "worker9@example.com" },
            { name: "Worker 10", email: "worker10@example.com"},
        ];
        setWorkers(workersMock);
    };

    const removeRefusedWorker = () => {
        let updatedWorkers = workers.slice(1,workers.length);
        setWorkers(updatedWorkers);
    };

    const acceptedWorker = () => {
        console.log("Accepted");
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                workers.length > 0 ? (<WorkerCard workerInfo={workers[0]} onRefused={()=>{removeRefusedWorker();}} onAccepted={()=>acceptedWorker()} />) : (<></>)
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create(
        {
            container:{
                flex:1,
                display:'flex',
                flexDirection: 'row',
                justifyContent:'center',
                alignItems:'center',
                flexWrap:'wrap',
            }
        }
);