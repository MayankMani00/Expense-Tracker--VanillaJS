const balance = $('#balance');
const income = $('#income-amount');
const expense = $('#expense-amount');
const list = $('#list');
const form = $('#form');
const newText = $('#text');
const newAmount = $('#amount');
const addTransactionBtn = $('#additem');

let deleteBtn = $('.delete-btn');

let transactions =
	localStorage.getItem('transactions') !== null
		? JSON.parse(localStorage.getItem('transactions'))
		: [];

//Adds a transaction into the list
function updateTransaction() {
	list[0].innerHTML = '';
	transactions.forEach((transaction) => {
		const sign = transaction.amount > 0 ? '+' : '-';
		const item = document.createElement('li');

		item.classList.add(sign == '-' ? 'minus' : 'plus');
		item.innerHTML = `${transaction.text}<span>${sign}$${Math.abs(
			transaction.amount
		)}</span><button class = "delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

		list[0].appendChild(item);
	});
	localStorage.setItem('transactions', JSON.stringify(transactions));
	updateBalance();
}

//Initializes data
function init() {
	list.innerHTML = '';
	updateTransaction();
}

//Updates total balance
function updateBalance() {
	const total = transactions.reduce((acc, item) => acc + +item.amount, 0);
	balance[0].innerText = `$${total}`;
	updateDetails();
}

//Updates income and expense
function updateDetails() {
	let incomeAmount = 0,
		expenseAmount = 0;
	transactions.forEach((item) => {
		item.amount > 0
			? (incomeAmount += +item.amount)
			: (expenseAmount += +item.amount);
	});
	income[0].innerText = `$${Math.abs(incomeAmount)}`;
	expense[0].innerText = `$${Math.abs(expenseAmount)}`;
	deleteBtn = $('.delete-btn');
}

//EVENT LISTENERS

//Collects data from form
addTransactionBtn.click((e) => {
	e.preventDefault();

	transactions.push({
		id     : transactions.length + 1,
		text   : newText[0].value,
		amount : newAmount[0].value
	});
	updateTransaction();
	newText[0].value = '';
	newAmount[0].value = '';
});

function removeTransaction(id) {
	transactions = transactions.filter((transaction) => transaction.id !== id);
	updateTransaction();
}

init();
