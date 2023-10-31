import { useEffect, useState } from "react";
import React from "react";
import { Text, View } from "react-native-animatable";
import ClientCard from "./clientCard";
import { ScrollView, StyleSheet } from "react-native";
import { scrollTo } from "react-native-reanimated";
import { colors } from "../../assets/colors";
import { client, interaction } from "./workerHome";

const scrollRef = React.createRef<ScrollView>();

export default function ClientScroll(props: any) {
  const { clientSelected, clients } = props;

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      ref={scrollRef}
      style={styles.scrollContainer}
      scrollEnabled={clients.length > 1}
      horizontal
      onContentSizeChange={() => {
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginLeft: "17%",
        gap: 20,
      }}
    >
      {clients.map((client: client) => {
        return (
          <ClientCard
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
