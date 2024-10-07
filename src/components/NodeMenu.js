// NodeMenu.js
import React, { useEffect } from "react";
import { Menu } from "react-native-paper";

const NodeMenu = ({ visible, closeMenu, anchor, node }) => {
  const { id } = node;
  console.log(
    `Posicion del nodo segun NodeMenu anchor fuera useEffect: `,
    anchor
  );
  useEffect(() => {
    if (node.id === 3) {
      console.log(`Posicion del nodo segun NodeMenu anchor: `, anchor);
    }
  }, [anchor]);

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      <Menu.Item
        onPress={() => console.log("Option 1 pressed")}
        title={node.id}
      />
      <Menu.Item
        onPress={() => console.log("Option 2 pressed")}
        title="Option 2"
      />
    </Menu>
  );
};

export default NodeMenu;
