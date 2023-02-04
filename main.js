const root = document.querySelector(':root');
const valueImagers = document.querySelectorAll('.value-imager');
const settingInputs = document.querySelectorAll('input[type=range]');
const droparea = document.querySelector('#photo-container');
const dropareaChildren = droparea.children;
const uploadIcon = droparea.querySelector('i');
const settingPanel = document.querySelector('#setting-container')

const uploadButton = document.querySelector('#image-file');
const anotherImageButton = document.querySelector('#another-image');
const resetButton = document.querySelector('.reset-button');
const saveButton = document.querySelector('.save-button');

const image = document.querySelector('.source-image');
const imageBox = document.querySelector('.image-box');
const canvas = document.querySelector('#image-canvas');
const context = canvas.getContext('2d');
let fileName;

console.log(anotherImageButton);


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
		input.addEventListener('input', () => {
		const imager = input.nextElementSibling;
		imager.textContent = input.value;
		input.value = imager.textContent;
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
		fileName = files[0].name;
		image.src = URL.createObjectURL(files[0]);
		image.alt = "your image";
		image.onload = () => {
			canvas.width = image.naturalWidth;
			canvas.height = image.naturalHeight;
			imageBox.removeAttribute('hidden');
			image.removeAttribute('hidden');
		}
		droparea.style.width = '60%';
		settingPanel.style.display = 'flex';
	};

	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
		droparea.addEventListener(evtName, prevents);
	});

	['dragenter', 'dragover'].forEach(evtName => {
		droparea.addEventListener(evtName, () => {
			if (image.src === document.location.href) {
				hideUploadElements();
				showUploadIcon();
			} else {
				droparea.style.filter = 'contrast(80%)';
			}
		})
	});

	droparea.addEventListener('dragleave', () => {
		if (image.src === document.location.href) {
			hideUploadIcon();
			showUploadElements();
		} else {
			droparea.style.filter = null;
		}
	});

	droparea.addEventListener('drop', (e) => {
		if (image.src === document.location.href) {
			hideUploadIcon();
			displayImage(e);
		} else {
			const areYouSure = confirm("Are you sure you want to change the picture without saving?");
			if (areYouSure) {
				hideUploadIcon();
				displayImage(e);
			}
			droparea.style.filter = null;
		}
	
	});
	
	uploadButton.addEventListener('change', (e) => {
		hideUploadElements();
		displayImage(e);
	});
	
	anotherImageButton.addEventListener('click', () => {
		if (!(image.classList.contains('saved'))) {
			const areYouSure = confirm("Are you sure you want to change the picture without saving?");
			if (!areYouSure) {
				anotherImageButton.disabled = true;
				setTimeout(() => { anotherImageButton.disabled = false; }, 1);
			} else {
				anotherImageButton.addEventListener('change', (e) => {
					displayImage(e);
				})
			}
		} else {
			anotherImageButton.addEventListener('change', (e) => {
				displayImage(e);
			})
		}
	})
}










const editImage = () => {
	const editing = () => {
		let filterStr = '';
		settingInputs.forEach(input => {
			if (input.name === 'hue-rotate') {
				filterStr += `${input.name}(${input.value}deg)`;
			} else {
				filterStr += `${input.name}(${input.value}%)`;
			}
		});
		image.style.filter = filterStr;
		context.filter = filterStr;
		filterStr = '';
	}

	settingInputs.forEach(input => {
		input.addEventListener('input', editing)
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
		image.style.filter = '';
		context.filter = '';
	})
}

const saveImage = () => {
	saveButton.addEventListener('click', () => {
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		let jpegURL = canvas.toDataURL('image/jpg')
		const link = document.createElement('a');
		link.href = jpegURL;
		link.download = fileName;
		link.click();
		link.remove()
		image.classList.add('saved');
	})
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




