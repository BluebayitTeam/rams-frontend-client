/**
 * Determines whether a given URL is present in the parent's child list or not.
 */

// const isUrlInChildren = (parent, url) => {
// 	if (!parent.children) {
// 		return false;
// 	}

// 	for (let i = 0; i < parent.children.length; i += 1) {
// 		if (parent.children[i].children) {
// 			if (isUrlInChildren(parent.children[i], url)) {
// 				return true;
// 			}
// 		}

// 		if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
// 			return true;
// 		}
// 	}
// 	return false;
// };

function isUrlInChildren(parent, url) {
	if (!parent.children) {
		return false;
	}

	for (let i = 0; i < parent.children.length; i++) {
		const child = parent.children[i];

		// Recursively check deeper children
		if (child.children && isUrlInChildren(child, url)) {
			return true;
		}

		// Ensure strict child matching (prevent partial false matches)
		if (child.url === url) {
			return true;
		}
	}

	return false;
}

export default isUrlInChildren;
