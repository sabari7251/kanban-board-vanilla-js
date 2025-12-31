import KanbanAPI from "./api/kanbanAPI.js";
import Column from "./ui/column.js";

const kanban = document.querySelector(".kanban");

function renderBoard() {
    kanban.innerHTML = ""; // Clear Old UI

    const board = KanbanAPI.getItems();
    board.forEach(column => {
        kanban.appendChild(Column(column));
    });
}

renderBoard();


window.addEventListener("kanban:update", () => {
    renderBoard();
});
