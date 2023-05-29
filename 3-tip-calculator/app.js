const tipPercent = document.querySelector('#tip-output');
const tipRangeInput = document.querySelector('#tip');

const splitNumber = document.querySelector('#split-output');
const splitRangeInput = document.querySelector('#split');

tipRangeInput.addEventListener('input', (e) => {
  tipPercent.textContent = e.target.value + '%';
});

splitRangeInput.addEventListener('input', (e) => {
  splitNumber.textContent = e.target.value;
});
