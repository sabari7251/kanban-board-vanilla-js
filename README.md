 Kanban Board (Vanilla JavaScript)

A Trello-like Kanban board built using **Vanilla JavaScript**, featuring drag-and-drop task management, persistent storage, and a modular architecture — without any frameworks.

##  Features
- Create, edit, delete tasks
- Drag & drop tasks between columns
- Reorder tasks within a column
- Persistent state using localStorage
- No page reloads (custom re-rendering)
- Clean modular structure (API / UI separation)

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6 Modules)

##  Architecture
- `KanbanAPI.js` → data & persistence layer
- `Column.js` → column rendering & logic
- `Item.js` → task rendering, editing, drag logic
- `main.js` → app entry & rendering control

##  What I Learned
- Handling complex drag-and-drop interactions
- Managing state without frameworks
- Event bubbling & propagation
- UI re-rendering without page refresh
- Modular JavaScript architecture

## Demo
Live demo (optional):  
https://sabari7251.github.io/kanban-board-vanilla-js/

##  How to Run
Just open `index.html` using Live Server or any local server.

