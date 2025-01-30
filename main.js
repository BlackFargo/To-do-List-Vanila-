const inpValue = document.querySelector('#value')
const btn = document.querySelector('#addBtn')
const list = document.querySelector('#list')
const counterDiv = document.querySelector('.counter')
let isClicked = true
let counter = 0
let id = 0

const saveToLocal = () => {
	const items = []
	document.querySelectorAll('#list li').forEach(li => {
		items.push({
			id: li.id,
			text: li.querySelector('p').textContent,
		})
	})
	localStorage.setItem('todoList', JSON.stringify(items))
}

const loadFromLocalStorage = () => {
	const data = localStorage.getItem('todoList')
	if (data) {
		const items = JSON.parse(data)
		items.forEach(item => addItem(item.text, item.id))
	}
}

const addItem = (text, itemId = null) => {
	const li = document.createElement('li')
	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.setAttribute('type', 'button')
	deleteBtn.textContent = 'Delete'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.setAttribute('type', 'button')
	editBtn.textContent = 'Edit'

	li.innerHTML = `<p>${text}</p>`
	li.appendChild(deleteBtn)
	li.appendChild(editBtn)

	id = itemId ?? ++id

	li.setAttribute('id', id)
	list.appendChild(li)

	counter++
	counterDiv.innerHTML = `Count: ${counter}`
	saveToLocal()

	deleteBtn.addEventListener('click', () => {
		li.remove()
		counter--
		counterDiv.textContent = `Count: ${counter}`
		saveToLocal()
	})
	editBtn.addEventListener('click', () => {
		const existingInput = li.querySelector('.inp')

		if (existingInput) {
			existingInput.remove()
		}

		const inp = document.createElement('textarea')
		inp.classList.add('inp')
		inp.value = li.textContent.replace('DeleteEdit', '').trim()

		li.appendChild(inp)
		inp.focus()

		inp.addEventListener('blur', () => {
			const newValue = inp.value.trim()
			if (newValue !== '') {
				li.innerHTML = `<p>${newValue}</p>`
				li.appendChild(deleteBtn)
				li.appendChild(editBtn)
			} else {
				li.innerHTML = `<p>${value1}</p>`
				li.appendChild(deleteBtn)
				li.appendChild(editBtn)
			}
			saveToLocal()
		})
	})
}

btn.addEventListener('click', () => {
	if (inpValue.value !== '') {
		addItem(inpValue.value)
		inpValue.value = ''
	}
})

loadFromLocalStorage()
