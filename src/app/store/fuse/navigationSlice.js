import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import useUserInfo from 'app/@customHook/@useUserInfo';
import { MENU_ITEM } from 'app/constant/constants';
import navigationConfig from 'app/fuse-configs/navigationConfig';
import axios from 'axios';
import i18next from 'i18next';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();
const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

console.log("initialState", initialState)

export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = id => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};


export const setMenuItem = () => (dispatch) => {

	const { authToken } = useUserInfo()

	if (localStorage.getItem("jwt_token")) {
		console.log("haveauthToken")
		axios.get(`${MENU_ITEM}`, authToken).then(data => {
			dispatch(resetNavigation(navigationAdapter.upsertMany(emptyInitialState, data.data)))
		})
	}
	else {
		console.log("noAuth")
		dispatch(resetNavigation(navigationAdapter.upsertMany(emptyInitialState, [])))
	}
}

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors(state => state.fuse.navigation);

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation: navigationAdapter.setAll,
		resetNavigation: (state, action) => action.payload
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = state => state.auth.user.role;

export const selectNavigation = createSelector(
	[selectNavigationAll, ({ i18n }) => i18n.language, getUserRole],
	(navigation, language, userRole) => {
		function setTranslationValues(data) {
			// loop through every object in the array
			return data.map(item => {
				if (item.translate && item.title) {
					item.title = i18next.t(`navigation:${item.translate}`);
				}

				// see if there is a children node
				if (item.children) {
					// run this function recursively on the children array
					item.children = setTranslationValues(item.children);
				}
				return item;
			});
		}

		return setTranslationValues(
			_.merge(
				[],
				FuseUtils.filterRecursive(navigation, item => FuseUtils.hasPermission(item.auth, userRole))
			)
		);
	}
);

export const selectFlatNavigation = createSelector([selectNavigation], navigation =>
	FuseUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
