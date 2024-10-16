const url = 'http://localhost:3333/tasks'
const tbody = document.querySelector("tbody")
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task')

const fetchTasks = async () => {
    const response = await fetch(url)
    const tasks = await response.json()
    return tasks
}

const addTask = async (event) => {
    event.preventDefault()

    const task = { title: inputTask.value }

    await fetch(url , {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task)
    })
    
    loadTasks()
    inputTask.value = ''
}

const deleteTask = async (id) => {
    await fetch(`${url}/${id}`, {
        method: `delete`,
    })

    loadTasks()
}

const updateTask = async ({id ,title, status}) => {

    await fetch(`${url}/${id}`, {
        method: `put`,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, status })
    })

    loadTasks()
}

const formatDate = (dataUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dataUTC).toLocaleString('pt-br',options)
    return date
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag)

    if(innerText) 
        element.innerText = innerText

    if(innerHTML) 
        element.innerHTML = innerHTML

    return element
}

const createButton = (innerText = '') => {
    const btn = document.createElement('button')
    const span = document.createElement('span')

    btn.classList.add("btn-action")

    span.innerText = innerText
    span.classList.add("material-symbols-outlined")

    btn.appendChild(span)

    return btn
}

const createSelect = (values = [""],value = "") => {
    const select = document.createElement('select')
    const options = values.map(createOption)

    options.forEach(option => {
        select.appendChild(option)
    })

    if(value)
        select.value = value

    return select    
}

const createOption = (value = '') => {
    option = createElement("option", value)
    option.value = value

    return option
}

const createRow = (task) => {

    const {id ,title, created_at, status} = task
    const options = ['pendente', 'em andamento', 'concluido']

    const tr = createElement('tr')
    const tdTitle = createElement('td', title)
    const tdCreatedAt = createElement('td', formatDate(created_at))
    const tdStatus = createElement('td')
    const tdActions = createElement('td')

    const select = createSelect(options,status)
    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value}))
    tdStatus.appendChild(select)

    const editButton = createButton("edit")
    const deleteButton = createButton("delete")

    
    const editForm = createElement('form')
    const editInput = createElement('input')
    editInput.value = title

    editForm.appendChild(editInput)
    editForm.addEventListener('submit', (event) => {
        event.preventDefault()
        updateTask({ id, title: editInput.value, status })
    })
    
    editButton.addEventListener('click', () => {
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })



    deleteButton.addEventListener('click',() => deleteTask(id))

    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)

    tr.appendChild(tdTitle)
    tr.appendChild(tdCreatedAt)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)

    return tr
}

const loadTasks = async () => {
    const tasks = await fetchTasks()

    tbody.innerHTML = ''
    
    tasks.forEach(task => {
        const tr = createRow(task)
        tbody.appendChild(tr)
    })
}

addForm.addEventListener('submit', addTask)

loadTasks()