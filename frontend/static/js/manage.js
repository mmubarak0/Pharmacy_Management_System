/**********************************************************************************
 ** manage.js -- module containing function that display an object in a table    **
 ** and enable adding - deleting - editing those elements                        **
 ** @author ki2kid / https://github.com/mmubarak0                                **
 **********************************************************************************/

/**
 * @TODO replace the hardcoded values like id and replace it with more dynamic approach
 */

let csrftoken = "";
cookieStore.get("csrftoken").then((result) => {
	csrftoken = result.value;
});

/**
 * render table elements
 * @param {Url} url api url to fetch from it
 * @param {string} model model name
 * @param {string[]} args elements of the object to be showed in the table
 * @param {string} namespace optional namespace to identify rows
 */
export const ShowElements = async (url, model, args, namespace, order) => {
	let data = "";
	url = concat(url, order);
	await fetch(url)
		.then((result) => {
			return result.json();
		})
		.then((result) => {
			data = result[model];
		})
		.catch((err) => {
			console.log("No Data was found !" + err);
		});
	let table_rows = ``;
	for (let i = 0; i < data.length; i++) {
		let table_columns = ``;
		for (let j = 0; j < args.length; j++) {
			table_columns += `<td>${data[i][args[j]]}</td>`;
		}
		table_rows += `
            <tr>
                <td class="bg-info-subtle bg-gradient">${data[i].id}</td>
                ${table_columns}
                <td>
                    <a class="btn btn-outline-primary viewButton" data-bs-toggle="offcanvas" href="#offcanvasUpdate"
                        role="button" aria-controls="offcanvasUpdate" id="${namespace}${data[i].id}">
                        view
                    </a>
                </td>
            </tr>
        `;
	}
	return table_rows;
};

/**
 * This Method save the changes of creating or altering the table elements
 * @param {Object} element the element to be saved
 * @param {Url} url api url to fetch from it
 * @param {{name: [type, label]}} fields fields to save
 * @Fieldtypes [charField, emailField, imageField, dateField, intField, textField] default charField
 */
export const saveChanges = async (element, url, fields) => {
	console.log("changes has been saved to database");
	// update active element with data in inputs fields
	for (const [name, [type]] of Object.entries(fields)) {
		if (type === "imageField") {
			element[name] = document.getElementById(name).files[0];
		} else {
			element[name] = document.getElementById(name).value;
		}
	}

	const XHR = new XMLHttpRequest();
	const FD = new FormData();
	for (const [name, value] of Object.entries(element)) {
		FD.append(name, value);
	}
	XHR.open("POST", concat(url,element.id), false);
	XHR.setRequestHeader("X-CSRFToken", csrftoken);
	XHR.send(FD);

	// Why this doesn't work ?
	// await fetch(url, {
	// 	method: "POST",
	// 	body: JSON.stringify(element),
	// 	headers: {
	// 		"X-CSRFToken": csrftoken,
	// 	},
	// 	mode: "same-origin",
	// })
	// 	.then((result) => result.json())
	// 	.then((response) => console.log("Server Response:", response));
};

/**
 * This Method delete the element from the table
 * @param {Object} element the element to be deleted
 */
export const deleteElement = async (element, url) => {
	console.log("deleting the element ", element);
	await fetch(concat(url, element.id), {
		method: "DELETE",
		headers: {
			"X-CSRFToken": csrftoken,
		},
		mode: "same-origin",
	});
};

/**
 * This Method enable to edit an element from the table
 * @param {object} element the element to be altered
 * @param {node} saveBtn submit button with value save
 * @param {{name: [type, label]}} fields fields to edit
 * @Fieldtypes [charField, emailField, imageField, dateField, intField, textField] default charField
 */
export const editElement = (element, saveBtn, fields) => {
	console.log("edit the element ", element);
	return viewElement(element, saveBtn, fields, false);
};

/**
 * This Method create new element
 * @param {node} saveBtn submit button with value save
 * @param {{name: [type, label]}} fields fields to create
 * @Fieldtypes [charField, emailField, imageField, dateField, intField, textField] default charField
 */
export const createElement = (saveBtn, fields) => {
	console.log("creating element");
	const newElement = new Object();
	return viewElement(newElement, saveBtn, fields, false);
};

/**
 * This Method enable to view more information about table elements
 * @param {object} element element to be viewed
 * @param {node} saveBtn submit button with value save
 * @param {{name: [type, label]}} fields fields to view
 * @param {boolean} exist is item exist? default true
 * @Fieldtypes [charField, emailField, imageField, dateField, intField, textField] default charField
 */
export const viewElement = (element, saveBtn, fields, exist = true) => {
	console.log("view details of ", element);
	if (!exist) {
		if (saveBtn.hasAttribute("disabled"))
			saveBtn.removeAttribute("disabled");
	} else {
		if (!saveBtn.hasAttribute("disabled"))
			saveBtn.setAttribute("disabled", "true");
	}
	let viewArea = ``;
	for (const [name, [type, label]] of Object.entries(fields)) {
		switch (type) {
			case "charField":
				viewArea += `
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
								<label for="${name}" class="form-label">${label || name}</label>
                                <input type="text" class="form-control" name="${name}" id="${name}" value="${
					element[name] || ""
				}" ${exist ? "disabled" : ""}>
                            </div>
                        </div>
                    </div>
                `;
				break;
			case "emailField":
				viewArea += `
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
								<label for="${name}" class="form-label">${label || name}</label>
                                <input type="email" class="form-control" name="${name}" id="${name}" value="${
					element[name] || ""
				}" ${exist ? "disabled" : ""}>
                            </div>
                        </div>
                    </div>
                `;
				break;
			case "dateField":
				viewArea += `
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
								<label class="form-label" for="${name}">${label || name}</label>
                                <input type="date" class="form-control" name="${name}" id="${name}" value="${
					element[name] || ""
				}" ${exist ? "disabled" : ""}>
                            </div>
                        </div>
                    </div>
                `;
				break;
			case "intField":
				viewArea += `
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
								<label class="form-label" for="${name}">${label || name}</label>
                                <input type="number" class="form-control" name="${name}" id="${name}" value="${
					element[name] || ""
				}" ${exist ? "disabled" : ""}>
                            </div>
                        </div>
                    </div>
                `;
				break;
			case "textField":
				viewArea += `
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
								<label class="form-label" for="${name}">${label || name}</label>
                                <textarea type="text" class="form-control" name="${name}" id="${name}" rows="5" value="${
					element[name] || ""
				}"
                                    ${exist ? "disabled" : ""}>${
					element[name] || ""
				}</textarea>
                            </div>
                        </div>
                    </div>
                `;
				break;
			case "imageField":
				viewArea += `
					<div class="row">
						<div class="col">
							<div>
								<label class="form-label" for="${name}">${label || name}</label>
								<input type="file" name="${name}" id="${name}" class=${exist ? "hidden" : "form-control"}>
								<img src="${element[name] || ""}" class="img-thumbnail">
							</div>
						</div>
					</div>
				`;
				break;
			default:
				viewArea += `
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
								<label class="form-label" for="${name}">${label || name}</label>
                                <input type="text" class="form-control" name="${name}" id="${name}" value="${
					element[name] || ""
				}" ${exist ? "disabled" : ""}>
                            </div>
                        </div>
                    </div>
                `;
				break;
		}
	}
	return viewArea;
};

/**
 * Fetch and return a specific element from the database by it's id
 * or null if not found
 * @param {url} url api url to fetch from it
 * @param {string} model model name
 * @param {int} id the id of the element to get
 * @returns {Promise<object>}
 */
export const getElement = async (url, model, id) => {
	let data = Object();
	await fetch(url)
		.then((result) => {
			return result.json();
		})
		.then((result) => {
			data = result[model].filter((e) => e.id === id);
		})
		.catch((err) => {
			console.log("No Data was found !" + err);
		});
	return data.length === 1 ? data[0] : null;
};

/**
 * Hide the Bootstrap Canvas
 * @param {string} targetCanvas The id of the canvas to hide
 */
export const hideCanvas = (targetCanvas) => {
	let openedCanvas = bootstrap.Offcanvas.getInstance(
		document.getElementById(targetCanvas)
	);
	openedCanvas.hide();
};

export const concat = (...args) => {
	return args.join("/");
}

export const toggleOrder = (order) => {
	if (order.startsWith("-")) {
		return order.slice(1)
	} else {
		return `-${order}`
	}
}

export const clearArrows = (nodes, needle) => {
	nodes.forEach(e => {
		for (let i = 0; i < needle.length; i++) {
			const x = e.lastChild.textContent;
			const y = needle[i].textContent;
			if (x === y) {
				e.removeChild(e.lastChild)
			}
		}
	});
}