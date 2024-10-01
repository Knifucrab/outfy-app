import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

const DividerWithSpacer = () => {
  return (
    <View style={styles.dividerWithSpacer}>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerWithSpacer: {
    height: 20,
    justifyContent: "center",
  },
});

export default DividerWithSpacer;
