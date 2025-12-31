import KanbanAPI from "../api/kanbanAPI.js";

export default function Item(item, columnId) {

    // Root (drag surface)
    const itemRoot = document.createElement("div");
    itemRoot.classList.add("kanban__item-input");
    itemRoot.dataset.id = item.id;
    itemRoot.setAttribute("draggable", "true");
    itemRoot.style.position = "relative";

    // Editable text ONLY
    const itemContent = document.createElement("div");
    itemContent.textContent = item.content;
    itemContent.setAttribute("contenteditable", "false");
    itemContent.style.outline = "none";
    itemContent.style.paddingRight = "20px";
    itemContent.classList.add("kanban__item-edit")

    // Delete button 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    Object.assign(deleteBtn.style, {
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "transparent",
        border: "none",
        color: "#aaa",
        fontSize: "20px",
        cursor: "pointer",
        fontWeight: "bold",
        lineHeight: "15px"
    });
    deleteBtn.setAttribute("contenteditable", "false");

    /* ---------------- EVENTS ---------------- */

    // Enable edit
    itemContent.addEventListener("click", () => {
        itemContent.setAttribute("contenteditable", "true");
        itemContent.focus();
        moveCaretToEnd(itemContent);
    });

    // Save on blur
    itemContent.addEventListener("blur", () => {
        itemContent.setAttribute("contenteditable", "false");

        const board = KanbanAPI.getItems();
        const column = board.find(col => col.id == columnId);
        const task = column.items.find(it => it.id == itemRoot.dataset.id);

        task.content = itemContent.textContent;
        KanbanAPI.saveItems(board);
    });

    // Drag
    itemRoot.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", itemRoot.dataset.id);
    });

    // Delete
    deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const board = KanbanAPI.getItems();
    const column = board.find(c => c.id == columnId);

    column.items = column.items.filter(
        i => i.id != itemRoot.dataset.id
    );

    KanbanAPI.saveItems(board);

    // re-render (no reload)
    window.dispatchEvent(new Event("kanban:update"));
});


   deleteBtn.style.opacity = "0";
    deleteBtn.style.pointerEvents = "none";

    itemRoot.addEventListener("mouseenter", () => {
        deleteBtn.style.opacity = "1";
        deleteBtn.style.pointerEvents = "auto";
        deleteBtn.style.color="red";
    });

    itemRoot.addEventListener("mouseleave", () => {
        deleteBtn.style.opacity = "0";
        deleteBtn.style.pointerEvents = "none";
    });

     /* -------------- REORDERING INSIDE COLUMN-------------- */

     itemRoot.addEventListener("dragover",(e)=>
    {
        e.preventDefault();
    })

    itemRoot.addEventListener("drop", (e) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("text/plain");
    const targetId = itemRoot.dataset.id;

    if (draggedId === targetId) return;

    const board = KanbanAPI.getItems();
    const draggedColumn = board.find(col =>
        col.items.some(i => i.id == draggedId)
    );

    //  If coming from another column, DO NOTHING here
    if (draggedColumn.id !== columnId) {
        return; // allow bubbling → Column.js handles it
    }

    // SAME column → reorder
    e.stopPropagation();

    const column = board.find(c => c.id == columnId);
    const fromIndex = column.items.findIndex(i => i.id == draggedId);
    const toIndex = column.items.findIndex(i => i.id == targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [movedItem] = column.items.splice(fromIndex, 1);
    column.items.splice(toIndex, 0, movedItem);

    KanbanAPI.saveItems(board);
    window.dispatchEvent(new Event("kanban:update"));

});



    /* -------------- ASSEMBLE -------------- */

    itemRoot.appendChild(deleteBtn);
    itemRoot.appendChild(itemContent);

    return itemRoot;
}
function moveCaretToEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false); // false = move to end

    selection.removeAllRanges();
    selection.addRange(range);
}
