const form = document.getElementById("card_form");
const cardholderName = document.getElementById("cardholder_name");
const cardNumber = document.getElementById("cardnumber");
const cardExpiredMonth = document.getElementById("cardexpired_month");
const cardExpiredYear = document.getElementById("cardexpired_year");
const cardSecretCode = document.getElementById("secretcode");

const completeState = document.getElementById("complete__state");

//card section
const cardFrontNumber = document.getElementById("card__front-number");
const cardFrontName = document.getElementById("card__front-name");
const cardFrontExpired = document.getElementById("card__front-expired");
const cardBackNumber = document.getElementById("card__back-number");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const cardholderNameValue = cardholderName.value;
	const cardNumberValue = cardNumber.value;
	cardFrontNumber.classList.add("card__front-number");
	const cardExpiredMonthValue = cardExpiredMonth.value;
	const cardExpiredYearValue = cardExpiredYear.value;
	const secretcodeValue = cardSecretCode.value;

	if (validateInputs()) {
		form.style.display = "none";
		completeState.style.display = "flex";
		cardFrontNumber.textContent = cardNumberValue;
		cardFrontName.textContent = cardholderNameValue;
		cardFrontExpired.textContent = `${cardExpiredMonthValue}/${cardExpiredYearValue}`;
		cardBackNumber.textContent = secretcodeValue;
	}
});

completeState.addEventListener("click", (e) => {
	// form.reset();
	form.style.display = "flex";
	completeState.style.display = "none";
});

const validateInputs = () => {
	if (cardholderName.validity.valueMissing) {
		setError(cardholderName, "Cardholder name is required");
	} else {
		setSuccess(cardholderName);
	}

	if (cardNumber.validity.valueMissing) {
		setError(cardNumber, "Card number is required");
	} else if (cardNumber.validity.patternMismatch) {
		setError(cardNumber, "Wrong format, 16 digit number only");
	} else {
		setSuccess(cardNumber);
	}

	if (cardExpiredMonth.validity.valueMissing) {
		setError(cardExpiredMonth.parentElement, "Can't be blank");
	} else if (cardExpiredMonth.validity.patternMismatch) {
		setError(cardExpiredMonth, "Number only");
	} else if (cardExpiredYear.validity.valueMissing) {
		setError(cardExpiredYear.parentElement, "Can't be blank");
	} else if (cardExpiredYear.validity.patternMismatch) {
		setError(cardExpiredYear, "Number only");
	} else {
		setSuccess(cardExpiredMonth.parentElement);
		setSuccess(cardExpiredYear.parentElement);
	}

	if (cardSecretCode.validity.valueMissing) {
		setError(cardSecretCode, "Can't be blnak");
	} else if (cardSecretCode.validity.patternMismatch) {
		setError(cardSecretCode, "Wrong format");
	} else {
		setSuccess(cardSecretCode);
	}

	return true;
};

const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("error");
};

//input mask

$(window).load(function () {
	var Card = [{ mask: "#### #### #### ####" }];
	$("#cardnumber").inputmask({
		mask: Card,
		greedy: true,
	});

	// $("#card__front-number").inputmask({
	// 	mask: Card,
	// 	greedy: true,
	// });
});
