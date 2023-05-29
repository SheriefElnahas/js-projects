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
  // const tipPercentValue = parseInt(userTipPercent.textContent) / 100;
  // const billAmount = Number(e.target.value);
  // const calculatedTipValue = billAmount * tipPercentValue.toFixed(2);

  // const totalValue = billAmount + calculatedTipValue;

  // calculatedTipElement.textContent = calculatedTipValue;
  // totalElement.textContent = totalValue;

  calculateTotal();
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
  console.log(`bill amount : ${billAmount} - calculated tip value ${typeof calculatedTipValue} - total bill : ${totalBill}`);
  updateUi(calculatedTipValue, totalBill);
}

function updateUi(calculatedTip, totalBill) {
  calculatedTipElement.textContent = calculatedTip;
  totalElement.textContent = totalBill;
}
