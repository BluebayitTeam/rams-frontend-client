import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import FuseUtils from '@fuse/utils';
import FuseNavigationHelper from '@fuse/utils/FuseNavigationHelper';
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'app/configs/navigationConfig';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';
import axios from 'axios';
import i18next from 'i18next';
import getUserData from 'src/app/@helpers/getUserData';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import { MENU_ITEMS } from 'src/app/constant/constants';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState([]);
const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	FuseNavigationHelper.flattenNavigation(navigationConfig)
);
/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem = (item, parentId) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(FuseNavigationHelper.appendNavItem(navigation, FuseNavItemModel(item), parentId)));
	return Promise.resolve();
};
/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem = (item, parentId) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(FuseNavigationHelper.prependNavItem(navigation, FuseNavItemModel(item), parentId)));
	return Promise.resolve();
};
/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem = (id, item) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(FuseNavigationHelper.updateNavItem(navigation, id, item)));
	return Promise.resolve();
};
/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem = (id) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(FuseNavigationHelper.removeNavItem(navigation, id)));
	return Promise.resolve();
};

export const setMenuItem = () => (dispatch) => {
	const { authToken } = getUserData();

	if (localStorage.getItem('jwt_access_token')) {
		axios.get(`${MENU_ITEMS}`, authToken).then((data) => {
			dispatch(resetNavigation(navigationAdapter.upsertMany(emptyInitialState, data?.data?.menu_items)));
		});
	} else {
		dispatch(resetNavigation(navigationAdapter.upsertMany(emptyInitialState, [])));
	}
};
export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state) => state.navigation);
/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action) {
			return navigationAdapter.setAll(state, FuseNavigationHelper.flattenNavigation(action.payload));
		},
		// resetNavigation: (state, action) => action.payload
		// Dynamic Sidebar
		resetNavigation: () => initialState
	}
});
export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigationSimple, userRole) => {
		// Convert unflattened navigation data to a hierarchical structure
		const navigation = setAdditionalData(navigationSimple);

		console.log('navigationSimple', navigationSimple);

		function setAdditionalData(data) {
			return data?.map((item) => ({
				hasPermission: Boolean(FuseUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`${item?.translate}`) } : {}),
				// Recursively process children
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		// Apply additional data and translations
		const translatedValues = setAdditionalData(navigation);
		console.log('translatedValues', translatedValues);

		return translatedValues;
	}
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => {
	return FuseNavigationHelper.flattenNavigation(navigation);
});
export default navigationSlice.reducer;
