// Action : 어떤 동작이 발생했는지를 설명하는 객체

export const addTodo = (text: string) => ({
  type: "ADD_TODO",
  text,
});
