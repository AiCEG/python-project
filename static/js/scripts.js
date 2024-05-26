document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.getElementById("todo-list");
  let draggedItem = null;

  todoList.addEventListener("dragstart", function (e) {
    draggedItem = e.target;
    e.target.style.opacity = 0.5;
  });

  todoList.addEventListener("dragend", function (e) {
    e.target.style.opacity = "";
    draggedItem = null;
    saveOrder();
  });

  todoList.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  todoList.addEventListener("drop", function (e) {
    e.preventDefault();
    if (
      e.target.className.includes("list-group-item") &&
      e.target !== draggedItem
    ) {
      let allItems = [...todoList.querySelectorAll(".list-group-item")];
      let draggedIndex = allItems.indexOf(draggedItem);
      let targetIndex = allItems.indexOf(e.target);

      if (draggedIndex < targetIndex) {
        e.target.after(draggedItem);
      } else {
        e.target.before(draggedItem);
      }
    }
  });

  function saveOrder() {
    let order = [...todoList.querySelectorAll(".list-group-item")].map(
      (item) => item.dataset.id
    );
    fetch("/update_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    }).then((response) => {
      if (!response.ok) {
        console.error("Failed to save order");
      }
    });
  }
});
