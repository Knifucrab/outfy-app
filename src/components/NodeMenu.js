// NodeMenu.js
import React from "react";
import { Menu } from "react-native-paper";

const NodeMenu = ({ visible, closeMenu, anchor }) => {
  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      <Menu.Item
        onPress={() => console.log("Option 1 pressed")}
        title="Option 1"
      />
      <Menu.Item
        onPress={() => console.log("Option 2 pressed")}
        title="Option 2"
      />
    </Menu>
  );
};

export default NodeMenu;
