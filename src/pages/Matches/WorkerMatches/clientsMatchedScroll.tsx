import { useEffect, useState } from "react";
import React from "react";
import { Text, View } from "react-native-animatable";
import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../../assets/colors";
import { client, interaction } from "../../Home/workerHome";
import ClientBox from "./clientBox";

const scrollRef = React.createRef<ScrollView>();

export default function ClientsMatchedScroll(props: any) {
  const { clientSelected, clientsMatched } = props;

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      ref={scrollRef}
      style={styles.scrollContainer}
      scrollEnabled={clientsMatched.length > 1}
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
      {clientsMatched.map((client: client) => {
        return (
          <ClientBox
            key={client.email}
            selectedClient={clientSelected?.email}
            clientInfo={client}
            onTouch={(client: client) => props.onClientSelected(client)}
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
