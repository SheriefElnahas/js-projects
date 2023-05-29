const userTipPercent = document.querySelector('#tip-output');
const tipRangeInput = document.querySelector('#tip');

const splitNumberElement = document.querySelector('#split-output');
const splitRangeInput = document.querySelector('#split');

tipRangeInput.addEventListener('input', (e) => {
  userTipPercent.textContent = e.target.value + '%';
});

splitRangeInput.addEventListener('input', (e) => {
  splitNumberElement.textContent = e.target.value;
});

const billInput = document.querySelector('#bill');
const calculatedTipElement = document.querySelector('#calculated-tip');
const totalElement = document.querySelector('#total');

billInput.addEventListener('input', (e) => {
  // 1-get tip percent value
  const tipPercentValue = parseInt(userTipPercent.textContent) / 100;
  const billAmount = Number(e.target.value);
  const calculatedTipValue = billAmount * tipPercentValue.toFixed(2);

  const totalValue = billAmount + calculatedTipValue;
  console.log(totalValue);
  // console.log(+e.target.value)
  calculatedTipElement.textContent = calculatedTipValue ;
  totalElement.textContent = totalValue;

});
