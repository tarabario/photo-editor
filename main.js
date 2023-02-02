const valueImagers = document.querySelectorAll('.value-imager');
const settingInputs = document.querySelectorAll('input[type=range]');
const droparea = document.querySelector('#photo-container');
const dropareaChildren = droparea.children;
const uploadIcon = droparea.querySelector('i');
const uploadButton = document.querySelector('input[type=file]');


const prevents = (e) => e.preventDefault();

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

const hideUploadElements = () => {
	[...dropareaChildren].slice(0, 3).forEach(child => {
		child.setAttribute('hidden', '');
	})
};

const showUploadElements = () => {
	[...dropareaChildren].slice(0, 3).forEach(child => {
		child.removeAttribute('hidden');
	})
};

const hideUploadIcon = () => {
	uploadIcon.setAttribute('hidden', '');
}

const showUploadIcon = () => {
	uploadIcon.removeAttribute('hidden');
}

const uploadImage = () => {
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

	['dragenter', 'dragover', 'dragleave', 'drop', 'change'].forEach(evtName => {
		droparea.addEventListener(evtName, prevents);
	});

	['dragenter', 'dragover'].forEach(evtName => {
		droparea.addEventListener(evtName, () => {
			hideUploadElements();
			showUploadIcon();
			console.log('over');
		})
	});

	droparea.addEventListener('dragleave', () => {
			hideUploadIcon();
			showUploadElements();
			console.log('leave');
	});

	droparea.addEventListener('drop', (e) => {
		hideUploadElements();
		displayImage(e);
	});
	
	uploadButton.addEventListener('change', (e) => {
		hideUploadElements();
		displayImage(e);
	});
}


const initApp = () => {
	setValueImagers();
	trackValueImagers();
	uploadImage();
};

document.addEventListener('DOMContentLoaded', initApp);




