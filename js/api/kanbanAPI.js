export default class KanbanAPI
{
    static getItems()
    {
        const data = read();
        if(localStorage.getItem("kanban-data") === null)
            this.saveItems(data);
        return data;
    }

    static saveItems(data)
    {
        console.log("SAVING", data);
        const result = JSON.stringify(data);
        localStorage.setItem("kanban-data",result);
    }
}




function read()
{
    const Json =localStorage.getItem("kanban-data")

    if(!Json)
    {
        return [
            {
                id:"1",
                title:"Not Started",
                items:[]
            },
            {
                id:"2",
                title:"In Progress",
                items:[]
            },
            {
                id:"3",
                title:"Completed",
                items:[]
            }
        ];
    }

    return JSON.parse(Json);
}