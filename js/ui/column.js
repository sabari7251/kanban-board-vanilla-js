import KanbanAPI from "../api/kanbanAPI.js";
import Item from "./item.js";

export default function Column(column) {
    const kan_column = document.createElement("div");
    kan_column.classList.add("kanban__column");

    // Title
    const kan_title = document.createElement("div");
    kan_title.classList.add("kanban__column-title");
    kan_title.textContent = column.title;

    // Items container
    const kan_items = document.createElement("div");
    kan_items.classList.add("kanban__items");

    
    kan_items.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    // Drop Logic
    kan_items.addEventListener("drop", (e) => {
        e.preventDefault();

        const draggedItemId = e.dataTransfer.getData("text/plain");
        const board = KanbanAPI.getItems();
        let draggedItem = null;

        board.forEach(col => {
            const index = col.items.findIndex(i => i.id == draggedItemId);
            if (index !== -1) {
                draggedItem = col.items[index];
                col.items.splice(index, 1);
            }
        });

        const targetColumn = board.find(col => col.id == column.id);
        if (draggedItem && targetColumn) {
            targetColumn.items.push(draggedItem);
        }

        KanbanAPI.saveItems(board);
        window.dispatchEvent(new Event("kanban:update"));
    });

    // Render items
    column.items.forEach(item => {
        const itemEl = Item(item, column.id);
        kan_items.appendChild(itemEl);
    });

    // Add button
    const addBtn = document.createElement("button");
    addBtn.classList.add("kanban__add-item");
    addBtn.type = "button";
    addBtn.textContent = "+ Add";

    addBtn.addEventListener("click", () => {
        const board = KanbanAPI.getItems();
        const targetColumn = board.find(col => col.id == column.id);

        targetColumn.items.push({
            id: Math.floor(Math.random() * 100000),
            content: ""
        });

        KanbanAPI.saveItems(board);
        window.dispatchEvent(new Event("kanban:update"));

    });

    
    kan_column.appendChild(kan_title);
    kan_column.appendChild(kan_items);
    kan_column.appendChild(addBtn);

    return kan_column;
}
