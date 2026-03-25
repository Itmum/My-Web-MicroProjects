const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income-amount");
const expenseEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transaction = JSON.parse(localStorage.getItem("transaction")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
	e.preventDefault();
	const transactionObj = {
		id: Date.now(),
		description: descriptionEl.value.trim(),
		amount: parseFloat(amountEl.value.trim()),
	};

	transaction.push(transactionObj);
	localStorage.setItem("transaction", JSON.stringify(transaction));

	updateTransactionList();
	updateSummary();

	transactionFormEl.reset();
}

function updateTransactionList() {
	transactionListEl.innerHTML = "";
	const sortedTransationList = [...transaction].sort((a, b) => b.id - a.id);

	sortedTransationList.forEach((e) => {
		const li = document.createElement("li");
		li.classList.add("transaction");
		li.classList.add(e.amount > 0 ? "incomeLi" : "expensesLi");

		li.innerHTML = `
            <span>${e.description}</span>
            <span>${formatCurrancy(e.amount)}
            <button class="delete-btn" onclick="removeTransaction(${e.id})">X</button>
            </span>
        `;
		transactionListEl.appendChild(li);
	});
}

function updateSummary() {
	const balance = [...transaction].reduce((acc, transaction) => acc + transaction.amount, 0);
	balanceEl.textContent = formatCurrancy(balance);

	const income = [...transaction].reduce((acc, transactionItem) => {
		if (transactionItem.amount >= 0) {
			acc = acc + transactionItem.amount;
		}
		return acc;
	}, 0);
	incomeEl.textContent = formatCurrancy(income);

	const expense = [...transaction].reduce((acc, transactionEl) => {
		return transactionEl.amount < 0 ? acc + transactionEl.amount : acc;
	}, 0);
	expenseEl.textContent = formatCurrancy(expense);
}

function removeTransaction(id) {
	transaction = [...transaction].filter((item) => item.id !== id);
	localStorage.setItem("transaction", JSON.stringify(transaction));
	updateSummary();
	updateTransactionList();
}

function formatCurrancy(number) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "BDT",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(number);
}
updateSummary();
updateTransactionList();
