export const orderBy = {
	/**
	 * @Default Order by Brand Name
	 * @expiryDate Order by Expiry Date
	 * @genericName Order by GenericList
	 * @recentlyAdded Order by added time
	 */
	Default: (x) => {
		/**
		 * @x drug-object
		 */
		return x.sort((a, b) =>
			a.brandName > b.brandName ? 1 : a.brandName < b.brandName ? -1 : 0
		);
	},
	expiryDate: (x) => {
		/**
		 * @x drug-object
		 */
		return x.sort((a, b) =>
			a.expiryDate > b.expiryDate
				? 1
				: a.expiryDate < b.expiryDate
				? -1
				: 0
		);
	},
	genericName: (x) => {
		/**
		 * @x drug-object
		 */
		return x.sort((a, b) => {
			let first = a.genericList;
			let second = b.genericList;
			return first > second ? 1 : first < second ? -1 : 0;
		});
	},
	recentlyAdded: (x) => {
		/**
		 * @x drug-object
		 */
		return x.sort((a, b) => {
			let first = a._DateCreated;
			let second = b._DateCreated;
			return first < second ? 1 : first > second ? -1 : 0;
		});
	},
};

export function searchForCase(object, toSearch, exclude) {
	/**
	 * SearchForCase - Case sensetive searching
	 * @object The object to search its fields
	 * @toSearch Search String to be matched
	 * @exclude a list of excluded fields from the object to not search for it.
	 * Return: a list of all objects that have a match query.
	 */
	let results = new Set();
	toSearch = toSearch.trim();
	object.forEach((e) => {
		for (let key in e) {
			if (typeof e[key] === "string" || e[key] instanceof String) {
				if (
					exclude.indexOf(key) === -1 &&
					e[key].indexOf(toSearch) !== -1
				) {
					results.add(e);
				}
			}
		}
	});
	return [...results];
}

export function searchFor(objects, toSearch, exclude) {
	/**
	 * SearchFor - Not Case sensetive searching
	 * @object The object to search its fields
	 * @toSearch Search String to be matched
	 * @exclude a list of excluded fields from the object to not search for it.
	 * Return: a list of all objects that have a match query.
	 */
	let results = new Set();
	toSearch = toSearch.trim().toLowerCase();
	objects.forEach((e) => {
		for (let key in e) {
			if (typeof e[key] === "string" || e[key] instanceof String) {
				if (
					exclude.indexOf(key) === -1 &&
					e[key].toLowerCase().indexOf(toSearch) !== -1
				) {
					results.add(e);
				}
			}
		}
	});
	return [...results];
}
