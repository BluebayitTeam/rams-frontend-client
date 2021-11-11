import { createSlice } from "@reduxjs/toolkit";
import { CUSOTMERTYPES, GET_ATTRIBUTES_WITHOUT_PAGINATION, GET_BRANCH_WITHOUT_PAGINATION, GET_BRANDS_WITHOUT_PAGINATION, GET_CATEGORIES_WITHOUT_PAGINATION, GET_CITYS_WITHOUT_PAGINATION, GET_COUNTRIES_WITHOUT_PAGINATION, GET_DEPARTMENTS_WITHOUT_PAGINATION, GET_EMPLOYEES_WITHOUT_PAGINATION, GET_MENUS_ALL_NESTED, GET_MENUS_WITHOUT_PAGINATION, GET_PERMISSIONS_WITHOUT_PAGINATION, GET_ROLES_WITHOUT_PAGINATION, GET_THANAS_WITHOUT_PAGINATION, GET_USERS_WITHOUT_PAGINATION, GET_VENDORS_WITHOUT_PAGINATION, ORDERSTATUS, PAYMENTMATHODS } from 'app/constant/constants';
import axios from "axios";


export const getBranches = () => (dispatch) => {
    fetch(GET_BRANCH_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setBranches(data.branches)))
        .catch(() => { });
}

export const getThanas = () => (dispatch) => {
    fetch(GET_THANAS_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setThanas(data.thanas)))
        .catch(() => { });
}
export const getCities = () => (dispatch) => {
    fetch(GET_CITYS_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setCities(data.cities)))
        .catch(() => { });
}

export const getCountries = () => (dispatch) => {
    fetch(GET_COUNTRIES_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setCountries(data.countries)))
        .catch(() => { });
}

export const getRoles = () => (dispatch) => {
    fetch(GET_ROLES_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setRoles(data.roles)))
        .catch(() => { });
}

export const getDepartments = () => (dispatch) => {
    fetch(`${GET_DEPARTMENTS_WITHOUT_PAGINATION}`)
        .then(response => response.json())
        .then(data => dispatch(setDepartments(data.departments)))
        .catch(() => { })
}
export const getEmployees = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(GET_EMPLOYEES_WITHOUT_PAGINATION, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setEmployees(data.employees)))
        .catch(() => { })
}
export const getProducts = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(aLLProductsWithoutPagination, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setProducts(data.products)))
        .catch(() => { })
}
export const getAttributes = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(GET_ATTRIBUTES_WITHOUT_PAGINATION, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setAttributes(data.attributes)))
        .catch(() => { })
}

export const getPermissions = () => (dispatch) => {
    fetch(GET_PERMISSIONS_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setPermissions(data.permissions)))
        .catch(() => { })
}

export const getUsers = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(GET_USERS_WITHOUT_PAGINATION, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setUsers(data.users)))
        .catch(() => { })
}
export const getVendors = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(GET_VENDORS_WITHOUT_PAGINATION, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setVendors(data.vendors)))
        .catch(() => { })
}

export const getOrdersStatus = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(ORDERSTATUS, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setOrdersStatus(data.orderstatuses)))
        .catch(() => { })
}

export const getPaymentMathods = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(PAYMENTMATHODS, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setPaymentMathods(data.paymentmethods)))
        .catch(() => { })
}


export const getCusotmerTypes = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    fetch(CUSOTMERTYPES, authTOKEN)
        .then(response => response.json())
        .then(data => dispatch(setCusotmerTypes(data.customer_types)))
        .catch(() => { })
}

export const getBrand = () => (dispatch) => {
    fetch(GET_BRANDS_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => dispatch(setBrands(data.brands)))
        .catch(() => { });
}

export const getCategory = () => (dispatch) => {
    fetch(GET_CATEGORIES_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(setCategories(data.categories))
        })
        .catch(() => { });
}

export const getParentMenus = () => (dispatch) => {
    fetch(GET_MENUS_WITHOUT_PAGINATION)
        .then(response => response.json())
        .then(data => { dispatch(setParentMenus(data.menu_items)) })
        .catch(() => { });
}

export const getAllMenuNested = () => (dispatch) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    }
    axios.get(GET_MENUS_ALL_NESTED, authTOKEN)
        .then(res => {
            console.log("res", res)
            dispatch(setAllMenuNested(res.data?.menu_items))
        })
        .catch(() => { dispatch(setAllMenuNested([])) });
}

const dataSlice = createSlice({
    name: "employeeManagement/data",
    initialState: {
        branches: [],
        genders: [],
        thanas: [],
        cities: [],
        districts: [],
        countries: [],
        roles: [],
        departments: [],
        employees: [],
        products: [],
        attributes: [],
        citys: [],
        permissions: [],
        attributesets: [],
        users: [],
        vendors: [],
        ordersStatus: [],
        paymentMathods: [],
        cusotmerTypes: [],
        brands: [],
        categories: [],
        parentMenus: [],
        nestedMenus: [],
    },
    reducers: {
        setBranches: (state, action) => {
            state.branches = action.payload
        },
        setGenders: (state, action) => {
            state.genders = action.payload
        },
        setThanas: (state, action) => {
            state.thanas = action.payload
        },
        setCities: (state, action) => {
            state.cities = action.payload
        },
        setCountries: (state, action) => {
            state.countries = action.payload
        },
        setRoles: (state, action) => {
            state.roles = action.payload
        },
        setDepartments: (state, action) => {
            state.departments = action.payload
        },
        setEmployees: (state, action) => {
            state.employees = action.payload ? action.payload : []
        },
        setProducts: (state, action) => {
            state.products = action.payload ? action.payload : []
        },
        setAttributes: (state, action) => {
            state.attributes = action.payload ? action.payload : []
        },
        setCitys: (state, action) => {
            state.citys = action.payload ? action.payload : []
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload
        },
        setAttributeset: (state, action) => {
            state.attributesets = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload ? action.payload : []
        },
        setVendors: (state, action) => {
            state.vendors = action.payload ? action.payload : []
        },
        setOrdersStatus: (state, action) => {
            state.ordersStatus = action.payload ? action.payload : []
        },
        setPaymentMathods: (state, action) => {
            state.paymentMathods = action.payload ? action.payload : []
        },
        setCusotmerTypes: (state, action) => {
            state.cusotmerTypes = action.payload ? action.payload : []
        },
        setBrands: (state, action) => {
            state.brands = action.payload ? action.payload : []
        },
        setCategories: (state, action) => {
            state.categories = action.payload ? action.payload : []
        },
        setParentMenus: (state, action) => {
            state.parentMenus = action.payload ? action.payload : []
        },
        setAllMenuNested: (state, action) => {
            state.nestedMenus = action.payload ? action.payload : []
        }
    }
})

const {
    setBranches,
    setVendors,
    setGenders,
    setThanas,
    setRoles,
    setDepartments,
    setCities,
    setCountries,
    setPermissions,
    setAttributeset,
    setEmployees,
    setProducts,
    setAttributes,
    // setCitys,
    setUsers,
    setOrdersStatus,
    setPaymentMathods,
    setCusotmerTypes,
    setBrands,
    setCategories,
    setParentMenus,
    setAllMenuNested,
} = dataSlice.actions;
export default dataSlice.reducer;

