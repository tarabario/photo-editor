uploadButton.addEventListener('change', (e) => {
	const files = e.target.files;
	hideDropareaChildren();
	const image = Object.assign(document.createElement('img'), {
		class: 'source-image',
		src: URL.createObjectURL(files[0]),
		alt: files[0].name
	});
	const imageBox = Object.assig(document.createElement('div'), {class: 'image-box'});
	droparea.appendChild(imageBox).appendChild(image);
})