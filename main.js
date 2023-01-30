const settingValues = document.querySelectorAll('.setting-value');

settingValues.forEach(setting => {
	const input = setting.previousElementSibling;
	setting.textContent = input.value;
})

const inputs = document.querySelectorAll('[type="range"]');

inputs.forEach(input => {
	input.addEventListener('change', () => {
		settingValues.forEach(setting => {
			const input = setting.previousElementSibling;
			setting.textContent = input.value;
		})
	})
})


