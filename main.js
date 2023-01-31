const valueImagers = document.querySelectorAll('.value-imager');
const settingInputs = document.querySelectorAll('input[type=range]');

const setValueImagers = () => {
	valueImagers.forEach(imager => {
		const relativeInput = imager.previousElementSibling;
		imager.textContent = relativeInput.value;
	});
};

const trackValueImagers = () => {
	settingInputs.forEach(input => {
		input.addEventListener('mousemove', (e) => {
			const imager = input.nextElementSibling;
			imager.textContent = input.value;
		})
	});
};


const dragAndDrop = () => {
	const droparea = document.querySelector('#photo-container');
	const dropareaChildren = droparea.children;

	const prevents = (e) => e.preventDefault();
	
	const hideDropareaChildren = () => {
		[...dropareaChildren].forEach(child => {
			child.setAttribute('hidden', 'true');
		})
	}

	const showDropareaChildren = () => {
		[...dropareaChildren].forEach(child => {
			child.removeAttribute('hidden');
		})
	}

	['dragover', 'dragleave', 'drop'].forEach(evtName => {
		droparea.addEventListener(evtName, prevents)
	});

	['dragover'].forEach(evtName => {
		droparea.addEventListener(evtName, hideDropareaChildren)
	});

	['dragleave', 'drop'].forEach(evtName => {
		droparea.addEventListener(evtName, showDropareaChildren)
	});

	droparea.addEventListener('drop', (e) => {
		const files = e.dataTransfer.files;

		const image = `<div class="image-box"><img class="source-image" src="${URL.createObjectURL(files[0])}" alt="source-image"></div>`
		hideDropareaChildren();
		droparea.innerHTML = image;
	})
}




const initApp = () => {
	setValueImagers();
	trackValueImagers();
	dragAndDrop();
}

document.addEventListener('DOMContentLoaded', initApp);




