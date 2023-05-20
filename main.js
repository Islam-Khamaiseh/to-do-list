const items = [];

function newItem(value) {
  return {
    text: value,
    checked: false,
    id: Date.now(),
  };
}

const inputTask = document.querySelector("#input-task");
const addTask = document.querySelector("#add-task");
const todoList = document.querySelector("#todo-list");
const clearDone = document.querySelector("#clear-done");
const clearAll = document.querySelector("#clear-all");

addTask.addEventListener("click", addItem);
clearDone.addEventListener("click", clearDoneItems);
clearAll.addEventListener("click", clearAllItems);

function addItem() {
  inputTask.value = inputTask.value.trim();
  if (inputTask.value === "") {
    alert("Please add something");
    return;
  }
  if (items.length == 13) {
    alert("The List Is Full");
    return;
  }
  items.push(newItem(inputTask.value));
  inputTask.value = "";
  inputTask.focus();
  renderItem(items[items.length - 1]);
}

function clearDoneItems() {
  if (confirm("Are you sure you want to remove the done tasks!")) {
    $("#todo-list").empty();
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        items.splice(i--, 1);
      } else {
        renderItem(items[i]);
      }
    }
  }
}

function clearAllItems() {
  if (confirm("Are you sure you want to remove all tasks!")) {
    while (items.length) {
      items.pop();
    }
    $("#todo-list").empty();
  }
}

function renderItem(obj) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const remove = document.createElement("button");
  const hr = document.createElement("hr");
  const edit = document.createElement("button");
  const editBox = document.createElement("input");
  const save = document.createElement("button");
  const cancel = document.createElement("button");

  label.innerText = obj.text;
  input.type = "checkbox";
  input.value = "True";
  remove.innerText = "remove";
  edit.innerText = "edit";
  editBox.value = obj.text;
  save.innerText = "save";
  cancel.innerText = "cancel";

  label.id = "label";
  input.id = "input";
  remove.id = "remove";
  edit.id = "edit";
  editBox.id = "editBox";
  save.id = "save";
  cancel.id = "cancel";

  remove.addEventListener("click", removeItem);
  function removeItem() {
    if (confirm("Are you sure you want to remove the task!")) {
      div.remove();
      items.splice(items.indexOf(obj), 1);
    }
  }

  input.addEventListener("change", checkboxItem);
  function checkboxItem() {
    if (this.checked) {
      obj.checked = true;
      label.style.textDecoration = "line-through";
      label.style.opacity = 0.5;
      label.style.fontStyle = "italic";
    } else {
      obj.checked = false;
      label.style.textDecoration = "none";
      label.style.opacity = 1;
      label.style.fontStyle = "normal";
    }
  }

  edit.addEventListener("click", editItem);
  function editItem() {
    label.style.visibility = "hidden";
    edit.style.visibility = "hidden";
    save.style.visibility = "visible";
    cancel.style.visibility = "visible";
    editBox.style.visibility = "visible";
    editBox.focus();
  }

  cancel.addEventListener("click", cancelEdit);
  function cancelEdit() {
    label.style.visibility = "visible";
    edit.style.visibility = "visible";
    save.style.visibility = "hidden";
    cancel.style.visibility = "hidden";
    editBox.style.visibility = "hidden";
    editBox.value = label.innerText;
  }

  save.addEventListener("click", saveEdit);
  function saveEdit() {
    label.style.visibility = "visible";
    edit.style.visibility = "visible";
    save.style.visibility = "hidden";
    cancel.style.visibility = "hidden";
    editBox.style.visibility = "hidden";
    editBox.value = editBox.value.trim();
    if (editBox.value == "") {
      editBox.value = label.innerText;
      alert("Please add something");
      return;
    }
    label.innerText = editBox.value;
    obj.text = editBox.value;
  }

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(editBox);
  div.appendChild(remove);
  div.appendChild(edit);
  div.appendChild(save);
  div.appendChild(cancel);
  div.appendChild(hr);
  todoList.appendChild(div);
}
