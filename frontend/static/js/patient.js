import {
	ShowElements,
	saveChanges,
	createElement,
	deleteElement,
	viewElement,
	getElement,
	editElement,
	hideCanvas,
	concat,
	toggleOrder,
	clearArrows,
} from "./manage.js";

const namespace = "patient";
const model = "patientDb";
const api_url = "http://127.0.0.1:8000/api/manage";
const url = concat(api_url, model);
const fields = {
	image: ["imageField", "Profile picture"],
	username: [,],
	first_name: [, "first name"],
	middle_name: [, "middle name"],
	last_name: [, "last name"],
	email: ["emailField", "email address"],
	current_status: ["textField", "current status"],
};
const table_fields = ["first_name", "last_name"];
const targetCanvas = "offcanvasUpdate";

// currently active element to perform CRUD operation on it
let activeElement = "";
let order = "first_name";

const updateTable = async () => {
	const data = await ShowElements(url, model, table_fields, namespace, order);
	let table_body = document.querySelector("#tBody");
	table_body.innerHTML = data;
};

const saveBtn = document.getElementById("saveButton");
saveBtn.addEventListener("click", async () => {
	await saveChanges(activeElement, url, fields);
	updateTable();
	hideCanvas(targetCanvas);
});

const deleteBtn = document.getElementById("deleteButton");
deleteBtn.addEventListener("click", async () => {
	await deleteElement(activeElement, url);
	updateTable();
	hideCanvas(targetCanvas);
});

const editBtn = document.getElementById("editButton");
editBtn.addEventListener("click", () => {
	let rendered_view = editElement(activeElement, saveBtn, fields);
	let viewArea = document.querySelector(".view-area");
	viewArea.innerHTML = rendered_view;
});

const addBtn = document.getElementById("addButton");
addBtn.addEventListener("click", () => {
	activeElement = new Object();
	let rendered_view = createElement(saveBtn, fields);
	let viewArea = document.querySelector(".view-area");
	viewArea.innerHTML = rendered_view;
});

document.addEventListener("click", async (e) => {
	let target = e.target;
	if (target.id.startsWith(namespace)) {
		activeElement = await getElement(
			url,
			model,
			+target.id.slice(namespace.length)
		);
		let rendered_view = viewElement(activeElement, saveBtn, fields);
		let viewArea = document.querySelector(".view-area");
		viewArea.innerHTML = rendered_view;
	} else if (target.getAttribute("scope") === "col") {
		const upArrow = document.createTextNode(" ⬆");
		const downArrow = document.createTextNode(" ⬇");
		let selected_order = target.id.slice(1);
		let pos_order = order.startsWith("-") ? order.slice(1) : order;
		clearArrows(document.querySelectorAll('[scope="col"]'), [downArrow, upArrow]);
		if (selected_order === pos_order) {
			order = toggleOrder(order);
			target.appendChild(order.startsWith("-") ? upArrow: downArrow);
		} else {
			order = selected_order;
			target.appendChild(downArrow);
		}
		updateTable();
	}
});

// Render Content
updateTable();
