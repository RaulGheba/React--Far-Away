import { useState } from "react";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import Form from "./Form";
export default function App() {
  const [items, setItems] = useState([]); //since this is a list of items, the initial state is an empty array
  function handleAddItems(item) {
    setItems((items) => [...items, item]); //the current items array + the new item added to the end. so the new state depends on the current state, so we need a callback function. we will call the current state in this callback 'items'. since we CANNOT mutate in React, we must create a new array which contains all the current items + the new one. Remember, setItems KNOWS it should target items, so i could have passed any
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id)); //FILTERS out the array based on this condition. WHENEVER the condition is true, the item ends up in the array of the items that have NOT been deleted. BUT when false (when item.id = id), then that element will no longer be part of the final array.
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
