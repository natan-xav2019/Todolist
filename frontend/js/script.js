const url = 'http://localhost:3333/tasks' 

const fetchTasks = async () => {
    const response = await fetch(url)
    const tasks = await response.json()
    return tasks
}