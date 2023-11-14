import { useEffect, useState } from "react";
import React from "react";
import { Text, View } from "react-native-animatable";
import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../../assets/colors";
import { workerInfo } from "./clientMatches";
import WorkerBox from "./workerBox";

const scrollRef = React.createRef<ScrollView>();

export default function WorkerMatchedScroll(props: any) {
  const { workerSelected, workersMatched } = props;

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      ref={scrollRef}
      style={styles.scrollContainer}
      scrollEnabled={workersMatched.length > 1}
      onContentSizeChange={() => {
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      {workersMatched.map((worker: workerInfo) => {
        return (
          <WorkerBox
            key={worker.email}
            selectedWorker={workerSelected?.email}
            workerInfo={worker}
            onTouch={(worker: workerInfo) => props.onWorkerSelected(worker)}
            onCancelMatch={(worker: workerInfo) => props.onCancelMatch(worker)}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: colors.white,
  },
});
