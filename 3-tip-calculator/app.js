const userTipPercent = document.querySelector('#tip-output');
const tipRangeInput = document.querySelector('#tip');

const splitNumberElement = document.querySelector('#split-output');
const splitRangeInput = document.querySelector('#split');
const splitPerPersonElement = document.querySelector('#split-per-person');

const billInput = document.querySelector('#bill');

tipRangeInput.addEventListener('input', (e) => {
  userTipPercent.textContent = e.target.value + '%';

  if (billInput.value > 0) {
    calculateTotal();
  }
});

splitRangeInput.addEventListener('input', (e) => {
  splitNumberElement.textContent = e.target.value;

  if (billInput.value > 0) {
    calculateTotal();
  }
});

const calculatedTipElement = document.querySelector('#calculated-tip');
const totalElement = document.querySelector('#total');

billInput.addEventListener('input', (e) => {
  // const tipPercentValue = parseInt(userTipPercent.textContent) / 100;
  // const billAmount = Number(e.target.value);
  // const calculatedTipValue = billAmount * tipPercentValue.toFixed(2);

  // const totalValue = billAmount + calculatedTipValue;

  // calculatedTipElement.textContent = calculatedTipValue;
  // totalElement.textContent = totalValue;

  if (e.target.value > 0) {
    calculateTotal();
  }
});

function calculateTotal() {
  // 1- get the bill amount from the user
  const billAmount = Number(billInput.value);

  // 2-Get the tip percentage value
  const tipPercentValue = parseInt(userTipPercent.textContent) / 100;

  // 3- calculate tip value
  const calculatedTipValue = Number((billAmount * tipPercentValue).toFixed(2));

  // 4- calculate the total
  const totalBill = (billAmount + calculatedTipValue).toFixed(2);

  // 5- get the split per people number
  const splitNumber = Number(splitRangeInput.value);

  updateUi(calculatedTipValue, totalBill, splitNumber);
}

function updateUi(calculatedTip, totalBill, splitNumber) {
  // 1- Update Tip Element
  calculatedTipElement.textContent = calculatedTip;

  // 2- Update Total Element
  totalElement.textContent = totalBill;

  // 3-Update Split Per Person Element
  splitPerPersonElement.textContent = (totalBill / splitNumber).toFixed(2);
}
