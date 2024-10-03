// mindmapReducer.js

// Initial state for the reducer
const initialState = {
  nodes: [
    { id: 1, title: "Matematica", pos_x: 0, pos_y: 0 },
    { id: 2, title: "Programar", pos_x: 100, pos_y: 100 },
    { id: 3, title: "Gimnasio", pos_x: 150, pos_y: 150 },
  ],
};

// Action types
const SET_NODES = "SET_NODES";
const ADD_NODE = "ADD_NODE";
const UPDATE_NODE_POSITION = "UPDATE_NODE_POSITION";

// Reducer function
export function mindmapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NODES:
      return {
        ...state,
        nodes: action.payload, // Set initial nodes from the database
      };

    case ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload], // Add a new node
      };

    case UPDATE_NODE_POSITION:
      const { id, pos_x, pos_y } = action.payload;

      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, pos_x, pos_y } : node
        ),
      };

    default:
      return state;
  }
}

// Action creators
export function setNodes(nodes) {
  return { type: SET_NODES, payload: nodes };
}

export function addNode(node) {
  return { type: ADD_NODE, payload: node };
}

export function updateNodePosition(newPosition) {
  return {
    type: UPDATE_NODE_POSITION,
    payload: newPosition,
  };
}
