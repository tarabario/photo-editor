const root = document.querySelector(':root');
const valueImagers = document.querySelectorAll('.value-imager');
const settingInputs = document.querySelectorAll('input[type=range]');
const droparea = document.querySelector('#photo-container');
const dropareaChildren = droparea.children;
const uploadIcon = droparea.querySelector('i');
const uploadButton = document.querySelector('input[type=file]');
const resetButton = document.querySelector('.reset-button');
const saveButton = document.querySelector('.save-button');
const image = document.querySelector('.source-image');
const imageBox = document.querySelector('.image-box');
const canvas = document.querySelector('#image-canvas');
const context = canvas.getContext('2d');

const prevents = (e) => e.preventDefault();

const hideUploadElements = () => {
	[...dropareaChildren].slice(0, 3).forEach(child => {
		child.setAttribute('hidden', '');
	});
};

const showUploadElements = () => {
	[...dropareaChildren].slice(0, 3).forEach(child => {
		child.removeAttribute('hidden');
	});
};

const hideUploadIcon = () => {
	uploadIcon.setAttribute('hidden', '');
};

const showUploadIcon = () => {
	uploadIcon.removeAttribute('hidden');
};



const setValueImagers = () => {
	valueImagers.forEach(imager => {
		const relativeInput = imager.previousElementSibling;
		imager.textContent = relativeInput.value;
	});
};

const trackValueImagers = () => {
	settingInputs.forEach(input => {
		['mousemove', 'change'].forEach(evtName => {
			input.addEventListener(evtName, () => {
			const imager = input.nextElementSibling;
			imager.textContent = input.value;
			input.value = imager.textContent;
			});
		});
	});
};

const uploadImage = () => {
	const displayImage = (e) => {
		let files;
		if (e.type === 'drop') {
			files = e.dataTransfer.files;
		} else if (e.type === 'change') {
			files = e.target.files;
		}
		image.src = URL.createObjectURL(files[0]);
		image.alt = "haha";
		canvas.height = image.naturalHeight;
		canvas.width = image.naturalWidth;
		canvas.removeAttribute('hidden');
		imageBox.removeAttribute('hidden');
		image.removeAttribute('hidden');
	};

	['dragenter', 'dragover', 'dragleave', 'drop', 'change'].forEach(evtName => {
		droparea.addEventListener(evtName, prevents);
	});

	['dragenter', 'dragover'].forEach(evtName => {
		droparea.addEventListener(evtName, () => {
			hideUploadElements();
			showUploadIcon();
		})
	});

	droparea.addEventListener('dragleave', () => {
			hideUploadIcon();
			showUploadElements();
	});

	droparea.addEventListener('drop', (e) => {
		hideUploadIcon();
		displayImage(e);
	});
	
	uploadButton.addEventListener('change', (e) => {
		hideUploadElements();
		displayImage(e);
	});
}

const editImage = () => {
	settingInputs.forEach(input => {
		['mousemove', 'change'].forEach(evtName => {
			input.addEventListener(evtName, () => {
				if (input.name === 'hue-rotate') {
					root.style.setProperty(`--${input.name}`, `${input.name}(${input.value}deg)`);
				} else {
					root.style.setProperty(`--${input.name}`, `${input.name}(${input.value}%)`);
				}
			})
		})
	
	})
}

const resetSettings = () => {
	resetButton.addEventListener('click', () => {
		settingInputs.forEach(input => {
			input.value = input.dataset.initial;
		})
		valueImagers.forEach(imager => {
			const relativeInput = imager.previousElementSibling;
			imager.textContent = relativeInput.dataset.initial;
		})
		settingInputs.forEach(input => {
			if (input.name === 'hue-rotate') {
				root.style.setProperty(`--${input.name}`, `${input.name}(${input.dataset.initial}deg)`);
			} else {
				root.style.setProperty(`--${input.name}`, `${input.name}(${input.dataset.initial}%)`);
			}
		})
	})
}

const saveImage = () => {
}



const initApp = () => {
	setValueImagers();
	trackValueImagers();
	uploadImage();
	editImage();
	resetSettings();
	saveImage();
};

document.addEventListener('DOMContentLoaded', initApp);




