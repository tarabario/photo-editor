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
			child.setAttribute('hidden', '');
		})
	};

	const showDropareaChildren = () => {
		[...dropareaChildren].forEach(child => {
			child.removeAttribute('hidden');
		})
	};

	const displayImage = (e) => {
		let files;
		if (e.type === 'drop') {
			files = e.dataTransfer.files;
		} else if (e.type === 'change') {
			files = e.target.files;
		}
		const image = document.createElement('img');
		image.classList.add('source-image');
		image.src = URL.createObjectURL(files[0]),
		image.alt = files[0].name
		const imageBox = document.createElement('div');
		imageBox.classList.add('image-box');
		droparea.appendChild(imageBox).appendChild(image);
	};

	['dragover', 'dragleave', 'drop', 'change'].forEach(evtName => {
		droparea.addEventListener(evtName, prevents)
	});

	['dragover'].forEach(evtName => {
		droparea.addEventListener(evtName, hideDropareaChildren)
	});

	['dragleave', 'drop'].forEach(evtName => {
		droparea.addEventListener(evtName, showDropareaChildren)
	});

	droparea.addEventListener('drop', (e) => {
		hideDropareaChildren();
		displayImage(e)
	});

	const uploadButton = document.querySelector('input[type=file]');

	uploadButton.addEventListener('change', (e) => {
		hideDropareaChildren();
		displayImage(e);
	});
}


const initApp = () => {
	setValueImagers();
	trackValueImagers();
	dragAndDrop();
};

document.addEventListener('DOMContentLoaded', initApp);




