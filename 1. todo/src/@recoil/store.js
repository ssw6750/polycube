import { atom, selector } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const filterState = atom({
  key: "filterState",
  default: "latest",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(filterState);
    const todoList = get(todoListState);

    switch (filter) {
      case "latest":
        return [...todoList].sort((a, b) => b.time - a.time);
      case "oldest":
        return [...todoList].sort((a, b) => a.time - b.time);
      default:
        return todoList;
    }
  },
});
