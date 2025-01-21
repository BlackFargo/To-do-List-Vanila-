const inpValue = document.querySelector('#value')
const btn = document.querySelector('#addBtn')
const list = document.querySelector('#list')
let isClicked = true

btn.addEventListener('click', () => {
	if (inpValue.value !== '') {
		const value1 = inpValue.value
		const li = document.createElement('li')
		const deleteBtn = document.createElement('button')
		deleteBtn.setAttribute('type', 'button')
		deleteBtn.textContent = 'Delete'

		const editBtn = document.createElement('button')
		editBtn.setAttribute('type', 'button')
		editBtn.textContent = 'Edit'

		li.textContent = value1
		li.appendChild(deleteBtn)
		li.appendChild(editBtn)

		deleteBtn.addEventListener('click', () => {
			li.remove()
		})

		list.appendChild(li)
		inpValue.value = ''

		editBtn.addEventListener('click', () => {
			const existingInput = li.querySelector('.inp')
			if (existingInput) {
				existingInput.remove()
			}

			const inp = document.createElement('input')
			inp.classList.add('inp')
			inp.value = li.textContent.replace('DeleteEdit', '').trim()

			li.appendChild(inp)
			inp.focus()

			inp.addEventListener('blur', () => {
				const newValue = inp.value.trim()
				if (newValue !== '') {
					li.innerHTML = newValue
					li.appendChild(deleteBtn)
					li.appendChild(editBtn)
				} else {
					li.innerHTML = value1
					li.appendChild(deleteBtn)
					li.appendChild(editBtn)
				}
			})
		})
	}
})
