import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	AGENCIES_WITHOUT_PAGINATION,
	AGENTS_WITHOUT_PAGINATION,
	BANGLADESH_ALL_BANK_WITHOUT_PAGINATION,
	CURRENCY_WITHOUT_PG,
	CURRENT_STATUS_WITHOUT_PG,
	CURRENTSTATUSS_WITHOUT_PAGINATION,
	CUSOTMERTYPES,
	DEMANDS_WITHOUT_PAGINATION,
	DEMANDS_WITHOUT_PAGINATION_CALLING_ENTRY,
	DEMANDS_WITHOUT_PAGINATION_VISA_ENTRY,
	DESIGNATIONS_WITHOUT_PAGINATION,
	GET_ALL_CALLING_ASSIGN_WP,
	GET_ATTRIBUTES_WITHOUT_PAGINATION,
	GET_BRANCH_WITHOUT_PAGINATION,
	GET_BRANDS_WITHOUT_PAGINATION,
	GET_CATEGORIES_WITHOUT_PAGINATION,
	GET_CITYS_WITHOUT_PAGINATION,
	GET_CLIENT_TYPES_WITHOUT_PAGINATION,
	GET_CLIENTS_WITHOUT_PAGINATION,
	GET_COUNTRIES_WITHOUT_PAGINATION,
	GET_DEPARTMENTS_WITHOUT_PAGINATION,
	GET_EMPLOYEE_USERS_WITHOUT_PAGINATION,
	GET_EMPLOYEES_WITHOUT_PAGINATION,
	GET_FORM_CONTROL_HEAD_WITHOUT_PG,
	GET_GDSS,
	GET_MENUS_ALL_NESTED,
	GET_MENUS_WITHOUT_PAGINATION,
	GET_PACKAGE_TYPES_WITHOUT_PAGINATION,
	GET_PERMISSION_GROUP,
	GET_PERMISSIONS_WITHOUT_PAGINATION,
	GET_ROLES_WITHOUT_PAGINATION,
	GET_SITESETTINGS,
	GET_THANAS_WITHOUT_PAGINATION,
	GET_TICKET_DEPARTMENT,
	GET_TICKET_PRIORITY,
	GET_TICKET_STATUS,
	GET_USER_PERMISSION,
	GET_USERS_WITHOUT_PAGINATION,
	GET_VENDORS_WITHOUT_PAGINATION,
	GROUPS_WITHOUT_PAGINATION,
	LEDGERS_WITHOUT_PAGINATION,
	MEDICALCENTERS_WITHOUT_PAGINATION,
	ORDERSTATUS,
	PASSENGER_VISA_ENTRY_WITHOUT_PAGINATION,
	PASSENGERS_WITHOUT_PAGINATION,
	PASSENGERTYPES_WITHOUT_PAGINATION,
	PAYMENTMATHODS,
	POST_CORN_JOB,
	PRIMARY_AIRWAY_WITHOUT_PAGINATION,
	PRIMARY_GROUPS_WITHOUT_PAGINATION,
	PROFESSIONS_WITHOUT_PAGINATION,
	SUBLEDGERS_WITHOUT_PAGINATION,
	THANAS_BASED_CITY,
	TODO_TASK_TYPE,
	VISAENTRYS_WITHOUT_PAGINATION
} from '../constant/constants';

export const getBranches = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_BRANCH_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setBranches(data.branches)))
		.catch(() => {});
};

export const getSiteSettings = () => (dispatch) => {
	fetch(`${GET_SITESETTINGS}`)
		.then((response) => response.json())
		.then((data) => dispatch(setSiteSettings(data.general_settings[0] || {})))
		.catch(() => {});
};

export const getEmployeeUsers = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_EMPLOYEE_USERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setEmployeeUsers(data.employee_users)))
		.catch(() => {});
};

export const getPermissionGroups = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_PERMISSION_GROUP, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPermissionGroups(data.components)))
		.catch(() => {});
};

export const getUserPermissions = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_USER_PERMISSION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setUserPermissions(data.user_permissions)))
		.catch(() => {});
};

export const ToDoTaskType = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(TODO_TASK_TYPE, authTOKEN)
		.then((response) => response.json())
		.then((data) => {
			const modifirdData = data.task_types.map((value) => {
				return {
					id: value.id,
					handle: value.name?.toLowerCase(),
					title: value.name?.toUpperCase(),
					color: '#388E3C'
				};
			});
			dispatch(setToDoTaskType(modifirdData));
		})
		.catch(() => {});
};
export const getBangladeshAllBanks = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(BANGLADESH_ALL_BANK_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setBangladeshAllBanks(data.banks)))
		.catch(() => {});
};
export const getThanas = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_THANAS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setThanas(data.thanas)))
		.catch(() => {});
};
export const getPackages = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_PACKAGE_TYPES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPackages(data.package_types)))
		.catch(() => {});
};
export const getClientTypes = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_CLIENT_TYPES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setClientTypes(data.client_types)))
		.catch(() => {});
};

export const getGDSs = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_GDSS, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setGDSs(data.gdses)))
		.catch(() => {});
};

export const getThanasBasedOnCity = (cityId) => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	fetch(`${THANAS_BASED_CITY}${cityId}`, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setThanas(data.thanas || [])))
		.catch(() => {});
};

export const getCities = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_CITYS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCities(data.cities)))
		.catch(() => {});
};

export const getCountries = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_COUNTRIES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCountries(data.countries)))
		.catch(() => {});
};

export const getTicketDepartments = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_TICKET_DEPARTMENT, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setTicketDepartments(data.ticket_departments)))
		.catch(() => {});
};
export const getTicketStatuss = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_TICKET_STATUS, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setTicketStatuss(data?.ticket_statuses)))
		.catch(() => {});
};
export const getTicketPriority = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_TICKET_PRIORITY, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setTicketPrioritys(data.ticket_priorities)))
		.catch(() => {});
};
export const getRoles = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_ROLES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setRoles(data.roles)))
		.catch(() => {});
};
export const getAutoStatusUpdates = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(POST_CORN_JOB, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setAutoStatusUpdates(data.cron_job)))
		.catch(() => {});
};

export const getDepartments = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(`${GET_DEPARTMENTS_WITHOUT_PAGINATION}`, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setDepartments(data.departments)))
		.catch(() => {});
};
export const getClients = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(`${GET_CLIENTS_WITHOUT_PAGINATION}`, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setClients(data.clients)))
		.catch(() => {});
};
export const getAgents = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(`${AGENTS_WITHOUT_PAGINATION}`, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setAgents(data.agents)))
		.catch(() => {});
};
export const getEmployees = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_EMPLOYEES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setEmployees(data.employees)))
		.catch(() => {});
};
export const getCurrentstatuses = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(CURRENT_STATUS_WITHOUT_PG, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCurrentstatuses(data.current_statuses)))
		.catch(() => {});
};

export const getCurrencies = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(CURRENCY_WITHOUT_PG, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCurrencies(data.currencies)))
		.catch(() => {});
};

export const getAttributes = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_ATTRIBUTES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setAttributes(data.attributes)))
		.catch(() => {});
};

export const getPermissions = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_PERMISSIONS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPermissions(data.permissions)))
		.catch(() => {});
};

export const getUsers = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_USERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setUsers(data.users)))
		.catch(() => {});
};
export const getVendors = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_VENDORS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setVendors(data.vendors)))
		.catch(() => {});
};

export const getOrdersStatus = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(ORDERSTATUS, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setOrdersStatus(data.orderstatuses)))
		.catch(() => {});
};

export const getPaymentMathods = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PAYMENTMATHODS, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPaymentMathods(data.paymentmethods)))
		.catch(() => {});
};

export const getCusotmerTypes = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(CUSOTMERTYPES, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCusotmerTypes(data.customer_types)))
		.catch(() => {});
};

export const getBrand = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_BRANDS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setBrands(data.brands)))
		.catch(() => {});
};

export const getCategory = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_CATEGORIES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => {
			dispatch(setCategories(data.categories));
		})
		.catch(() => {});
};

export const getParentMenus = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_MENUS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => {
			dispatch(setParentMenus(data.menu_items));
		})
		.catch(() => {});
};

export const getAllMenuNested = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	axios
		.get(GET_MENUS_ALL_NESTED, authTOKEN)
		.then((res) => {
			dispatch(setAllMenuNested(res.data?.menu_items));
		})
		.catch(() => {
			dispatch(setAllMenuNested([]));
		});
};

export const getGroups = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GROUPS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setGroups(data.groups)))
		.catch(() => {});
};

export const getPrimaryGroups = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PRIMARY_GROUPS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPrimaryGroups(data.primary_groups)))
		.catch(() => {});
};

export const getAirways = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PRIMARY_AIRWAY_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setAirways(data.airways)))
		.catch(() => {});
};

export const getDesignations = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(DESIGNATIONS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => {
			dispatch(setDesignations(data.designations));
		})
		.catch(() => {});
};

export const getProfessions = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PROFESSIONS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setProfessions(data.professions)))
		.catch(() => {});
};

export const getDemands = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(DEMANDS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setDemands(data.demands)))
		.catch(() => {});
};
export const getDemandVisaEntrys = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(DEMANDS_WITHOUT_PAGINATION_VISA_ENTRY, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setDemandVisaEntrys(data.demands)))
		.catch(() => {});
};
export const getDemandCallingEntrys = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(DEMANDS_WITHOUT_PAGINATION_CALLING_ENTRY, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setDemandCallingEntrys(data.demands)))
		.catch(() => {});
};

// export const getAgents = () => (dispatch) => {
// 	const authTOKEN = {
// 		headers: {
// 			'Content-type': 'application/json',
// 			Authorization: localStorage.getItem('jwt_access_token')
// 		}
// 	};
// 	fetch(AGENTS_WITHOUT_PAGINATION, authTOKEN)
// 		.then((response) => response.json())
// 		.then((data) => dispatch(setAgents(data.agents)))
// 		.catch(() => {});
// };

export const getAgencys = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(AGENCIES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setAgencies(data.recruiting_agencies)))
		.catch(() => {});
};

export const getRecruitingAgencys = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(AGENCIES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setRecruitingAgencys(data.recruiting_agencies)))
		.catch(() => {});
};

export const getPassengerTypes = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PASSENGERTYPES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPassengerTypes(data.passenger_types)))
		.catch(() => {});
};
export const getActivityLogTypes = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PASSENGERTYPES_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setActivityLogTypes(data.passenger_types)))
		.catch(() => {});
};

export const getCurrentStatuss = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(CURRENTSTATUSS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCurrentStatuses(data.current_statuses)))
		.catch(() => {});
};

export const getVisaEntrys = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(VISAENTRYS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setVisaEntries(data.visa_entries)))
		.catch(() => {});
};
export const getCallingAssigns = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_ALL_CALLING_ASSIGN_WP, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setCallingAssigns(data.malaysia_visa_entries)))
		.catch(() => {});
};

export const getMedicalCenters = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(MEDICALCENTERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setMedicalCenters(data.medical_centers)))
		.catch(() => {});
};
export const getMedicals = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(MEDICALCENTERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setMedicals(data.medicals)))
		.catch(() => {});
};

export const getPassengers = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PASSENGERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPassengers(data.passengers)))
		.catch((err) => {});
};

export const getformcontent_head = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(GET_FORM_CONTROL_HEAD_WITHOUT_PG, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setFormcontent_heads(data.formcontent_heads)))
		.catch((err) => {});
};

export const getPassengersWithVisaEntry = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(PASSENGER_VISA_ENTRY_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setPassengersWithVisaEntry(data.passengers)))
		.catch((err) => {});
};

export const getLedgers = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(LEDGERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setLedgers(data.ledger_accounts)))
		.catch(() => {});
};

export const getSubLedgers = () => (dispatch) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	fetch(SUBLEDGERS_WITHOUT_PAGINATION, authTOKEN)
		.then((response) => response.json())
		.then((data) => dispatch(setSubLedgers(data.sub_ledgers)))
		.catch(() => {});
};

const dataSlice = createSlice({
	name: 'dropdown/data',
	initialState: {
		branches: [],
		siteSettings: [],
		UserPermissions: [],
		genders: [],
		airways: [],
		thanas: [],
		packages: [],
		clientTypes: [],
		gdss: [],
		cities: [],
		districts: [],
		countries: [],
		roles: [],
		ticketDepartments: [],
		ticketPriority: [],
		ticketStatus: [],
		autoStatusUpdates: [],
		departments: [],
		clients: [],
		employees: [],
		products: [],
		attributes: [],
		citys: [],
		permissions: [],
		attributesets: [],
		permissiongroups: [],
		users: [],
		vendors: [],
		ordersStatus: [],
		paymentMathods: [],
		cusotmerTypes: [],
		brands: [],
		categories: [],
		parentMenus: [],
		nestedMenus: [],
		groups: [],
		bangladeshAllBanks: [],

		primaryGroups: [],
		designations: [],
		professions: [],
		demands: [],
		demandVisaEntrys: [],
		demandCallingEntrys: [],
		agents: [],
		agencies: [],
		PassengerVisaEntry: [],
		recruitingAgencys: [],
		passengerTypes: [],
		activityLogTypes: [],
		currentStatuss: [],
		visaEntries: [],
		callingAssigns: [],
		medicalCenters: [],
		passengers: [],
		formcontent_heads: [],
		ledgers: [],
		subLedgers: [],
		taskTypes: [],
		currencies: [],
		currentstatuses: [],
		employeeusers: []
	},
	reducers: {
		setBranches: (state, action) => {
			state.branches = action.payload;
		},
		setSiteSettings: (state, action) => {
			state.siteSettings = action.payload;
		},
		setUserPermissions: (state, action) => {
			state.UserPermissions = action.payload;
		},
		setEmployeeUsers: (state, action) => {
			state.employeeusers = action.payload ? action.payload : [];
		},
		setAirways: (state, action) => {
			state.airways = action.payload;
		},
		setToDoTaskType: (state, action) => {
			state.taskTypes = action.payload;
		},
		setGenders: (state, action) => {
			state.genders = action.payload;
		},
		setPackages: (state, action) => {
			state.packages = action.payload;
		},
		setClientTypes: (state, action) => {
			state.clientTypes = action.payload;
		},
		setPermissionGroups: (state, action) => {
			state.permissiongroups = action.payload ? action.payload : [];
		},
		setGDSs: (state, action) => {
			state.gdss = action.payload;
		},
		setCities: (state, action) => {
			state.cities = action.payload;
		},
		setCountries: (state, action) => {
			state.countries = action.payload;
		},
		setRoles: (state, action) => {
			state.roles = action.payload;
		},
		setTicketDepartments: (state, action) => {
			state.ticketDepartments = action.payload;
		},
		setTicketStatuss: (state, action) => {
			state.ticketStatuss = action.payload;
		},
		setTicketPrioritys: (state, action) => {
			state.ticketPrioritys = action.payload;
		},
		setAutoStatusUpdates: (state, action) => {
			state.autoStatusUpdates = action.payload;
		},
		setDepartments: (state, action) => {
			state.departments = action.payload;
		},
		setClients: (state, action) => {
			state.clients = action.payload;
		},
		setAgents: (state, action) => {
			state.agents = action.payload;
		},
		setEmployees: (state, action) => {
			state.employees = action.payload ? action.payload : [];
		},
		setProducts: (state, action) => {
			state.products = action.payload ? action.payload : [];
		},
		setAttributes: (state, action) => {
			state.attributes = action.payload ? action.payload : [];
		},
		setCitys: (state, action) => {
			state.citys = action.payload ? action.payload : [];
		},
		setBangladeshAllBanks: (state, action) => {
			state.bangladeshAllBanks = action.payload ? action.payload : [];
		},
		setPermissions: (state, action) => {
			state.permissions = action.payload;
		},
		setAttributeset: (state, action) => {
			state.attributesets = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload ? action.payload : [];
		},
		setVendors: (state, action) => {
			state.vendors = action.payload ? action.payload : [];
		},
		setOrdersStatus: (state, action) => {
			state.ordersStatus = action.payload ? action.payload : [];
		},
		setPaymentMathods: (state, action) => {
			state.paymentMathods = action.payload ? action.payload : [];
		},
		setCusotmerTypes: (state, action) => {
			state.cusotmerTypes = action.payload ? action.payload : [];
		},
		setBrands: (state, action) => {
			state.brands = action.payload ? action.payload : [];
		},
		setCategories: (state, action) => {
			state.categories = action.payload ? action.payload : [];
		},
		setParentMenus: (state, action) => {
			state.parentMenus = action.payload ? action.payload : [];
		},
		setAllMenuNested: (state, action) => {
			state.nestedMenus = action.payload ? action.payload : [];
		},
		setGroups: (state, action) => {
			state.groups = action.payload ? action.payload : [];
		},
		setPrimaryGroups: (state, action) => {
			state.primaryGroups = action.payload ? action.payload : [];
		},
		setDesignations: (state, action) => {
			state.designations = action.payload ? action.payload : [];
		},
		setProfessions: (state, action) => {
			state.professions = action.payload ? action.payload : [];
		},
		setDemands: (state, action) => {
			state.demands = action.payload ? action.payload : [];
		},
		setThanas: (state, action) => {
			state.thanas = action.payload ? action.payload : [];
		},
		setDemandVisaEntrys: (state, action) => {
			state.demandVisaEntrys = action.payload ? action.payload : [];
		},
		setDemandCallingEntrys: (state, action) => {
			state.demandCallingEntrys = action.payload ? action.payload : [];
		},

		setAgencies: (state, action) => {
			state.agencies = action.payload ? action.payload : [];
		},
		setRecruitingAgencys: (state, action) => {
			state.recruitingAgencys = action.payload ? action.payload : [];
		},
		setPassengerTypes: (state, action) => {
			state.passengerTypes = action.payload ? action.payload : [];
		},
		setActivityLogTypes: (state, action) => {
			state.activityLogTypes = action.payload ? action.payload : [];
		},
		setPassengerTypesWithVisaEntry: (state, action) => {
			state.passengerTypesWithVisaEntry = action.payload ? action.payload : [];
		},

		setCurrentStatuses: (state, action) => {
			state.currentStatuss = action.payload ? action.payload : [];
		},
		setVisaEntries: (state, action) => {
			state.visaEntries = action.payload ? action.payload : [];
		},
		setCallingAssigns: (state, action) => {
			state.callingAssigns = action.payload ? action.payload : [];
		},
		setMedicalCenters: (state, action) => {
			state.medicalCenters = action.payload ? action.payload : [];
		},
		setMedicals: (state, action) => {
			state.medicals = action.payload ? action.payload : [];
		},
		setPassengers: (state, action) => {
			state.passengers = action.payload ? action.payload : [];
		},
		setFormcontent_heads: (state, action) => {
			state.formcontent_heads = action.payload ? action.payload : [];
		},
		setPassengersWithVisaEntry: (state, action) => {
			state.passengers = action.payload ? action.payload : [];
		},

		setLedgers: (state, action) => {
			state.ledgers = action.payload ? action.payload : [];
		},
		setSubLedgers: (state, action) => {
			state.subLedgers = action.payload ? action.payload : [];
		},
		setCurrencies: (state, action) => {
			state.currencies = action.payload ? action.payload : [];
		},
		setCurrentstatuses: (state, action) => {
			state.currentstatuses = action.payload ? action.payload : [];
		}
	}
});

const {
	setBranches,
	setSiteSettings,
	setEmployeeUsers,
	setUserPermissions,
	setVendors,
	setThanas,
	setPackages,
	setClientTypes,
	setGDSs,
	setRoles,
	setTicketPrioritys,
	setTicketDepartments,
	setTicketStatuss,
	setAutoStatusUpdates,
	setDepartments,
	setClients,
	setAgents,
	setCities,
	setCountries,
	setPermissions,
	setEmployees,
	setAttributes,

	// To Do Task Type

	setToDoTaskType,

	// setCitys,
	setUsers,
	setOrdersStatus,
	setPaymentMathods,
	setCusotmerTypes,
	setBrands,
	// setFormcontent_heads,
	setCategories,
	setParentMenus,
	setAllMenuNested,
	setGroups,
	setPrimaryGroups,
	setDesignations,
	setProfessions,
	setDemands,
	setDemandVisaEntrys,
	setDemandCallingEntrys,

	setAgencies,
	setAirways,
	setRecruitingAgencys,
	setPassengerTypes,
	setActivityLogTypes,
	setBangladeshAllBanks,
	setCurrentStatuses,
	setVisaEntries,
	setCallingAssigns,
	setMedicalCenters,
	setMedicals,
	setPassengers,
	setPassengersWithVisaEntry,
	setLedgers,
	setSubLedgers,
	setCurrencies,
	setPermissionGroups,
	setCurrentstatuses
} = dataSlice.actions;
export default dataSlice.reducer;
