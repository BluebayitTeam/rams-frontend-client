// base url

const isProduction = process.env.NODE_ENV === 'production';

export const BASE_URL = isProduction
  ? 'https://rl1010api.ramsbd.net'
  : 'http://192.168.68.121:8006';

// added by live api

// export const BASE_URL = isProduction
//   ? 'https://rl1010api.ramsbd.net'
//   : 'https://rl1010api.ramsbd.net';

export const CLIENT_URL = isProduction
  ? 'https://rl7811api.ramsbd.net'
  : 'http://192.168.0.119:3000';
export const ADMIN_URL = isProduction
  ? 'https://rl7811api.ramsbd.net'
  : 'http://192.168.0.117:8008';
export const ADMIN_LOGIN_EMAIL = 'robin@gmail.com';
export const ADMIN_LOGIN_PASSWORD = 'robin@gmail.com';

// login
export const LOGIN_URL = `${BASE_URL}/user/api/v1/user/login/`;

// user
export const USER_BY_ID = `${BASE_URL}/user/api/v1/user/`;

export const USER_BY_TOKEN = `${BASE_URL}/user/api/v1/user/me/`;

export const RESET_PASSWORD = `${BASE_URL}/auth/user/reset_password/`;

export const CONFIRM_RESET_PASSWORD = `${BASE_URL}/auth/user/reset_password_confirm/`;

// user
export const ALL_USERS = `${BASE_URL}/user/api/v1/user/all/`;

export const GET_USERS_WITHOUT_PAGINATION = `${BASE_URL}/user/api/v1/user/without_pagination/all/`;

export const SEARCH_USER = `${BASE_URL}/user/api/v1/user/search/`;

export const GET_EMPLOYEE_USERS_WITHOUT_PAGINATION = `${BASE_URL}/user/api/v1/user/get_employee_user/`;

export const CHECK_EMAIL = `${BASE_URL}/user/api/v1/user/check_email_when_create/`;

export const CHECK_PRIMARY_PHONE = `${BASE_URL}/user/api/v1/user/check_primary_phone/
`;

export const CHECK_SECONDARY_PHONE = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_create/`;

export const CHECK_USERNAME = `${BASE_URL}/user/api/v1/user/check_username_when_create/`;

// check_update
export const CHECK_EMAIL_UPDATE = `${BASE_URL}/user/api/v1/user/check_email_when_update/`;

export const CHECK_PRIMARY_PHONE_UPDATE = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_update/`;

export const CHECK_SECONDARY_PHONE_UPDATE = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_update/`;

export const CHECK_USERNAME_UPDATE = `${BASE_URL}/user/api/v1/user/check_username_when_update/`;

// branch
export const BRANCHES = `${BASE_URL}/branch/api/v1/branch/all/`;

// thana
export const THANAS = `${BASE_URL}/thana/api/v1/thana/all/`;

export const THANAS_BASED_CITY = `${BASE_URL}/thana/api/v1/thana/all_thana_by_city_id/`;

// // cities
// export const CITIES = `${BASE_URL}/city/api/v1/city/all/`;

//  country
export const COUNTRIES = `${BASE_URL}/country/api/v1/country/all/`;

export const GET_COUNTRIES_WITHOUT_PAGINATION = `${BASE_URL}/country/api/v1/country/without_pagination/all/`;

// role
export const ROLES = `${BASE_URL}/role/api/v1/role/all/`;

// department
export const DEPARTMENTS = `${BASE_URL}/department/api/v1/department/all/`;

// user
export const CREATE_USER = `${BASE_URL}/user/api/v1/user/create/`;

// employees
export const EMPLOYEES = `${BASE_URL}/employee/api/v1/employee/all/`;

export const GET_EMPLOYEES_WITHOUT_PAGINATION = `${BASE_URL}/employee/api/v1/employee/without_paginaiton/all/`;

// produtes
export const PRODUCTS = `${BASE_URL}/product/api/v1/product/all/`;

export const aLLProductsWithoutPagination = `${BASE_URL}/product/api/v1/product/without_pagination/all/`;

// atribute
export const ATTRIBUTES = `${BASE_URL}/attribute/api/v1/attribute/all/`;

// citys
export const CITIES = `${BASE_URL}/city/api/v1/city/all/`;

// users
export const USERS = `${BASE_URL}/user/api/v1/user/all/`;

//  orderstatus
export const ORDERSTATUS = `${BASE_URL}/orderstatus/api/v1/orderstatus/all/`;

//  paymentMathods
export const PAYMENTMATHODS = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/all/`;

//  get_a_customer_order_detaiL
export const CUSTOMERORDERDETAILS = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_detail/`;

//  update_item
export const UPDATEPRODUCTITEM = `${BASE_URL}/customerorder/api/v1/customerorder/update_item/`;

//  customerorder_delete_item/
export const REMOVEPRODUCTITEM = `${BASE_URL}/customerorder/api/v1/customerorder_delete_item/`;

//  customer types
export const CUSOTMERTYPES = `${BASE_URL}/customer_type/api/v1/customer_type/all/`;

//  export const ALL_USERS = `${BASE_URL}/users/api/v1/users/all/`;
export const USERS_PASSWORDCHANGE = `${BASE_URL}/user/api/v1/user/passwordchange/`;

// group
export const GROUPS_WITHOUT_PAGINATION = `${BASE_URL}/group/api/v1/group/without_pagination/all/`;

// primary group
export const PRIMARY_GROUPS_WITHOUT_PAGINATION = `${BASE_URL}/primary_group/api/v1/primary_group/all/`;

// primary current_airway
export const PRIMARY_AIRWAY_WITHOUT_PAGINATION = `${BASE_URL}/airway/api/v1/airway/without_pagination/all/`;

// designation
export const DESIGNATIONS_WITHOUT_PAGINATION = `${BASE_URL}/designation/api/v1/designation/without_pagination/all/`;

// visa egent
export const AGENTS_WITHOUT_PAGINATION = `${BASE_URL}/agent/api/v1/agent/without_pagination/all/`;
export const VISA_AGENTS_WITHOUT_PAGINATION = `${BASE_URL}/agent/api/v1/visa_agent/without_pagination/all/`;

// Passenger agent
export const PASSENGER_AGENTS_WITHOUT_PAGINATION = `${BASE_URL}/agent/api/v1/passenger_agent/without_pagination/all/`;

// visa entry
export const VISAENTRYS_WITHOUT_PAGINATION = `${BASE_URL}/visa_entry/api/v1/visa_entry/without_pagination/all/`;

// profession
export const PROFESSIONS_WITHOUT_PAGINATION = `${BASE_URL}/profession/api/v1/profession/all/`;

export const BRANCH_BY_USER_ID = `${BASE_URL}/branch/api/v1/branch/get_a_branch_by_user_id/`;

// demand
export const DEMANDS_WITHOUT_PAGINATION = `${BASE_URL}/demand/api/v1/demand/without_pagination/all/`;

export const DEMANDS_WITHOUT_PAGINATION_VISA_ENTRY = `${BASE_URL}/demand/api/v1/demand/without_pagination/all/saudi/active`;

export const DEMANDS_WITHOUT_PAGINATION_CALLING_ENTRY = `${BASE_URL}/demand/api/v1/demand/without_pagination/all/malaysia/active`;

export const PASSENGERTYPES_WITHOUT_PAGINATION = `${BASE_URL}/passenger_type/api/v1/passenger_type/without_pagination/all/`;

export const PASSENGER_COLUMN = `${BASE_URL}/table_column_passenger/api/v1/table_column_passenger/`;

export const CURRENTSTATUSS_WITHOUT_PAGINATION = `${BASE_URL}/current_status/api/v1/current_status/without_pagination/all/`;

export const AGENCIES_WITHOUT_PAGINATION = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/without_pagination/all/`;

export const MEDICALCENTERS_WITHOUT_PAGINATION = `${BASE_URL}/medical_center/api/v1/medical_center/without_pagination/all/`;

export const PASSENGERS_WITHOUT_PAGINATION = `${BASE_URL}/passenger/api/v1/passenger/without_pagination/all/`;

//  product
export const CREATE_PRODUCT = `${BASE_URL}/product/api/v1/product/create/`;

export const GET_PRODUCTS = `${BASE_URL}/product/api/v1/product/all/`;

export const GET_PRODUCT = `${BASE_URL}/product/api/v1/product/`;

export const UPDATE_PRODUCT = `${BASE_URL}/product/api/v1/product/update/`;

export const DELETE_PRODUCT = `${BASE_URL}/product/api/v1/product/delete/`;

export const SEARCH_PRODUCT = `${BASE_URL}/product/api/v1/product/search/`;

//  departments
export const CREATE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/create/`;

export const GET_DEPARTMENTS = `${BASE_URL}/department/api/v1/department/all/`;

export const GET_DEPARTMENTS_WITHOUT_PAGINATION = `${BASE_URL}/department/api/v1/department/without_pagination/all/`;

export const GET_DEPARTMENT_BY_ID = `${BASE_URL}/department/api/v1/department/`;

export const UPDATE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/update/`;

export const DELETE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/delete/`;

export const DELETE_DEPARTMENT_MULTIPLE = `${BASE_URL}/department/api/v1/department/delete_multiple/`;

export const SEARCH_DEPARTMENT = `${BASE_URL}/department/api/v1/department/search/`;

//  Designations
export const CREATE_DESIGNATION = `${BASE_URL}/designation/api/v1/designation/create/`;

export const GET_DESIGNATIONS = `${BASE_URL}/designation/api/v1/designation/all/`;

export const GET_DESIGNATIONS_WITHOUT_PAGINATION = `${BASE_URL}/designation/api/v1/designation/without_pagination/all/`;

export const GET_DESIGNATION_BY_ID = `${BASE_URL}/designation/api/v1/designation/`;

export const UPDATE_DESIGNATION = `${BASE_URL}/designation/api/v1/designation/update/`;

export const DELETE_DESIGNATION = `${BASE_URL}/designation/api/v1/designation/delete/`;

export const SEARCH_DESIGNATION = `${BASE_URL}/designation/api/v1/designation/search/`;

//  permission
export const CREATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/create/`;

export const GET_PERMISSIONS = `${BASE_URL}/permission/api/v1/permission/all/`;

export const GET_PERMISSIONS_WITHOUT_PAGINATION = `${BASE_URL}/permission/api/v1/permission/without_pagination/all/`;

export const GET_PERMISSION_BY_ID = `${BASE_URL}/permission/api/v1/permission/`;

export const CHECK_PERMISSION_NAME_DUPLECATE = `${BASE_URL}/permission/api/v1/permission/checkPermissionName/`;

export const UPDATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/update/`;

export const DELETE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/delete/`;

export const SEARCH_PERMISSION = `${BASE_URL}/permission/api/v1/permission/search/`;

export const GET_PERMISSION_GROUP = `${BASE_URL}/permission/api/v1/permission/get_component_list/`;

//  brands
export const CREATE_BRAND = `${BASE_URL}/brand/api/v1/brand/create/`;

export const GET_BRANDS = `${BASE_URL}/brand/api/v1/brand/all/`;

export const GET_BRANDID = `${BASE_URL}/brand/api/v1/brand/`;

export const GET_BRANDS_WITHOUT_PAGINATION = `${BASE_URL}/brand/api/v1/brand/without_pagination/all/`;

export const UPDATE_BRAND = `${BASE_URL}/brand/api/v1/brand/update/`;

export const DELETE_BRAND = `${BASE_URL}/brand/api/v1/brand/delete/`;

export const SEARCH_BRAND = `${BASE_URL}/brand/api/v1/brand/search/`;

//  manufacturers
export const CREATE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/create/`;

export const GET_MANUFACTURERS_WITHOUT_PAGINATION = `${BASE_URL}/manufacturer/api/v1/manufacturer/without_pagination/all/`;

export const GET_MANUFACTURERS = `${BASE_URL}/manufacturer/api/v1/manufacturer/all/`;

export const GET_MANUFACTURERID = `${BASE_URL}/manufacturer/api/v1/manufacturer/`;

export const UPDATE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/update/`;

export const DELETE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/delete/`;

export const SEARCH_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/search/`;

//  qualification
export const CREATE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/create/`;

export const GET_QUALIFICATIONS = `${BASE_URL}/qualification/api/v1/qualification/all/`;

export const GET_QUALIFICATION_BY_ID = `${BASE_URL}/qualification/api/v1/qualification/`;

export const UPDATE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/update/`;

export const DELETE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/delete/`;
export const DELETE_QUALIFICATION_MULTIPLE = `${BASE_URL}/qualification/api/v1/qualification/delete/`;

export const SEARCH_QUALIFICATON = `${BASE_URL}/qualification/api/v1/qualification/search/`;

//  producttag
export const CREATE_PRODUCTTAG = `${BASE_URL}/producttag/api/v1/producttag/create/`;

export const GET_PRODUCTTAGS = `${BASE_URL}/producttag/api/v1/producttag/all/`;

export const GET_PRODUCTTAGID = `${BASE_URL}/producttag/api/v1/producttag/`;

export const UPDATE_PRODUCTTAG = `${BASE_URL}/producttag/api/v1/producttag/update/`;

export const DELETE_PRODUCTTAG = `${BASE_URL}/producttag/api/v1/producttag/delete/`;

export const SEARCH_PRODUCTTAG = `${BASE_URL}/producttag/api/v1/producttag/search/`;

//  attributevalue
export const CREATE_ATTRIBUTEVALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/create/`;

export const GET_ATTRIBUTEVALUES = `${BASE_URL}/attributevalue/api/v1/attributevalue/all/`;

export const GET_ATTRIBUTEVALUEID = `${BASE_URL}/attributevalue/api/v1/attributevalue/`;

export const UPDATE_ATTRIBUTEVALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/update/`;

export const DELETE_ATTRIBUTEVALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/delete/`;

//  city
export const CREATE_CITY = `${BASE_URL}/city/api/v1/city/create/`;

export const GET_CITYS = `${BASE_URL}/city/api/v1/city/all/`;

export const GET_CITYS_WITHOUT_PAGINATION = `${BASE_URL}/city/api/v1/city/without_pagination/all/`;

export const GET_CITYID = `${BASE_URL}/city/api/v1/city/`;
export const GET_CITY_BY_ID = `${BASE_URL}/city/api/v1/city/`;

export const UPDATE_CITY = `${BASE_URL}/city/api/v1/city/update/`;

export const DELETE_CITY = `${BASE_URL}/city/api/v1/city/delete/`;
export const DELETE_CITY_MULTIPLE = `${BASE_URL}/city/api/v1/city/delete/`;

export const SEARCH_CITY = `${BASE_URL}/city/api/v1/city/search/`;

//  forn content Details
export const CREATE_FORM_CONTENT_DETAIL = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/create/`;

export const GET_FORM_CONTENT_DETAILS = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/all/`;

export const GET_FORM_CONTENT_DETAILS_WITHOUT_PAGINATION = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/without_pagination/all/`;

export const GET_FORM_CONTENT_DETAILID = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/`;

export const UPDATE_FORM_CONTENT_DETAIL = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/update/`;

export const DELETE_FORM_CONTENT_DETAIL = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/delete/`;
export const DELETE_FORM_CONTENT_DETAIL_MULTIPLE = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/delete/`;

export const SEARCH_FORM_CONTENT_DETAIL = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail/search/`;

export const GET_FORM_CONTENT_DETAILS_BY_TITLE = `${BASE_URL}/formcontent_detail/api/v1/formcontent_detail_by_head_title/`;

//  thana
export const CREATE_THANA = `${BASE_URL}/thana/api/v1/thana/create/`;

export const GET_THANAS = `${BASE_URL}/thana/api/v1/thana/all/`;

export const GET_THANAS_WITHOUT_PAGINATION = `${BASE_URL}/thana/api/v1/thana/without_pagination/all/`;

export const GET_THANAID = `${BASE_URL}/thana/api/v1/thana/`;
export const GET_THANA_BY_ID = `${BASE_URL}/thana/api/v1/thana/`;

export const UPDATE_THANA = `${BASE_URL}/thana/api/v1/thana/update/`;

export const DELETE_THANA = `${BASE_URL}/thana/api/v1/thana/delete/`;
export const DELETE_THANA_MULTIPLE = `${BASE_URL}/thana/api/v1/thana/delete/`;

export const SEARCH_THANA = `${BASE_URL}/thana/api/v1/thana/search/`;

//  export const UPDATE_PRODUCT = `${BASE_URL}/product/api/v1/product/update/`;

//  export const DELETE_PRODUCT = `${BASE_URL}/product/api/v1/product/delete/`;

//  productImage
export const CREATE_PRODUCT_IMAGE = `${BASE_URL}/productimage/api/v1/productimage/create/`;

export const GET_PRODUCT_IMAGES = `${BASE_URL}/productimage/api/v1/productimage/all/`;

export const GET_PRODUCT_BY_ID = `${BASE_URL}/productimage/api/v1/productimage/all_productimage_by_product_id/`;

export const DELETE_PRODUCT_IMAGE = `${BASE_URL}/productimage/api/v1/productimage/delete/`;

//  product colors
export const CREATE_PRODUCT_COLOR = `${BASE_URL}/color/api/v1/color/create/`;

export const GET_PRODUCT_COLOR = `${BASE_URL}/color/api/v1/color/all/`;

export const DELETE_PRODUCT_COLOR = `${BASE_URL}/color/api/v1/color/delete/`;

//  product size
export const CREATE_PRODUCT_SIZE = `${BASE_URL}/size/api/v1/size/create/`;

export const GET_PRODUCT_SIZE = `${BASE_URL}/size/api/v1/size/all/`;

export const DELETE_PRODUCT_SIZE = `${BASE_URL}/size/api/v1/size/delete/`;

//  product dropdown data
export const ATTRIBUTE_SET = `${BASE_URL}/attributeset/api/v1/attributeset/all/`;

export const GET_ATTRIBUTE_SET_WITHOUT_PAGINATION = `${BASE_URL}/attributeset/api/v1/attributeset/without_pagination/all/`;

export const BRANDS = `${BASE_URL}/brand/api/v1/brand/all/`;

export const CATEGORIES = `${BASE_URL}/category/api/v1/category/all/`;

export const MANUFACTURERS = `${BASE_URL}/manufacturer/api/v1/manufacturer/all/`;

//  export const VENDOR = `${BASE_URL}/attributeset/api/v1/attributeset/all/`;

//  export const VERIFIED_BY = `${BASE_URL}/attributeset/api/v1/attributeset/all/`;

//  category
export const CREATE_CATEGORY = `${BASE_URL}/category/api/v1/category/create/`;

export const GET_CATEGORIES = `${BASE_URL}/category/api/v1/category/all/`;

export const GET_CATEGORIES_WITHOUT_PAGINATION = `${BASE_URL}/category/api/v1/category/without_pagination/all/`;

export const GET_CATEGORY = `${BASE_URL}/category/api/v1/category/`;

export const UPDATE_CATEGORY = `${BASE_URL}/category/api/v1/category/update/`;

export const DELETE_CATEGORY = `${BASE_URL}/category/api/v1/category/delete/`;

export const SEARCH_CATEGORY = `${BASE_URL}/category/api/v1/category/search/`;

//  role
export const CREATE_ROLE = `${BASE_URL}/role/api/v1/role/create/`;

export const GET_ROLES = `${BASE_URL}/role/api/v1/role/all/`;

export const GET_ROLES_WITHOUT_PAGINATION = `${BASE_URL}/role/api/v1/role/without_pagination/all/`;

export const GET_ROLE = `${BASE_URL}/role/api/v1/role/`;

export const UPDATE_ROLE = `${BASE_URL}/role/api/v1/role/update/`;

export const DELETE_ROLE = `${BASE_URL}/role/api/v1/role/delete/`;

export const SEARCH_ROLE = `${BASE_URL}/role/api/v1/role/search/`;

export const CHECK_ROLE_NAME_DUPLECATE = `${BASE_URL}//role/api/v1/role/checkRoleName/`;

//  permission
//  export const GET_PERMISSIONS = `${BASE_URL}/permissions/api/v1/permissions/all/`;

//  attribute
export const CREATE_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/create/`;

export const GET_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/`;

export const GET_ATTRIBUTES = `${BASE_URL}/attribute/api/v1/attribute/all/`;

export const GET_ATTRIBUTES_WITHOUT_PAGINATION = `${BASE_URL}/attribute/api/v1/attribute/without_pagination/all/`;

export const UPDATE_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/update/`;

export const DELETE_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/delete/`;

export const SEARCH_ATTRIBUTE = `${BASE_URL}/attribute/api/v1/attribute/search/`;

//  attributeset
export const CREATE_ATTRIBUTESET = `${BASE_URL}/attributeset/api/v1/attributeset/create/`;

export const GET_ATTRIBUTESETID = `${BASE_URL}/attributeset/api/v1/attributeset/`;

export const GET_ATTRIBUTESETS = `${BASE_URL}/attributeset/api/v1/attributeset/all/`;

export const UPDATE_ATTRIBUTESET = `${BASE_URL}/attributeset/api/v1/attributeset/update/`;

export const DELETE_ATTRIBUTESET = `${BASE_URL}/attributeset/api/v1/attributeset/delete/`;

export const SEARCH_ATTRIBUTESET = `${BASE_URL}/attributeset/api/v1/attributeset/search/`;

// attributevalue
export const CREATE_ATTRIBUTE_VALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/create/`;

export const GET_ATTRIBUTE_VALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/`;

export const GET_ATTRIBUTE_VALUES = `${BASE_URL}/attributevalue/api/v1/attributevalue/all/`;

export const UPDATE_ATTRIBUTE_VALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/update/`;

export const DELETE_ATTRIBUTE_VALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/delete/`;

export const SEARCH_ATTRIBUTE_VALUE = `${BASE_URL}/attributevalue/api/v1/attributevalue/search/`;

// area
export const CREATE_AREA = `${BASE_URL}/area/api/v1/area/create/`;

export const GET_AREAS = `${BASE_URL}/area/api/v1/area/all/`;

export const GET_AREAID = `${BASE_URL}/area/api/v1/area/`;

export const UPDATE_AREA = `${BASE_URL}/area/api/v1/area/update/`;

export const DELETE_AREA = `${BASE_URL}/area/api/v1/area/delete/`;

export const SEARCH_AREA = `${BASE_URL}/area/api/v1/area/search/`;

// Customer Order
export const CREATE_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/create/`;

export const CONFIRM_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/confirm/`;

export const UPDATE_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/update_order/`;

// Order
export const CREATE_ORDER = `${BASE_URL}/order/api/v1/order/create/`;

export const GET_ORDERS = `${BASE_URL}/order/api/v1/order/all`;

export const GET_ORDERID = `${BASE_URL}/order/api/v1/order/`;

export const UPDATE_ORDER = `${BASE_URL}/order/api/v1/order/update/`;

export const DELETE_ORDER = `${BASE_URL}/order/api/v1/order/delete/`;

export const SEARCH_ORDER = `${BASE_URL}/order/api/v1/order/search/`;

//  purchase_request
export const CREATE_PURCHASE = `${BASE_URL}/purchase_request/api/v1/purchase_request/create_vendor_purchase_request/`;

export const GET_PURCHASES = `${BASE_URL}/purchase_request/api/v1/purchase_request/all/`;

//  export const GET_PURCHASEID = `${BASE_URL}/purchase_request/api/v1/purchase_request/`;
export const GET_PURCHASEID = `${BASE_URL}/purchase_request/api/v1/purchase_request_with_items_images/`;

export const UPDATE_PURCHASE = `${BASE_URL}/purchase_request/api/v1/purchase_request/update/`;

export const DELETE_PURCHASE = `${BASE_URL}/purchase_request/api/v1/purchase_request/delete/`;

export const SEARCH_PURCHASE_REQ = `${BASE_URL}/purchase_request/api/v1/purchase_request/search/`;

//  purchase_req_item
export const DELETE_PURCHASE_REQ_ITEM = `${BASE_URL}/purchase_req_item/api/v1/purchase_req_item/delete/`;

//  purchase_status
export const GET_PURCHASESTATUS = `${BASE_URL}/purchase_status/api/v1/purchase_status/all/`;

//  purchase_req_item_image
export const CREATE_PURCHASE_REQ_ITEM_IMAGE = `${BASE_URL}/purchase_req_item_image/api/v1/purchase_req_item_image/create/`;

export const GET_PURCHASE_REQ_ITEM_IMAGES = `${BASE_URL}/purchase_req_item_image/api/v1/purchase_req_item_image/all/`;

export const GET_PURCHASE_REQ_ITEM_IMAGE = `${BASE_URL}/purchase_req_item_image/api/v1/purchase_req_item_image/`;

export const UPDATE_PURCHASE_REQ_ITEM_IMAGE = `${BASE_URL}/purchase_req_item_image/api/v1/purchase_req_item_image/update/`;

export const DELETE_PURCHASE_REQ_ITEM_IMAGE = `${BASE_URL}/purchase_req_item_image/api/v1/purchase_req_item_image/delete/`;

// purchase_final
export const CREATE_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/create_from_purchase_request/`;

export const GET_PURCHASE_FINALS = `${BASE_URL}/purchase_final/api/v1/purchase_final/all/`;

export const GET_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/`;

export const UPDATE_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/update/`;

export const DELETE_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/delete/`;

export const GET_PURCHASE_FINAL_WITH_ITEMS = `${BASE_URL}/purchase_final/api/v1/purchase_final/get_a_purchase_final_with_items/`;

export const PAY_AND_CONFIRM_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/paybill_and_confirm/`;

export const UPDATE_PURCHASE_FINAL_ITEM = `${BASE_URL}/purchase_final/api/v1/purchase_final/update_item/`;

export const DELETE_PURCHASE_FINAL_ITEM = `${BASE_URL}/purchase_final/api/v1/purchase_final/delete_item/`;

export const SEARCH_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/search/`;

// purchase_final_manually
export const CREATE_PURCHASE_FINAL_MANUALLY = `${BASE_URL}/purchase_final/api/v1/purchase_final/create_directly_from_admin_panel/`;

// OrderItem
export const CREATE_ORDERITEM = `${BASE_URL}/orderitem/api/v1/orderitem/create/`;

export const GET_ORDERITEMS = `${BASE_URL}/orderitem/api/v1/orderitem/all`;

export const GET_ORDERITEMID = `${BASE_URL}/orderitem/api/v1/orderitem/`;

export const UPDATE_ORDERITEM = `${BASE_URL}/orderitem/api/v1/orderitem/update/`;

export const DELETE_ORDERITEM = `${BASE_URL}/orderitem/api/v1/orderitem/delete/`;

// Customer
export const CREATE_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/create/`;

export const GET_CUSTOMERS = `${BASE_URL}/customer/api/v1/customer/all`;

export const GET_CUSTOMERID = `${BASE_URL}/customer/api/v1/customer/`;

export const UPDATE_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/update/`;

export const DELETE_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/delete/`;

export const SEARCH_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/search/`;

// Vendor
export const CREATE_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/create/`;

export const GET_VENDORS = `${BASE_URL}/vendor/api/v1/vendor/all/`;

export const GET_VENDORS_WITHOUT_PAGINATION = `${BASE_URL}/vendor/api/v1/vendor/without_pagination/all/`;

export const GET_VENDORID = `${BASE_URL}/vendor/api/v1/vendor/`;

export const UPDATE_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/update/`;

export const DELETE_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/delete/`;

export const SEARCH_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/search/`;

// Inventory
export const GET_INVENTORY_BY_ID = `${BASE_URL}/inventory/api/v1/inventory/`;

// Shipping Address
export const CREATE_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/create/`;

export const GET_SHIPPINGADDRESSID = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/`;

export const GET_SHIPPINGADDRESSES = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/all/`;

export const UPDATE_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/update/`;

export const DELETE_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/delete/`;

export const SEARCH_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/search/`;

// Payment Method
export const CREATE_PAYMENTMETHOD = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/create/`;

export const GET_PAYMENTMETHODID = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/`;

export const GET_PAYMENTMETHODS = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/all/`;

export const UPDATE_PAYMENTMETHOD = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/update/`;

export const DELETE_PAYMENTMETHOD = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/delete/`;

export const SEARCH_PAYMENTMETHOD = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/search/`;

// Accounts
// primary_group
export const PRIMARY_GROUP = `${BASE_URL}/primary_group/api/v1/primary_group/all/`;

// paymentVoucher
export const CREATE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/create/`;

export const GET_PAYMENTVOUCHERS = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/all`;

export const GET_PAYMENTVOUCHER_BY_ID = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/`;

export const UPDATE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/update/`;

export const DELETE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/delete/`;

export const DELETE_PAYMENTVOUCHER_MULTIPLE = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/delete_multiple/`;

export const SEARCH_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/search/`;

export const GET_PAYMENT_VOUCHER_BY_INVOICE_NO = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/payment_voucher_by_invoice_no/`;

export const GET_PAYMENT_VOUCHER_ID_NAME_BY = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/payment_voucher_with_id_name_dict_by_invoice_no/`;

// receiptVoucher
export const CREATE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/create/`;

export const GET_RECEIPTVOUCHERS = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/all`;

export const GET_RECEIPTVOUCHER_BY_ID = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/`;

export const UPDATE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/update/`;

export const DELETE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/delete/`;

export const DELETE_RECEIPTVOUCHER_MULTIPLE = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/delete_multiple/`;

export const SEARCH_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/search/`;

export const GET_RECEIPT_VOUCHER_BY_INVOICE_NO = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

export const GET_RECEIPT_VOUCHER_ID_NAME_BY = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

// sales
export const CREATE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/create/`;

export const GET_RECEIVABLEBILLS = `${BASE_URL}/sales/api/v1/sales/all`;

export const GET_RECEIVABLEBILL_BY_ID = `${BASE_URL}/sales/api/v1/sales/`;

export const UPDATE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/update/`;

export const DELETE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/delete/`;

export const DELETE_RECEIVABLEBILL_MULTIPLE = `${BASE_URL}/sales/api/v1/sales/delete_multiple/`;

export const SEARCH_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/search/`;

export const GET_RECEIVABLEBILL_BY_INVOICE_NO = `${BASE_URL}/sales/api/v1/sales/sales_by_invoice_no/`;

// purchases
export const CREATE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/create/`;

export const GET_PAYABLEBILLS = `${BASE_URL}/purchase/api/v1/purchase/all`;

export const GET_PAYABLEBILL_BY_ID = `${BASE_URL}/purchase/api/v1/purchase/`;

export const UPDATE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/update/`;

export const DELETE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/delete/`;

export const DELETE_PAYABLEBILL_MULTIPLE = `${BASE_URL}/purchase/api/v1/purchase/delete_multiple/`;

export const SEARCH_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/search/`;

export const GET_PAYABLEBILL_BY_INVOICE_NO = `${BASE_URL}/purchase/api/v1/purchase/purchase_by_invoice_no/`;

// contras
export const CREATE_CONTRA = `${BASE_URL}/contra/api/v1/contra/create/`;

export const GET_CONTRAS = `${BASE_URL}/contra/api/v1/contra/all`;

export const GET_CONTRA_BY_ID = `${BASE_URL}/contra/api/v1/contra/`;

export const UPDATE_CONTRA = `${BASE_URL}/contra/api/v1/contra/update/`;

export const DELETE_CONTRA = `${BASE_URL}/contra/api/v1/contra/delete/`;

export const DELETE_CONTRA_MULTIPLE = `${BASE_URL}/contra/api/v1/contra/delete_multiple/`;

export const SEARCH_CONTRA = `${BASE_URL}/contra/api/v1/contra/search/`;

export const GET_CONTRA_BY_INVOICE_NO = `${BASE_URL}/contra/api/v1/contra/contra_by_invoice_no/`;

// journals
export const CREATE_JOURNAL = `${BASE_URL}/journal/api/v1/journal/create/`;

export const GET_JOURNALS = `${BASE_URL}/journal/api/v1/journal/all`;

export const GET_JOURNAL_BY_ID = `${BASE_URL}/journal/api/v1/journal/`;

export const UPDATE_JOURNAL = `${BASE_URL}/journal/api/v1/journal/update/`;

export const DELETE_JOURNAL = `${BASE_URL}/journal/api/v1/journal/delete/`;

export const DELETE_JOURNAL_MULTIPLE = `${BASE_URL}/journal/api/v1/journal/delete_multiple/`;

export const SEARCH_JOURNAL = `${BASE_URL}/journal/api/v1/journal/search/`;

export const GET_JOURNAL_BY_INVOICE_NO = `${BASE_URL}/journal/api/v1/journal/journal_by_invoice_no/`;

// site_settings
export const CREATE_SITESETTING = `${BASE_URL}/general_setting/api/v1/general_setting/create/`;

export const GET_SITESETTINGID = `${BASE_URL}/general_setting/api/v1/general_setting/`;

export const GET_SITESETTING_BY_ID = `${BASE_URL}/general_setting/api/v1/general_setting/`;

export const GET_SITESETTINGS = `${BASE_URL}/general_setting/api/v1/general_setting/all/`;

export const UPDATE_SITESETTING = `${BASE_URL}/general_setting/api/v1/general_setting/update/`;

export const DELETE_SITESETTING = `${BASE_URL}/general_setting/api/v1/general_setting/delete/`;
export const DELETE_SITESETTING_MULTIPLE = `${BASE_URL}/general_setting/api/v1/general_setting/delete/`;

// slidersettings
export const CREATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/create/`;

export const GET_SLIDERSETTINGID = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/`;

export const GET_SLIDERSETTINGS = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/all/`;

export const UPDATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/update/`;

export const DELETE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/delete/`;

// branch
export const CREATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/create/`;

export const GET_BRANCHID = `${BASE_URL}/branch/api/v1/branch/`;
export const GET_BRANCH_BY_ID = `${BASE_URL}/branch/api/v1/branch/`;

export const GET_BRANCHS = `${BASE_URL}/branch/api/v1/branch/all/`;

export const GET_BRANCH_WITHOUT_PAGINATION = `${BASE_URL}/branch/api/v1/branch/without_pagination/all/`;

export const UPDATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/update/`;

export const DELETE_BRANCH = `${BASE_URL}/branch/api/v1/branch/delete/`;
export const DELETE_BRANCH_MULTIPLE = `${BASE_URL}/branch/api/v1/branch/delete/`;

export const SEARCH_BRANCH = `${BASE_URL}/branch/api/v1/branch/search/`;

// customer types
export const CREATE_CUSTOMERTYPE = `${BASE_URL}/customer_type/api/v1/customer_type/create/`;

export const GET_CUSTOMERTYPEID = `${BASE_URL}/customer_type/api/v1/customer_type/`;

export const GET_CUSTOMERTYPES = `${BASE_URL}/customer_type/api/v1/customer_type/all/`;

export const UPDATE_CUSTOMERTYPE = `${BASE_URL}/customer_type/api/v1/customer_type/update/`;

export const DELETE_CUSTOMERTYPE = `${BASE_URL}/customer_type/api/v1/customer_type/delete/`;

// menu item
export const MENU_ITEMS = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_by_user_role/`;

export const CREATE_MENU = `${BASE_URL}/menu_item/api/v1/menu_item/create/`;

export const DELETE_MENU = `${BASE_URL}/menu_item/api/v1/menu_item/delete/`;

export const GET_MENUS = `${BASE_URL}/menu_item/api/v1/menu_item/`;

export const UPDATE_MENU = `${BASE_URL}/menu_item/api/v1/menu_item/update/`;

export const GET_MENUS_ALL = `${BASE_URL}/menu_item/api/v1/menu_item/all/`;

export const GET_MENUS_ALL_NESTED = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_without_pagination/all/`;

export const GET_MENUS_BY_ROLE = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_by_role_id/`;

export const SEARCH_MENU = `${BASE_URL}/menu_item/api/v1/menu_item/search/`;

export const GET_MENUS_WITHOUT_PAGINATION = `${BASE_URL}/menu_item/api/v1/menu_item/without_pagination/all/`;

// role menu
export const CREATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/create/`;

export const GET_ROLEMENUS = `${BASE_URL}/role_menu/api/v1/role_menu/all`;

export const GET_ROLEMENU_BY_ID = `${BASE_URL}/role_menu/api/v1/role_menu/`;

export const UPDATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/update/`;

export const DELETE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/delete/`;

export const SEARCH_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/search/`;

// export const SEARCH_ROLEMENU = `${BASE_URL}/rolemenu/api/v1/rolemenu/search/`;

// passenger type
export const CREATE_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/create/`;

export const GET_PASSENGERTYPES = `${BASE_URL}/passenger_type/api/v1/passenger_type/all`;

export const GET_PASSENGERTYPE_BY_ID = `${BASE_URL}/passenger_type/api/v1/passenger_type/`;

export const UPDATE_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/update/`;

export const DELETE_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/delete/`;
export const DELETE_PASSENGERTYPE_MULTIPLE = `${BASE_URL}/passenger_type/api/v1/passenger_type/delete/`;

export const SEARCH_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/search/`;

// current status
export const CREATE_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/create/`;

export const GET_CURRENTSTATUSS = `${BASE_URL}/current_status/api/v1/current_status/all`;

export const GET_CURRENTSTATUS_BY_ID = `${BASE_URL}/current_status/api/v1/current_status/`;

export const UPDATE_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/update/`;

export const DELETE_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/delete/`;
export const DELETE_CURRENTSTATUS_MULTIPLE = `${BASE_URL}/current_status/api/v1/current_status/delete/`;

export const SEARCH_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/search/`;
export const CURRENTSTATUS_WP = `${BASE_URL}/current_status/api/v1/current_status/without_pagination/all/`;

// profession
export const CREATE_PROFESSION = `${BASE_URL}/profession/api/v1/profession/create/`;

export const GET_PROFESSIONS = `${BASE_URL}/profession/api/v1/profession/all`;

export const GET_PROFESSION_BY_ID = `${BASE_URL}/profession/api/v1/profession/`;

export const UPDATE_PROFESSION = `${BASE_URL}/profession/api/v1/profession/update/`;

export const DELETE_PROFESSION = `${BASE_URL}/profession/api/v1/profession/delete/`;
export const DELETE_PROFESSION_MULTIPLE = `${BASE_URL}/profession/api/v1/profession/delete/`;

export const SEARCH_PROFESSION = `${BASE_URL}/profession/api/v1/profession/search/`;

// Currency
export const CREATE_CURRENCY = `${BASE_URL}/currency/api/v1/currency/create/`;

export const GET_CURRENCYS = `${BASE_URL}/currency/api/v1/currency/all/`;

export const GET_CURRENCY_BY_ID = `${BASE_URL}/currency/api/v1/currency/`;

export const UPDATE_CURRENCY = `${BASE_URL}/currency/api/v1/currency/update/`;

export const DELETE_CURRENCY = `${BASE_URL}/currency/api/v1/currency/delete/`;
export const DELETE_CURRENCY_MULTIPLE = `${BASE_URL}/currency/api/v1/currency/delete/`;

export const SEARCH_CURRENCY = `${BASE_URL}/currency/api/v1/currency/search/`;

// agent
export const CREATE_AGENT = `${BASE_URL}/agent/api/v1/agent/create/`;

export const GET_AGENTS = `${BASE_URL}/agent/api/v1/agent/all`;

export const GET_AGENT_BY_ID = `${BASE_URL}/agent/api/v1/agent/`;

export const UPDATE_AGENT = `${BASE_URL}/agent/api/v1/agent/update/`;

export const DELETE_AGENT = `${BASE_URL}/agent/api/v1/agent/delete/`;

export const SEARCH_AGENT = `${BASE_URL}/agent/api/v1/agent/search/`;

export const AGENT_FILTER_BY = `${BASE_URL}/report/api/v1/agent_report/filter/`;

export const AGENT_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/agent_report/without_pagination/filter/`;
// subagent
export const CREATE_SUBAGENT = `${BASE_URL}/sub_agent/api/v1/sub_agent/create/`;

export const GET_SUBAGENTS = `${BASE_URL}/sub_agent/api/v1/sub_agent/all`;

export const GET_SUBAGENT_BY_ID = `${BASE_URL}/sub_agent/api/v1/sub_agent/`;

export const UPDATE_SUBAGENT = `${BASE_URL}/sub_agent/api/v1/sub_agent/update/`;

export const DELETE_SUBAGENT = `${BASE_URL}/sub_agent/api/v1/sub_agent/delete/`;

export const SEARCH_SUBAGENT = `${BASE_URL}/sub_agent/api/v1/sub_agent/search/`;

export const SUBAGENT_FILTER_BY = `${BASE_URL}/report/api/v1/sub_agent_report/filter/`;

export const SUBAGENT_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/sub_agent_report/without_pagination/filter/`;

export const SUBAGENTS_WITHOUT_PAGINATION = `${BASE_URL}/sub_agent/api/v1/sub_agent/by_agent/`;

// demand
export const CREATE_DEMAND = `${BASE_URL}/demand/api/v1/demand/create/`;

export const GET_DEMANDS = `${BASE_URL}/demand/api/v1/demand/all`;

export const GET_DEMAND_BY_ID = `${BASE_URL}/demand/api/v1/demand/`;

export const UPDATE_DEMAND = `${BASE_URL}/demand/api/v1/demand/update/`;

export const DELETE_DEMAND = `${BASE_URL}/demand/api/v1/demand/delete/`;

export const SEARCH_DEMAND = `${BASE_URL}/demand/api/v1/demand/search/`;

export const CHECK_AVAILABLE_DEMAND_FOR_DEMAND_ASSIGN = `${BASE_URL}/demand/api/v1/demand/check_available_demand/`;

export const UPDATE_DEMAND_ASSIGN = `${BASE_URL}/demand/api/v1/demand/multiple_demand_assign/update/`;

export const CHECK_DEMAND_ASSIGN_EXIST_IN_PASSENGER = `${BASE_URL}/demand/api/v1/demand/check_demand_assign`;

// recruitingAgency
export const CREATE_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/create/`;

export const GET_RECRUITINGAGENCYS = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/all`;

export const GET_RECRUITINGAGENCY_BY_ID = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/`;

export const UPDATE_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/update/`;

export const DELETE_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/delete/`;
export const DELETE_RECRUITINGAGENCY_MULTIPLE = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/delete/`;

export const SEARCH_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/search/`;

// visa_entry
export const CREATE_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/create/`;

export const CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER = `${BASE_URL}/visa_entry/api/check_calling_assign/`;

export const GET_VISAENTRYS = `${BASE_URL}/visa_entry/api/v1/visa_entry/all`;

export const GET_CALLING_ENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/malaysia/`;

export const GET_VISAENTRY_BY_ID = `${BASE_URL}/visa_entry/api/v1/visa_entry/`;

export const UPDATE_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/update/`;

export const DELETE_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/delete/`;

export const DELETE_VISAENTRY_MULTIPLE = `${BASE_URL}/visa_entry/api/v1/visa_entry/delete_multiple/`;

export const SEARCH_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/search/`;

export const VISAENTRY_BY_PASSENGER_ID = `${BASE_URL}/visa_entry/api/v1/visa_entry/get_a_visa_entry_by_pasenger_id/`;

export const GET_VISA_CHECK = `${BASE_URL}/visa_check/api/v1/visa_check/get_ksa_visa_details_update_visaentry/`;

export const GET_ALL_CALLING_ASSIGN_WP = `${BASE_URL}/visa_entry/api/v1/visa_entry/without_pagination/malaysia/`;

export const UPDATE_CALLING_ASSIGN = `${BASE_URL}/visa_entry/api/v1/visa_entry/multiple_calling_assign/update/`;

export const CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN = `${BASE_URL}/visa_entry/api/v1/visa_entry/check_available_visa/`;

// E-visa_entry
export const CREATE_E_VISAENTRY = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/create/`;

export const GET_E_VISAENTRYS = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/all/`;

export const GET_E_VISAENTRY_BY_ID = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/`;

export const UPDATE_E_VISAENTRY = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/update/`;

export const DELETE_E_VISAENTRY = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/delete/`;

export const DELETE_E_VISAENTRY_MULTIPLE = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/delete_multiple/`;

export const SEARCH_E_VISAENTRY = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/search/`;

export const E_VISAENTRY_BY_PASSENGER_ID = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/get_a_e_visa_entry_by_pasenger_id/`;

// passenger
export const CREATE_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/create/`;

export const CREATE_PASSENGER_DATA_FROM_IMAGE = `${BASE_URL}/passenger/api/v1/passenger/get_passport_data_by_passport_image/`;

// export const GET_PASSENGERS = `${BASE_URL}/passenger/api/v1/passenger/all/`;

export const GET_PASSENGERS_BY_TYPE = `${BASE_URL}/passenger/api/v1/passenger/get_all_passenger_by_passenger_type_name/`;

export const GET_PASSENGER_BY_ID = `${BASE_URL}/passenger/api/v1/passenger/`;
export const GET_PASSENGER_BY_PASSENGER_ID = `${BASE_URL}/passenger/api/v1/passenger/by_passenger_id/`;

export const UPDATE_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/update/`;

export const DELETE_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/delete/`;

// export const DELETE_PASSENGER_MULTIPLE = `${BASE_URL}/passenger/api/v1/passenger/delete_multiple/`;

export const SEARCH_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/search/`;

export const CHECK_PASSPORT_NO_WHEN_CREATE = `${BASE_URL}/passenger/api/v1/passenger/check_passport_no_when_create/`;

export const CHECK_VISA_NO_WHEN_CREATE = `${BASE_URL}/passenger/api/v1/passenger/check_visa_qty_by_visano/`;

export const CHECK_PASSPORT_NO_WHEN_UPDATE = `${BASE_URL}/passenger/api/v1/passenger/check_passport_no_when_update/`;

export const SEARCH_PASSENGER_BY = `${BASE_URL}/passenger/api/v1/passenger/search_by_passenger_id_office_serial_passport_no_contact_no/`;

export const PASSENGER_FILTER_BY = `${BASE_URL}/report/api/v1/passenger_report/filter/`;

export const PASSENGER_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/passenger_report/without_pagination/filter/`;

// Passenger Summary

export const PASSENGER_SUMMARY_FILTER_BY = `${BASE_URL}/report/api/v1/passenger_summary_report/filter/`;

export const PASSENGER_SUMMARY_ALL = `${BASE_URL}/report/api/v1/de_ag_ve_pa_me_mo_ow_mo_em_tr_mp_fl_report/all/`;

export const PASSENGER_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/passenger_summary_report_wp/filter/`;

export const UPDATE_PASSENGER_SUMMARY_CLM = `${BASE_URL}/report/api/v1/passenger_summary_columns/update/`;

export const GET_PASSENGER_SUMMARY_CLM_ = `${BASE_URL}/report/api/v1/get_passenger_summary_columns/`;

// medical
export const CREATE_MEDICAL = `${BASE_URL}/medical/api/v1/medical/create/`;

export const UPDATE_MEDICAL = `${BASE_URL}/medical/api/v1/medical/update/`;

export const DELETE_MEDICAL = `${BASE_URL}/medical/api/v1/medical/delete/`;

export const MEDICAL_BY_PASSENGER_ID = `${BASE_URL}/medical/api/v1/medical/get_by_passenger_id/`;

export const MEDICAL_FILTER_BY = `${BASE_URL}/report/api/v1/medical_report/filter/`;

export const MEDICAL_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/medical_report/without_pagination/filter/`;

export const CIRCULAR_FILTER_BY = `${BASE_URL}/report/api/v1/demand_report/filter/`;

export const CIRCULAR_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/demand_report/without_pagination/filter/`;

// medicalCenter
export const CREATE_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/create/`;

export const GET_MEDICALCENTERS = `${BASE_URL}/medical_center/api/v1/medical_center/all`;

export const GET_MEDICALCENTER_BY_ID = `${BASE_URL}/medical_center/api/v1/medical_center/`;

export const UPDATE_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/update/`;

export const DELETE_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/delete/`;

export const DELETE_MEDICALCENTER_MULTIPLE = `${BASE_URL}/medical_center/api/v1/medical_center/delete_multiple/`;

export const SEARCH_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/search/`;

export const MEDICALCENTER_WHEN_UPDATE = `${BASE_URL}/medical_center/api/v1/medical_center/check_when_update/`;

// embassy
export const CREATE_EMBASSY = `${BASE_URL}/embassy/api/v1/embassy/create/`;

export const UPDATE_EMBASSY = `${BASE_URL}/embassy/api/v1/embassy/update/`;

export const DELETE_EMBASSY = `${BASE_URL}/embassy/api/v1/embassy/delete/`;

export const EMBASSY_BY_PASSENGER_ID = `${BASE_URL}/embassy/api/v1/embassy/check_visa_entry_medical_mofa_and_get_embassy_by_passenger_id/`;

export const EMBASSY_FILTER_BY = `${BASE_URL}/report/api/v1/embassy_report/filter/`;

export const EMBASSY_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/embassy_report/without_pagination/filter/`;

// mofa
export const CREATE_MOFA = `${BASE_URL}/mofa/api/v1/mofa/create/`;

export const UPDATE_MOFA = `${BASE_URL}/mofa/api/v1/mofa/update/`;

export const DELETE_MOFA = `${BASE_URL}/mofa/api/v1/mofa/delete/`;

export const MOFA_BY_PASSENGER_ID = `${BASE_URL}/mofa/api/v1/mofa/get_by_passenger_id/`;

export const MOFA_FILTER_BY = `${BASE_URL}/report/api/v1/mofa_report/filter/`;

export const MOFA_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/mofa_report/without_pagination/filter/`;

// female_cv
export const CREATE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/create/`;

export const UPDATE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/update/`;

export const DELETE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/delete/`;

export const DELETE_MULTIPLE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/delete_multiple/`;

export const FEMALECV_BY_PASSENGER_ID = `${BASE_URL}/female_cv/api/v1/female_cv/get_by_passenger_id/`;

export const GET_FEMALECV_BY_ID = `${BASE_URL}/female_cv/api/v1/female_cv/`;

export const GET_FEMALECV_BY_ID_FOR_PRINT = `${BASE_URL}/female_cv/api/v1/female_cv/print/`;

export const GET_FEMALECVS = `${BASE_URL}/female_cv/api/v1/female_cv/all/`;

export const SEARCH_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/search/`;

// flight
export const CREATE_FLIGHT = `${BASE_URL}/flight/api/v1/flight/create/`;

export const UPDATE_FLIGHT = `${BASE_URL}/flight/api/v1/flight/update/`;

export const DELETE_FLIGHT = `${BASE_URL}/flight/api/v1/flight/delete/`;

export const FLIGHT_BY_PASSENGER_ID = `${BASE_URL}/flight/api/v1/flight/get_by_passenger_id/`;

export const FLIGHT_FILTER_BY = `${BASE_URL}/report/api/v1/flight_report/filter/`;

export const FLIGHT_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/flight_report/without_pagination/filter/`;

// male_cv
export const CREATE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/create/`;

export const GET_MALECVS = `${BASE_URL}/male_cv/api/v1/male_cv/all/`;

export const UPDATE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/update/`;

export const DELETE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/delete/`;

export const DELETE_MULTIPLE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/delete_multiple/`;
export const GET_MALECV_BY_ID_FOR_PRINT = `${BASE_URL}/male_cv/api/v1/male_cv/print/`;

export const MALECV_BY_PASSENGER_ID = `${BASE_URL}/male_cv/api/v1/male_cv/get_by_passenger_id/`;

export const MALECV_BY_ID = `${BASE_URL}/male_cv/api/v1/male_cv/`;

export const SEARCH_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/search/`;

// man_power_list
export const CREATE_MANPOWERLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/create/`;

export const UPDATE_MANPOWERLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/update/`;

export const DELETE_MANPOWERLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/delete/`;

export const MANPOWERLIST_BY_PASSENGER_ID = `${BASE_URL}/man_power_list/api/v1/man_power_list/get_by_passenger_id/`;

// musaned_okala
export const CREATE_MUSANEDOKALA = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/create/`;

export const UPDATE_MUSANEDOKALA = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/update/`;

export const DELETE_MUSANEDOKALA = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/delete/`;

export const MUSANEDOKALA_BY_PASSENGER_ID = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/get_by_passenger_id/`;

// office_work
export const CREATE_OFFICEWORK = `${BASE_URL}/office_work/api/v1/office_work/create/`;

export const UPDATE_OFFICEWORK = `${BASE_URL}/office_work/api/v1/office_work/update/`;

export const DELETE_OFFICEWORK = `${BASE_URL}/office_work/api/v1/office_work/delete/`;

export const OFFICEWORK_BY_PASSENGER_ID = `${BASE_URL}/office_work/api/v1/office_work/get_by_passenger_id/`;

// training
export const CREATE_TRAINING = `${BASE_URL}/training/api/v1/training/create/`;

export const UPDATE_TRAINING = `${BASE_URL}/training/api/v1/training/update/`;

export const DELETE_TRAINING = `${BASE_URL}/training/api/v1/training/delete/`;

export const TRAINING_BY_PASSENGER_ID = `${BASE_URL}/training/api/v1/training/get_by_passenger_id/`;

export const TRAINING_FILTER_BY = `${BASE_URL}/report/api/v1/training_report/filter/`;

export const TRAINING_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/training_report/without_pagination/filter/`;

// visa_cancel_list
export const CREATE_VISACANCELLIST = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/create/`;

export const UPDATE_VISACANCELLIST = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/update/`;

export const DELETE_VISACANCELLIST = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/delete/`;

export const VISACANCELLIST_BY_PASSENGER_ID = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/get_by_passenger_id/`;

// visa_reissue_list
export const CREATE_VISAREISSUELIST = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/create/`;

export const UPDATE_VISAREISSUELIST = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/update/`;

export const DELETE_VISAREISSUELIST = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/delete/`;

export const VISAREISSUELIST_BY_PASSENGER_ID = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/get_by_passenger_id/`;

// visa_submission_list
export const CREATE_VISASUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/create/`;

export const UPDATE_VISASUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/update/`;

export const DELETE_VISASUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/delete/`;

export const VISASUBMISSIONLIST_BY_PASSENGER_ID = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/get_by_passenger_id/`;

export const VISASBLISTS = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/all/`;

export const VISASBLISTS_BY_DATE = `${BASE_URL}/form/api/v1/form/get_visa_submission_list_data_by_date_or_passenger_id/`;

export const VISASBLISTS_WITHOUT_PG = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/all/`;

// man_power
export const CREATE_MANPOWER = `${BASE_URL}/man_power/api/v1/man_power/create/`;

export const UPDATE_MANPOWER = `${BASE_URL}/man_power/api/v1/man_power/update/`;

export const DELETE_MANPOWER = `${BASE_URL}/man_power/api/v1/man_power/delete/`;

export const MANPOWER_BY_PASSENGER_ID = `${BASE_URL}/man_power/api/v1/man_power/check_embassy_by_passenger_id/`;

export const MANPOWER_FILTER_BY = `${BASE_URL}/report/api/v1/man_power_report/filter/`;

export const MANPOWER_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/man_power_report/without_pagination/filter/`;

// calling_emb_attestation
export const CREATE_CALLINGEMBATTESTATION = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/create/`;

export const UPDATE_CALLINGEMBATTESTATION = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/update/`;

export const DELETE_CALLINGEMBATTESTATION = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/delete/`;

export const CALLINGEMBATTESTATION_BY_PASSENGER_ID = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/get_a_calling_emb_attestation_by_passenger_id/`;

//

export const CHECK_LEDGER_NAME_WHEN_UPDATE = `${BASE_URL}/ledger_account/api/v1/ledger_account/check_name_of_ledger_account_when_update/`;

export const CHECK_LEDGER_NAME_WHEN_CREATE = `${BASE_URL}/ledger_account/api/v1/ledger_account/check_name_of_ledger_account_when_create/`;

export const CREATE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/create/`;

export const GET_LEDGERS = `${BASE_URL}/ledger_account/api/v1/ledger_account/all`;

export const GET_LEDGER_BY_ID = `${BASE_URL}/ledger_account/api/v1/ledger_account/`;

export const UPDATE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/update/`;

export const DELETE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/delete/`;

export const DELETE_LEDGER_MULTIPLE = `${BASE_URL}/ledger_account/api/v1/ledger_account/delete_multiple/`;

export const CHECK_BANK_OR_CASH = `${BASE_URL}/ledger_account/api/v1/check_bank_or_cash_by_ledger_id/`;

export const SEARCH_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/search/`;

export const LEDGERS_WITHOUT_PAGINATION = `${BASE_URL}/ledger_account/api/v1/ledger_account/without_pagination/all/`;

// subLedger
export const CREATE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/create/`;

export const GET_SUBLEDGERS = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/all`;

export const GET_SUBLEDGER_BY_ID = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/`;

export const UPDATE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/update/`;

export const DELETE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/delete/`;

export const DELETE_SUBLEDGER_MULTIPLE = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/delete_multiple/`;

export const SEARCH_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/search/`;

export const SUBLEDGERS_WITHOUT_PAGINATION = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/all`;

// group
export const CREATE_GROUP = `${BASE_URL}/group/api/v1/group/create/`;

export const GET_GROUPS = `${BASE_URL}/group/api/v1/group/all`;

export const GET_GROUP_BY_ID = `${BASE_URL}/group/api/v1/group/`;

export const UPDATE_GROUP = `${BASE_URL}/group/api/v1/group/update/`;

export const DELETE_GROUP = `${BASE_URL}/group/api/v1/group/delete/`;

export const DELETE_GROUP_MULTIPLE = `${BASE_URL}/group/api/v1/group/delete_multiple/`;

export const SEARCH_GROUP = `${BASE_URL}/group/api/v1/group/search/`;

// bmet
export const CREATE_BMET = `${BASE_URL}/bmet/api/v1/bmet/create/`;

export const GET_BMETS = `${BASE_URL}/bmet/api/v1/bmet/all`;

export const GET_BMET_BY_ID = `${BASE_URL}/form/api/v1/form/get_bmet_form_data_by_passenger_id_or_passport_no_or_office_serial/`;

export const UPDATE_BMET = `${BASE_URL}/bmet/api/v1/bmet/update/`;

export const DELETE_BMET = `${BASE_URL}/bmet/api/v1/bmet/delete/`;

export const DELETE_BMET_MULTIPLE = `${BASE_URL}/bmet/api/v1/bmet/delete_multiple/`;

export const SEARCH_BMET = `${BASE_URL}/bmet/api/v1/bmet/search/`;

// ksa_visa
export const CREATE_KSAVISA = `${BASE_URL}/ksa_visa/api/v1/ksa_visa/create/`;

export const GET_KSAVISAS = `${BASE_URL}/ksa_visa/api/v1/ksa_visa/all`;

export const GET_KSAVISA_BY_ID = `${BASE_URL}/form/api/v1/form/get_ksa_visa_form_data_by_passenger_id_or_passport_no_or_office_serial/`;

export const UPDATE_KSAVISA = `${BASE_URL}/ksa_visa/api/v1/ksa_visa/update/`;

export const DELETE_KSAVISA = `${BASE_URL}/ksa_visa/api/v1/ksa_visa/delete/`;

export const DELETE_KSAVISA_MULTIPLE = `${BASE_URL}/ksa_visa/api/v1/ksa_visa/delete_multiple/`;

export const SEARCH_KSAVISA = `${BASE_URL}/ksa_visa/api/v1/ksa_visa/search/`;

// ksa_visa_menuals
export const CREATE_KSAVISA_MANUALS = `${BASE_URL}/passenger/api/v1/passenger/create_mofa_musaned_okala_office_work/`;

// Visa Entry Report
export const VISA_ENTRY_FILTER_BY = `${BASE_URL}/report/api/v1/visa_entry_report/filter/`;

export const VISA_ENTRY_FILTER_BY_WP = `${BASE_URL}/report/api/v1/visa_entry_report/without_pagination/filter/`;
// Visa Entry Report
export const DEMAND_FILTER_BY = `${BASE_URL}/report/api/v1/demand_report/filter/`;

export const DEMAND_FILTER_BY_WP = `${BASE_URL}/report/api/v1/demand_report/without_pagination/filter/`;

// Calling Entry Report
export const CALLING_ENTRY_FILTER_BY = `${BASE_URL}/report/api/v1/calling_entry_report/filter/`;

export const CALLING_ENTRY_FILTER_BY_WP = `${BASE_URL}/report/api/v1/calling_entry_report/without_pagination/filter/`;

// Calling Entry Report
export const AUTHORIZE_LOG_FILTER_BY = `${BASE_URL}/acc_update_perm/api/v1/acc_update_authorize_log/report/`;

export const AUTHORIZE_LOG_FILTER_BY_WP = `${BASE_URL}/acc_update_perm/api/v1/acc_update_authorize_log/report_wp/`;

// reports

// account statement
export const ACCOUNTSTATEMENT_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/by_ledger_type/`;

export const ACCOUNTSTATEMENT_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/by_ledger_type_wp/`;

// account statement summary
export const ACCOUNTSUMMARY_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/get_total_cash_dr_cr_bank_dr_cr/`;

export const ACCOUNTSUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/get_total_cash_dr_cr_bank_dr_cr/`;

// ledger
export const LEDGER_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/general/`;

export const LEDGER_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/general_without_pagination/`;

// sub ledger
export const PAYMENT_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/report_for_payment_voucher/`;

export const PAYMENT_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_payment_voucher_wp/`;

// Foreignledger
export const FOREIGNLEDGER_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/foreign_currency/`;

export const FOREIGNLEDGER_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/foreign_currency_without_pagination/`;

// payment-summary
export const PAYMENT_SUMMARY_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/summary_for_payment_voucher/`;

export const PAYMENT_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/summary_for_payment_voucher_wp/`;

// receipt voucher
export const RECEIPT_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/report_for_receipt_voucher/`;

export const RECEIPT_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_receipt_voucher_wp/`;

// receipt-summary
export const RECEIPT_SUMMARY_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/summary_for_receipt_voucher/`;

export const RECEIPT_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/summary_for_receipt_voucher/`;

// make_list
export const CREATE_MAKEALIST = `${BASE_URL}/make_list/api/v1/make_list/create/`;

export const GET_MAKEALISTS = `${BASE_URL}/make_list/api/v1/make_list/all`;

export const GET_MAKEALIST_BY_ID = `${BASE_URL}/make_list/api/v1/make_list/`;

export const UPDATE_MAKEALIST = `${BASE_URL}/make_list/api/v1/make_list/update/`;

export const DELETE_MAKEALIST = `${BASE_URL}/make_list/api/v1/make_list/delete/`;

export const DELETE_MAKEALIST_MULTIPLE = `${BASE_URL}/make_list_item/api/v1/make_list_item/delete_multiple/`;

export const SEARCH_MAKEALIST = `${BASE_URL}/make_list/api/v1/make_list/search/`;

// make a list clm
export const MAKE_A_LIST_CLMS = `${BASE_URL}/make_list_column/api/v1/make_list_column/all/`;

export const UPDATE_MAKEALIST_CLM = `${BASE_URL}/make_list_column/api/v1/make_list_column/update/`;

export const GET_MAKEALIST_CLM_BY_LIST_ID = `${BASE_URL}/make_list_column/api/v1/make_list_column/get_by_make_list_id/`;

// make a list row
export const CREATE_MAKEALIST_ROW = `${BASE_URL}/make_list_item/api/v1/make_list_item/create/`;

export const DELETE_MAKEALIST_ROW = `${BASE_URL}/make_list_item/api/v1/make_list_item/delete/`;

export const GET_MAKEALIST_ROW_BY_LIST_ID = `${BASE_URL}/make_list_item/api/v1/make_list_item/get_by_make_list_id/`;

// make a list report
export const GET_MAKEALIST_REPORT_BY_ID = `${BASE_URL}/make_list/api/v1/make_list/get_make_list_with_make_list_item_and_make_list_columns/`;

export const GET_MAKEALIST_REPORT_BY_ID_NO_PG = `${BASE_URL}/make_list/api/v1/make_list/get_make_list_with_make_list_item_and_make_list_columns_without_pagination/`;
// User Chat
export const GET_ALL_MESSAGES = `${BASE_URL}/message/api/v1/message/all/`;
export const GET_MESSAGES_BY_ID = `${BASE_URL}/message/api/v1/message/`;
export const GET_ALL_MESSAGES_BY_SENDER_ID = `${BASE_URL}/message/api/v1/message/get_all_by_sender_id/`;
export const GET_ALL_MESSAGES_BY_RECIEVER_ID = `${BASE_URL}/message/api/v1/message/get_all_by_receiver_id/`;
export const POST_MESSAGES = `${BASE_URL}/message/api/v1/message/create/`;
export const UNREAD_MESSAGES = `${BASE_URL}/message/api/v1/message/get_all_senders_with_unseen_message_count_by_receiver_id/`;
export const UNREAD_MESSAGES_WITH_ALL_USERS = `${BASE_URL}/message/api/v1/message/get_all_senders_with_unseen_message_count_by_receiver_id/`;

// todo_task
export const POST_TODO_TASK = `${BASE_URL}/todo_task/api/v1/todo_task/create/`;
export const TODO_TASK_TYPE = `${BASE_URL}/task_type/api/v1/task_type/all/`;

export const ALL_TODO_TASK = `${BASE_URL}/todo_task/api/v1/todo_task/all/`;

export const ALL_TODO_TASK_FOR_CALENDER = `${BASE_URL}/todo_task/api/v1/todo_task/for_calender/all/`;

export const UPDATE_TODO_TASK = `${BASE_URL}/todo_task/api/v1/todo_task/update/`;
export const DELETE_TODO_TASK = `${BASE_URL}/todo_task/api/v1/todo_task/delete/`;
export const GET_TODOS_TASK = `${BASE_URL}/todo_task/api/v1/todo_task/`;

export const TASK_TYPE_LABELS = `${BASE_URL}/task_type/api/v1/task_type/by_month/all/`;

// Todo-Task-Type

export const CREATE_TODOTASKTYPE = `${BASE_URL}/task_type/api/v1/task_type/create/`;

export const GET_TODOTASKTYPES = `${BASE_URL}/task_type/api/v1/task_type/all/`;

export const GET_TODOTASKTYPE_BY_ID = `${BASE_URL}/task_type/api/v1/task_type/`;

export const UPDATE_TODOTASKTYPE = `${BASE_URL}/task_type/api/v1/task_type/update/`;

export const DELETE_TODOTASKTYPE = `${BASE_URL}/task_type/api/v1/task_type/delete/`;

export const DELETE_TODOTASKTYPE_MULTIPLE = `${BASE_URL}/task_type/api/v1/task_type/delete/`;

// export const SEARCH_TODOTASKTYPE= `${BASE_URL}/profession/api/v1/profession/search/`;

//  country
export const CREATE_COUNTRY = `${BASE_URL}/country/api/v1/country/create/`;

export const GET_COUNTRYS = `${BASE_URL}/country/api/v1/country/all/`;

export const GET_COUNTRYS_WITHOUT_PAGINATION = `${BASE_URL}/country/api/v1/country/without_pagination/all/`;

export const GET_COUNTRYID = `${BASE_URL}/country/api/v1/country/`;

export const GET_COUNTRY_BY_ID = `${BASE_URL}/country/api/v1/country/`;

export const DELETE_COUNTRY_MULTIPLE = `${BASE_URL}/country/api/v1/country/`;

export const UPDATE_COUNTRY = `${BASE_URL}/country/api/v1/country/update/`;

export const DELETE_COUNTRY = `${BASE_URL}/country/api/v1/country/delete/`;

export const SEARCH_COUNTRY = `${BASE_URL}/country/api/v1/country/search/`;

// Manpower_submission_list
export const CREATE_MANPOWERSUBMISSIONLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/create/`;

export const UPDATE_MANPOWERSUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/update/`;

export const DELETE_MANPOWERSUBMISSIONLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/delete/`;

export const MANPOWERSUBMISSIONLIST_BY_PASSENGER_ID = `${BASE_URL}/man_power_list/api/v1/man_power_list/get_by_passenger_id/`;

export const MANPOWERSBLISTS = `${BASE_URL}/man_power_list/api/v1/man_power_list/all/`;

export const MANPOWERSBLISTS_BY_DATE = `${BASE_URL}/form/api/v1/form/get_man_power_list_data_by_filtering/`;

export const MANPOWERSBLISTS_WITHOUT_PG = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/all/`;

// Manpower_Note_Sheet
export const CREATE_MANPOWERNOTESHEET = `${BASE_URL}/man_power_list/api/v1/man_power_list/create/`;

export const UPDATE_MANPOWERNOTESHEET = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/update/`;

export const DELETE_MANPOWERNOTESHEET = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/delete/`;

export const MANPOWERSHEET_BY_PASSENGER_ID = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/get_by_passenger_id/`;

export const MANPOWERNTSHEETS = `${BASE_URL}/man_power_list/api/v1/man_power_list/all/`;

export const MANPOWERNTSHEETS_BY_DATE = `${BASE_URL}/form/api/v1/form/get_man_power_list_note_sheet_data_by_filtering/`;

export const MANPOWERNTSHEETS_WITHOUT_PG = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/all/`;

// Ticketentry
export const CREATE_TICKETENTRY = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/create/`;

export const GET_TICKETENTRYS = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/all/`;

export const GET_TICKETENTRY_BY_ID = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/`;

export const UPDATE_TICKETENTRY = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/update/`;

export const DELETE_TICKETENTRY = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/delete/`;
export const DELETE_TICKETENTRY_MULTIPLE = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/delete/`;

export const SEARCH_TICKETENTRY = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/search/`;

// iata_ticket TickSale
export const CREATE_TICKETSALE = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/create/`;

export const GET_TICKETSALES = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/all/`;

export const SEARCH_TICKETSALES = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/search/`;

export const GET_TICKETSALE_BY_ID = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/`;

export const UPDATE_TICKETSALE = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/update/`;

export const DELETE_TICKETSALE = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/delete/`;

// export const SEARCH_TICKETSALE = `${BASE_URL}/ticket_purchase/api/v1/ticket_purchase/search/`;

// Ticketentry Report
export const TICKETSALES_FILTER_BY = `${BASE_URL}/air_ticket_report/api/v1/ticket_purchase_report/filter/`;

export const TICKETSALES_FILTER_WITHOUT_PG = `${BASE_URL}/air_ticket_report/api/v1/ticket_purchase_report/without_pagination/filter/`;

// Currency
export const CURRENCY_WITHOUT_PG = `${BASE_URL}/currency/api/v1/currency/without_pagination/all/`;

// Status

export const CURRENT_STATUS_WITHOUT_PG = `${BASE_URL}/current_status/api/v1/current_status/without_pagination/all/`;

// Ticket Sales Temp with Image
// iata_ticket TickSale
export const CREATE_TICKETSALE_WITH_IMAGE = `${BASE_URL}/iata_ticket_temp_temp/api/v1/iata_ticket_temp_temp/transfer_to_iata_ticket_temporary/`;

export const CREATE_SINGLE_TICKETSALE_WITH_IMAGE = `${BASE_URL}/iata_ticket_temp_temp/api/v1/iata_ticket_temp_temp/create/`;

export const GET_TICKETSALES_WITH_IMAGE = `${BASE_URL}/iata_ticket_temp_temp/api/v1/iata_ticket_temp_temp/all/`;

export const GET_TICKETSALE_BY_ID_WITH_IMAGE = `${BASE_URL}/iata_ticket_temp_temp/api/v1/iata_ticket_temp_temp/`;

export const UPDATE_TICKETSALE_WITH_IMAGE = `${BASE_URL}/iata_ticket_temp_temp/api/v1/iata_ticket_temp_temp/update/`;

export const DELETE_TICKETSALE_WITH_IMAGE = `${BASE_URL}/iata_ticket_temp_temp/api/v1/iata_ticket_temp_temp/delete/`;

// ID journals
export const CREATE_JOURNALID = `${BASE_URL}/idjournal/api/v1/idjournal/create/`;

export const GET_JOURNALIDS = `${BASE_URL}/idjournal/api/v1/idjournal/all/`;

export const GET_JOURNALID_BY_ID = `${BASE_URL}/idjournal/api/v1/idjournal/`;

export const UPDATE_JOURNALID = `${BASE_URL}/idjournal/api/v1/idjournal/update/`;

export const DELETE_JOURNALID = `${BASE_URL}/idjournal/api/v1/idjournal/delete/`;

export const DELETE_JOURNALID_MULTIPLE = `${BASE_URL}/idjournal/api/v1/idjournal/delete_multiple/`;

export const SEARCH_JOURNALID = `${BASE_URL}/idjournal/api/v1/idjournal/search/`;

export const GET_JOURNALID_BY_INVOICE_NO = `${BASE_URL}/idjournal/api/v1/idjournal/idjournal_by_invoice_no/`;

// Trial balance summary Report
export const TRIALBALANCE_FILTER_BY = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/trial_balance/`;

export const TRIALBALANCE_FILTER_BY_ID = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/group_details/`;

export const TRIALBALANCE__FILTER_WITHOUT_PG = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/trial_balance/`;
//  airway
export const CREATE_AIRWAY = `${BASE_URL}/airway/api/v1/airway/create/`;

export const GET_AIRWAYS = `${BASE_URL}/airway/api/v1/airway/all/`;

export const GET_AIRWAYS_WITHOUT_PAGINATION = `${BASE_URL}/airway/api/v1/airway/without_pagination/all/`;

export const GET_AIRWAYID = `${BASE_URL}/airway/api/v1/airway/`;

export const UPDATE_AIRWAY = `${BASE_URL}/airway/api/v1/airway/update/`;

export const DELETE_AIRWAY = `${BASE_URL}/airway/api/v1/airway/delete/`;
export const DELETE_AIRWAY_MULTIPLE = `${BASE_URL}/airway/api/v1/airway/delete/`;

export const SEARCH_AIRWAY = `${BASE_URL}/airway/api/v1/airway/search/`;

//  GDS
export const CREATE_GDS = `${BASE_URL}/gds/api/v1/gds/create/`;

export const GET_GDSS = `${BASE_URL}/gds/api/v1/gds/all/`;

export const GET_GDSS_WITHOUT_PAGINATION = `${BASE_URL}/gds/api/v1/gds/without_pagination/all/`;

export const GET_GDSID = `${BASE_URL}/gds/api/v1/gds/`;
export const CHECK_GDS_NAME_DUPLECATE = `${BASE_URL}/gds/api/v1/gds/check_gds_name/`;

export const UPDATE_GDS = `${BASE_URL}/gds/api/v1/gds/update/`;

export const DELETE_GDS = `${BASE_URL}/gds/api/v1/gds/delete/`;
export const DELETE_GDS_MULTIPLE = `${BASE_URL}/gds/api/v1/gds/delete/`;

export const SEARCH_GDS = `${BASE_URL}/gds/api/v1/gds/search/`;

// Balance Sheet summary Report
export const BALANCESHEET_FILTER_BY = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/balance_sheet/`;

export const BALANCESHEET__FILTER_WITHOUT_PG = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/balance_sheet/`;

export const BALANCESHEET_DETAILS = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/group_details/`;

// Profit Loss summary Report
export const PROFITLOSS_FILTER_BY = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/profit_loss/`;

export const PROFITLOSS__FILTER_WITHOUT_PG = `${BASE_URL}/balance_sheet/api/v1/balance_sheet/profit_loss/`;
// finger
export const CREATE_FINGER = `${BASE_URL}/finger/api/v1/finger/create/`;

export const GET_FINGERS = `${BASE_URL}/finger/api/v1/finger/all`;

export const GET_FINGER_BY_ID = `${BASE_URL}/form/api/v1/form/get_finger_form_data_by_passenger_id/`;

export const UPDATE_FINGER = `${BASE_URL}/finger/api/v1/finger/update/`;

export const DELETE_FINGER = `${BASE_URL}/finger/api/v1/finger/delete/`;

export const DELETE_FINGER_MULTIPLE = `${BASE_URL}/finger/api/v1/finger/delete_multiple/`;

export const SEARCH_FINGER = `${BASE_URL}/finger/api/v1/finger/search/`;

// Departure
export const CREATE_DEPARTURE = `${BASE_URL}/departure/api/v1/departure/create/`;

export const GET_DEPARTURES = `${BASE_URL}/departure/api/v1/departure/all`;

export const GET_DEPARTURE_BY_ID = `${BASE_URL}/form/api/v1/form/get_departure_card_data_by_passenger_id/`;

export const UPDATE_DEPARTURE = `${BASE_URL}/departure/api/v1/departure/update/`;

export const DELETE_DEPARTURE = `${BASE_URL}/departure/api/v1/departure/delete/`;

export const DELETE_DEPARTURE_MULTIPLE = `${BASE_URL}/departure/api/v1/departure/delete_multiple/`;

export const SEARCH_DEPARTURE = `${BASE_URL}/departure/api/v1/departure/search/`;

// DashBoard

// Get Medical Count
export const GET_UPCOMING_MEDICAL_COUNT = `${BASE_URL}/medical/api/v1/medical/get_upcoming_expiring_medical_entry_wp/`;
export const GET_UPCOMING_VISA_COUNT = `${BASE_URL}/visa_entry/api/v1/visa_entry/get_upcoming_expiring_visa_wp/`;
export const GET_UPCOMING_E_VISA_COUNT = `${BASE_URL}/e_visa_entry/api/v1/e_visa_entry/get_upcoming_expiring_e_visa_wp/`;
export const GET_UPCOMING_EMBASSY_COUNT = `${BASE_URL}/embassy/api/v1/embassy/get_upcoming_expiring_embassy_entry_wp/`;
// Get Medical Count
export const GET_MEDICAL_COUNT = `${BASE_URL}/dashboard/api/v1/get_medical_counts/`;
// Get Manpower Count
export const GET_MANPOWER_COUNT = `${BASE_URL}/dashboard/api/v1/get_manpower_counts/`;
// Get Flight Count
export const GET_FLIGHT_COUNT = `${BASE_URL}/dashboard/api/v1/get_flight_counts/`;

// Get EMABSSY Count
export const GET_VISA_COUNT = `${BASE_URL}/dashboard/api/v1/get_embassy_counts/`;
// Get total registered customer
export const GET_REGISTERED_CUSTOMERS = `${BASE_URL}/dashboard/api/v1/get_total_count_of_customers/`;
// Get total stock
export const GET_TOTAL_LOW_STOCKS = `${BASE_URL}/dashboard/api/v1/get_total_count_of_low_stock_products/`;
// Get total stock
export const GET_TOTAL_LATEST_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_latest_orders/`;
// Get total orders
export const GET_TOTAL_ORDERS = `${BASE_URL}/dashboard/api/v1/get_order_totals/`;
// Get total Incomplete orders
export const GET_TOTAL_INCOMPLETE_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_incomplete_orders/`;
// Get Employee
export const GET_ALL_EMPLOYEE_WITHOUT_PAGINATION = `${BASE_URL}/employee/api/v1/employee/without_paginaiton/all/`;
// Get total paid orders
export const GET_ALL_PAID_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_paid_orders/`;
// Get total unPaid orders
export const GET_ALL_UNPAID_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_unpaid_orders/`;
// Get total low stocks
export const GET_ALL_LOW_STOCK_PRODUCTS = `${BASE_URL}/dashboard/api/v1/get_all_low_stock_products/                  `;
export const GET_ALL_CATEGORIZED_ORDER_ITEM_COUNT = `${BASE_URL}/dashboard/api/v1/get_all_categorized_order_item_count/`;
// Get Best seller Amount
export const GET_BEST_SELLER_AMOUNT = `${BASE_URL}/dashboard/api/v1/get_best_seller_by_amount/`;
// Get Best seller Quantity
export const GET_BEST_SELLER_QUANTITY = `${BASE_URL}/dashboard/api/v1/get_best_seller_by_quantity/`;

// Not Medical List

export const GET_NOT_MEDICAL_LIST = `${BASE_URL}/dashboard/api/v1/get_not_medical_list/`;

export const GET_NOT_MEDICAL_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_not_medical_list_without_pagination/`;

//  Medical FIT List

export const MEDICAL_FIT_LIST = `${BASE_URL}/dashboard/api/v1/get_medical_fit_list/`;

export const MEDICAL_FIT_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_medical_fit_list_without_pagination/`;

//  Medical Unfit List

export const GET_MEDICAL_UNFIT_LIST = `${BASE_URL}/dashboard/api/v1/get_medical_unfit_list/`;

export const GET_MEDICAL_UNFIT_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_medical_unfit_list_without_pagination/`;

// Medical Visit List

export const GET_MEDICAL_VISIT_LIST = `${BASE_URL}/dashboard/api/v1/get_medical_visit_list/`;

export const GET_MEDICAL_VISIT_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_medical_visit_list_without_pagination/`;

// Visa Stamp Waiting List

export const GET_VISA_STAMP_WAITING_LIST = `${BASE_URL}/dashboard/api/v1/get_embassy_not_done/`;

export const GET_VISA_STAMP_WAITING_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_embassy_not_done_without_pagination/`;

// Visa Stamp Ok List

export const GET_VISA_STAMP_OK_LIST = `${BASE_URL}/dashboard/api/v1/get_embassy_done_list/`;

export const GET_VISA_STAMP_OK_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_embassy_done_list_without_pagination/`;

// Manpower Waiting List

export const GET_MANPOWER_WAITING_LIST = `${BASE_URL}/dashboard/api/v1/get_manpower_not_done_list/`;

export const GET_MANPOWER_WAITING_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_manpower_not_done_list_without_pagination/`;

// Manpower Ok List

export const GET_MANPOWER_OK_LIST = `${BASE_URL}/dashboard/api/v1/get_manpower_done_list/`;

export const GET_MANPOWER_OK_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_manpower_done_list_without_pagination/`;

// Flight Ticket Waiting List

export const GET_FLIGHT_TICKET_WAITING_LIST = `${BASE_URL}/dashboard/api/v1/get_ticket_waiting_list/`;

export const GET_FLIGHT_TICKET_WAITING_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_ticket_waiting_list_without_pagination/`;

// Malaysia Dashboard
export const GET_DASHBOARD_COUNT_FOR_MALAYSIA = `${BASE_URL}/dashboard/api/v1/calling_entry_count`;
// Saudi Arabic Dashboard
export const GET_DASHBOARD_COUNT_FOR_SAUDI = `${BASE_URL}/dashboard/api/v1/ksa_entry_count`;

// Flight FLIGHT Waiting List

export const GET_FLIGHT_FLIGHT_WAITING_LIST = `${BASE_URL}/dashboard/api/v1/get_flight_waiting_list/`;

export const GET_FLIGHT_FLIGHT_WAITING_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_flight_waiting_list_without_pagination/`;
// Flight FLIGHT Done List

export const GET_FLIGHT_FLIGHT_DONE_LIST = `${BASE_URL}/dashboard/api/v1/get_flight_done_list/`;

export const GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_flight_done_list_without_pagination/`;

// Latest Flight List
export const GET_LATEST_FLIGHT_LIST = `${BASE_URL}/dashboard/api/v1/get_latest_flight_list/`;

export const GET_LATEST_FLIGHT_LIST_WITHOUT_PG = `${BASE_URL}/dashboard/api/v1/get_latest_flight_list_without_pagination/`;

// Dashboard For Malaysia Report
export const GET_MALAYSIA_DASHBOARD_REPORT = `${BASE_URL}/report/api/v1/calling_emb_attestation_report/filter/`;

export const GET_MALAYSIA_DASHBOARD_REPORT_WITHOUT_PG = `${BASE_URL}/report/api/v1/calling_emb_attestation_report/without_pagination/filter/`;

// Flight Status Summary
export const GET_FLIGHT_STATUS_SUMMARY = `${BASE_URL}/dashboard/api/v1/get_all_embassy_manpower_flight_status_count/`;

// Incomplete Total Flight List
export const GET_INCOMPLETE_TOTAL_FLIGHT_LIST = `${BASE_URL}/dashboard/api/v1/get_all_incomplete_flight_count_and_total/`;

// Total Account Summary
export const GET_TOTAL_ACCOUNT_SUMMARY_LIST = `${BASE_URL}/dashboard/api/v1/get_total_account_summary/`;

// Dashboard Chart Data
export const GET_DASHBOARD_CHART_DATA = `${BASE_URL}/dashboard/api/v1/get_flight_chart_data/`;

// debtor and a creditor Data
export const GET_DEBTOR_AND_CREDITOR_DATA = `${BASE_URL}/dashboard/api/v1/get_sundry_debtors_creditors_total_amount/`;

// Creditor Report Total Report
export const GET_CREDITOR_TOTAL_REPORT_DATA = `${BASE_URL}/account_report/api/v1/account_report/report_for_sundry_creditors/`;

export const GET_CREDITOR_TOTAL_REPORT_DATA_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_sundry_creditors_without_pagination/`;

// Debtor Report Total Report
export const GET_DEBTOR_TOTAL_REPORT_DATA = `${BASE_URL}/account_report/api/v1/account_report/report_for_sundry_debtors/`;

export const GET_DEBTOR_TOTAL_REPORT_DATA_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_sundry_debtors_without_pagination/`;

// Multiple Visa Entry

export const GET_MULTIPLE_VISA_ENTRY_CLM_ = `${BASE_URL}/passenger/api/v1/passenger/without_pagination/all/`;
export const PASSENGER_VISA_ENTRY_WITHOUT_PAGINATION = `${BASE_URL}/passenger/api/v1/passenger/visa_entry_null_without_pagination/all/`;
export const CREATE_MULTIPLE_VISA_ENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/multiple_visa_entry/`;
export const GET_PASSENGER_BY_PASSENGERID = `${BASE_URL}/passenger/api/v1/passenger/without_visa_entry/`;
export const GET_PASSENGER_BY_PASSENGER_STATUS = `${BASE_URL}/passenger/api/v1/passenger/status/`;
export const GET_PASSENGER_BY_VISA_FORM_MANUAL = `${BASE_URL}/passenger/api/v1/passenger/visa_form/`;

// Authorized Account

export const CREATE_AUTHORIZE = `${BASE_URL}/authorize_account/api/v1/authorize_account/create/`;

export const GET_AUTHORIZES = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/all/`;

export const GET_AUTHORIZE_BY_ID = `${BASE_URL}/authorize_account/api/v1/authorize_account/`;

export const UPDATE_AUTHORIZE_APPROVED = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/update_status_to_approved/`;
export const UPDATE_AUTHORIZE_CANCEL = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/update_status_to_canceled/`;

export const DELETE_AUTHORIZE = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/delete/`;

export const DELETE_AUTHORIZE_MULTIPLE = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/delete_multiple/`;

export const SEARCH_AUTHORIZE = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/search/`;

export const AUTHORIZES_WITHOUT_PAGINATION = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/without_pagination/all/`;

export const DELETE_AUTHORIZE_REQUEST = `${BASE_URL}/acc_update_perm/api/v1/acc_update_perm/delete/`;

// Document Mail

export const CREATE_DOCUMENT_MAIL = `${BASE_URL}/mail_document/api/v1/mail_document/`;

// Ticketrefund
export const CREATE_TICKETREFUND = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/create/`;

export const GET_TICKETREFUNDS = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/all/`;

export const GET_TICKETREFUND_BY_ID = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/`;

export const UPDATE_TICKETREFUND = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/update/`;

export const DELETE_TICKETREFUND = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/delete/`;
export const DELETE_TICKETREFUND_MULTIPLE = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/delete/`;

export const SEARCH_TICKETREFUND = `${BASE_URL}/ticket_refund/api/v1/ticket_refund/search/`;

// Ticket Depute
export const CREATE_TICKETDEPUTE = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/create/`;

export const GET_TICKETDEPUTES = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/all/`;

export const GET_TICKETDEPUTE_BY_ID = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/`;

export const UPDATE_TICKETDEPUTE = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/update/`;

export const DELETE_TICKETDEPUTE = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/delete/`;
export const DELETE_TICKETDEPUTE_MULTIPLE = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/delete/`;

export const SEARCH_TICKETDEPUTE = `${BASE_URL}/ticket_depute/api/v1/ticket_depute/search/`;

// Ticket Posting

export const SEARCH_TICKETPOSTING = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/filter/`;

export const CREATE_TICKETPOSTING = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/transfer_to_iata_ticket/`;

// iata_ticket Edit

export const GET_TICKETEDITS = `${BASE_URL}/iata_ticket/api/v1/iata_ticket/all/`;

export const GET_TICKETEDIT_BY_ID = `${BASE_URL}/iata_ticket/api/v1/iata_ticket/`;

export const UPDATE_TICKETEDIT = `${BASE_URL}/iata_ticket/api/v1/iata_ticket/update/`;

export const DELETE_TICKETEDIT = `${BASE_URL}/iata_ticket/api/v1/iata_ticket/delete/`;

export const SEARCH_TICKETEDIT = `${BASE_URL}/iata_ticket/api/v1/iata_ticket/search/`;

//  IATA Ticket Report

export const GET_IATA_TICKET_REPORT = `${BASE_URL}/air_ticket_report/api/v1/iata_ticket_report/filter/`;
export const GET_IATA_TICKET_REPORT_WITHOUT_PG = `${BASE_URL}/air_ticket_report/api/v1/iata_ticket_report_wp/filter/`;

export const GET_IATA_TICKET_REFUND_REPORT = `${BASE_URL}/air_ticket_report/api/v1/ticket_refund_report/filter/`;
export const GET_IATA_TICKET_REFUND_REPORT_WITHOUT_PG = `${BASE_URL}/air_ticket_report/api/v1/ticket_refund_report_wp/filter/`;

export const GET_IATA_TICKET_DEPUTE_REPORT = `${BASE_URL}/air_ticket_report/api/v1/ticket_depute_report/filter/`;
export const GET_IATA_TICKET_DEPUTE_REPORT_WP = `${BASE_URL}/air_ticket_report/api/v1/ticket_depute_report_wp/filter/`;

export const GET_IATA_TICKET_SALES_SUMMARY_REPORT = `${BASE_URL}/air_ticket_report/api/v1/iata_ticket_summary_report/filter/`;
export const GET_IATA_TICKET_SALES_SUMMARY_REPORT_WITHOUT_PG = `${BASE_URL}/air_ticket_report/api/v1/iata_ticket_summary_report_wp/filter/`;

// User_Permission

export const GET_USER_PERMISSION = `${BASE_URL}/permission/api/v1/permission/get_all_permission_by_user_role/`;

//  Activity Log
export const CREATE_ACTIVITY_LOG = `${BASE_URL}/activity_log/api/v1/activity_log/create/`;

export const GET_ACTIVITY_LOGS = `${BASE_URL}/activity_log/api/v1/activity_log/all/`;

export const GET_ACTIVITY_LOGS_WITHOUT_PAGINATION = `${BASE_URL}/activity_log/api/v1/activity_log/without_pagination/all/`;

export const GET_ACTIVITY_LOG_BY_ID = `${BASE_URL}/activity_log/api/v1/activity_log/`;

export const UPDATE_ACTIVITYLOG = `${BASE_URL}/activity_log/api/v1/activity_log/update/`;

export const DELETE_ACTIVITYLOG = `${BASE_URL}/activity_log/api/v1/activity_log/delete/`;

export const SEARCH_ACTIVITYLOG = `${BASE_URL}/activity_log/api/v1/activity_log/filter/`;
export const SEARCH_ACTIVITYLOG_WP = `${BASE_URL}/activity_log/api/v1/activity_log/filter_wp/`;

//   Log
export const GET_PASSENGER_LOG = `${BASE_URL}/log/api/v1/log/passenger_log/`;

export const GET_MEDICAL_LOG = `${BASE_URL}/log/api/v1/log/medical_log/`;

export const GET_EMBASSY_LOG = `${BASE_URL}/log/api/v1/log/embassy_log/`;

export const GET_MOFA_LOG = `${BASE_URL}/log/api/v1/log/mofa_log/`;

export const GET_MUSANED_OKALA_LOG = `${BASE_URL}/log/api/v1/log/musanedokala_log/`;

export const GET_OFFICE_WORK_LOG = `${BASE_URL}/log/api/v1/log/officework_log/`;

export const GET_TRAINING_LOG = `${BASE_URL}/log/api/v1/log/training_log/`;

export const GET_MANPOWER_LOG = `${BASE_URL}/log/api/v1/log/manpower_log/`;

export const GET_FLIGHT_LOG = `${BASE_URL}/log/api/v1/log/flight_log/`;

// Passenger Ledger Report

export const GET_PASSENGER_LEDGER_REPORT = `${BASE_URL}/account_log_report/api/v1/account_log_report/for_passenger/`;

export const GET_PASSENGER_LEDGER_REPORT_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/for_passenger_without_pagination/`;

export const GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT = `${BASE_URL}/account_report/api/v1/account_report/passenger_sales/`;

export const GET_PASSENGER_LEDGER_COST_DETAILS_REPORT = `${BASE_URL}/account_report/api/v1/account_report/passenger_purchase/`;

// Passenger Account Summary Report

export const GET_PASSENGER_ACCOUNT_SUMMARY_REPORT = `${BASE_URL}/account_log_report/api/v1/account_log_report/passenger_accountlog_summary_by_ledger/`;

export const GET_PASSENGER_ACCOUNT_SUMMARY_REPORT_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/passenger_accountlog_summary_by_ledger_wp/`;

// Passenger Delivery

export const CREATE_PASSENGER_LEDGER_DELIVERY = `${BASE_URL}/passenger_delivery/api/v1/passenger_delivery/create/`;

export const UPDATE_PASSENGER_LEDGER_DELIVERY = `${BASE_URL}/passenger_delivery/api/v1/passenger_delivery/update/`;

export const DELETE_PASSENGER_LEDGER_DELIVERY = `${BASE_URL}/passenger_delivery/api/v1/passenger_delivery/delete/`;

// Passenger Delivery

export const GET_PASSENGER_DELIVERY_REPORT = `${BASE_URL}/report/api/v1/passenger_delivery_report/`;

export const GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG = `${BASE_URL}/report/api/v1/passenger_delivery_report_without_pagination/`;

// Form Control Head

export const GET_FORM_CONTROL_HEAD_WITHOUT_PG = `${BASE_URL}/formcontent_head/api/v1/formcontent_head/without_pagination/all/`;

// demand
export const CREATE_COMPLAIN = `${BASE_URL}/complain/api/v1/complain/create/`;

export const GET_COMPLAINS = `${BASE_URL}/complain/api/v1/complain/all/`;

export const GET_COMPLAIN_BY_ID = `${BASE_URL}/complain/api/v1/complain/`;

export const UPDATE_COMPLAIN = `${BASE_URL}/complain/api/v1/complain/update/`;

export const DELETE_MULTIPLE_COMPLAIN = `${BASE_URL}/complain/api/v1/complain/delete_multiple/`;

export const DELETE_COMPLAIN = `${BASE_URL}/complain/api/v1/complain/delete/`;

export const SEARCH_COMPLAIN = `${BASE_URL}/complain/api/v1/complain/search/`;

// Multiple Status Update
export const UPDATE_MULTIPLE_STATUS = `${BASE_URL}/passenger/api/v1/passenger/multiple_status_update/`;
export const UPDATE_MULTIPLE_PASENGER_STATUS = `${BASE_URL}/passenger/api/v1/passenger/status/`;

// Notification
export const GET_NOTOFICATION = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_passport_medical_visa_counts/`;

// Medical  Notification
export const GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_medical_data/`;
export const GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_medical_data_wp/`;

// Embassy  Notification
export const GET_EXPIRABLE_EMBASSY_NOTOFICATION_REPORT = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_embassy_data/`;
export const GET_EXPIRABLE_EMBASSY_NOTOFICATION_REPORT_WITHOUT_PG = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_embassy_data_wp/`;

// EVisa  Notification
export const GET_EXPIRABLE_EVISA_NOTOFICATION_REPORT = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_evisa_data/`;
export const GET_EXPIRABLE_EVISA_NOTOFICATION_REPORT_WITHOUT_PG = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_evisa_data_wp/`;
// MUSANED Report For Saudi Dashboard
export const GET_MUSANED_REPORT_FOR_SAUDI_DASHBOARD = `${BASE_URL}/report/api/v1/musaned_report/filter/`;
export const GET_MUSANED_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG = `${BASE_URL}/report/api/v1/musaned_report/filter/`;
// Registered /On Process Report For Saudi Dashboard
export const GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD = `${BASE_URL}/report/api/v1/ksa_report/filter/`;
export const GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG = `${BASE_URL}/report/api/v1/ksa_report/filter/`;

// Passport Notification
export const GET_EXPIRABLE_PASSPORT_NOTOFICATION_REPORT = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_passport_data/`;

// Passport Notification
export const GET_EXPIRABLE_PASSPORT_NOTOFICATION_REPORT_WITHOUT_PG = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_passport_data_wp/`;

// Visa Notification
export const GET_EXPIRABLE_VISA_NOTOFICATION_REPORT = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_visa_data/`;

// Visa Notification
export const GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG = `${BASE_URL}/expiring_data/api/v1/expiring_data/get_expirable_visa_data_wp/`;

// Passenger Summary Update

export const UPDATE_PASSENGER_SUMMARY_UPDATE_CLM = `${BASE_URL}/passenger_update_column/api/v1/passenger_update_column/update/`;

export const GET_PASSENGER_SUMMARY_UPDATE_CLM_ = `${BASE_URL}/passenger_update_column/api/v1/passenger_update_column/all/`;

export const GET_PASSENGER_UPDATES = `${BASE_URL}/passenger_update/api/v1/passenger_update/all/`;

export const UPDATE_PASSENGER_UPDATES = `${BASE_URL}/passenger_update/api/v1/passenger_update/update/`;

export const DELETE_PASSENGER_UPDATES = `${BASE_URL}/passenger_update/api/v1/passenger_update/delete/`;

// Company Overvier Report

export const GET_COMPANY_OVERVIEW_REPORT = `${BASE_URL}/report/api/v1/company_overview_report/`;

export const GET_COMPANY_OVERVIEW_REPORT_WITHOUT_PG = `${BASE_URL}/report/api/v1/company_overview_report_wp/`;

// pamemoemtrmpfl_report_column

// export const GET_REPORT_COLUMN = `${BASE_URL}/pamemoemtrmpfl_report_column/api/v1/pamemoemtrmpfl_report_column/`;

// export const UPDATE_REPORT_COLUMN = `${BASE_URL}/pamemoemtrmpfl_report_column/api/v1/pamemoemtrmpfl_report_column/update/`;

// receipt voucher
export const POSTDATE_FILTER_BY = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/filter/`;

export const POSTDATE_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_receipt_voucher_wp/`;

// cron_job;
export const POST_CORN_JOB = `${BASE_URL}/cron_job/api/v1/start_all_onetime_cronjobs/`;

// Ledger Current Balance
export const GET_LEDGER_CURRENT_BALANCE = `${BASE_URL}/account_log_report/api/v1/account_log_report/total_balance_if_ledger_or_not/`;
export const BANGLADESH_ALL_BANK_WITHOUT_PAGINATION = `${BASE_URL}/bank/api/v1/bank/all/without_pagination/`;

// passenger_status_overview;
export const PASSENGER_STATUS_OVERVIEW_FILTER_BY = `${BASE_URL}/passenger_status_overview/api/v1/passenger_status_overview_report/`;

export const PASSENGER_STATUS_OVERVIEW_FILTER_WITHOUT_PG = `${BASE_URL}/passenger_status_overview/api/v1/passenger_status_overview_report_wp/`;
// passenger_status_overview_DETAILS;
export const PASSENGER_STATUS_OVERVIEW_DETAILS_FILTER_BY = `${BASE_URL}/passenger_status_overview/api/v1/passenger_status_overview_details_report/`;

export const PASSENGER_STATUS_OVERVIEW_DETAILS_FILTER_WITHOUT_PG = `${BASE_URL}/passenger_status_overview/api/v1/passenger_status_overview_details_report_wp/`;

//  postdate_cheques
export const CREATE_POST_DATE_CHECK = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/create/`;

export const GET_POST_DATE_CHECKS = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/all/`;

export const GET_POST_DATE_CHECKS_WITHOUT_PAGINATION = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/without_pagination/all/`;

export const GET_POST_DATE_CHECK_BY_ID = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/`;

export const UPDATE_POST_DATE_CHECK = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/update/`;

export const DELETE_POST_DATE_CHECK = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/delete/`;

export const DELETE_POST_DATE_CHECK_MULTIPLE = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/delete/`;

export const SEARCH_POST_DATE_CHECK = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/search/`;

export const POST_DATE_CHECK_PREVIOUS_BALANCE = `${BASE_URL}/postdate_cheque/api/v1/previous_balance_check_account/`;

export const GET_MEMBER_ID_BY_RL_NO = `${BASE_URL}/agency/api/v1/get_ledger_id_by_rl_no/`;

export const GET_POST_DATA_CHEQUE_POPUP_INFO = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/postdatecheque_popup_info/`;

export const POST_DATE_CHEQUE_TYPE_WITHOUT_PAGINATION = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/get_distinct_types_of_postdatecheque/`;

// menu content

export const CREATE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/create/`;

export const DELETE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/delete/`;

export const GET_CONTENTS = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/`;

export const UPDATE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/update/`;

export const GET_CONTENTS_ALL = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/all/`;

export const GET_CONTENTS_ALL_NESTED = `${BASE_URL}/cms_menu_content_content/api/v1/get_all_cms_menu_content_content_by_cms_menu_content_id/`;

export const GET_CONTENTS_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;

// Bulk Ticket Entry
export const GET_BULK_TICKET_DATA = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/entry/`;
export const CREATE_BULK_TICKET = `${BASE_URL}/iata_ticket_temporary/api/v1/iata_ticket_temporary/bulk_create/`;

// CV_BANK
export const CREATE_CV_BANK = `${BASE_URL}/cv_bank/api/v1/cv_bank/create/`;
export const CREATE_PRINT_CV_BANK = `${BASE_URL}/cv_bank/api/v1/cv_bank/print/`;

export const UPDATE_CV_BANK = `${BASE_URL}/cv_bank/api/v1/cv_bank/update/`;

export const DELETE_CV_BANK = `${BASE_URL}/cv_bank/api/v1/cv_bank/delete/`;

export const DELETE_MULTIPLE_CV_BANK = `${BASE_URL}/cv_bank/api/v1/cv_bank/delete_multiple/`;

export const CV_BANK_BY_PASSENGER_ID = `${BASE_URL}/cv_bank/api/v1/cv_bank/get_by_passenger_id/`;

export const GET_CV_BANK_BY_ID = `${BASE_URL}/cv_bank/api/v1/cv_bank/`;

export const GET_CV_BANKS = `${BASE_URL}/cv_bank/api/v1/cv_bank/all/`;

export const SEARCH_CV_BANK = `${BASE_URL}/cv_bank/api/v1/cv_bank/search/`;

// Tikcte Dashboard

export const GET_TICKET_DASHBOARD_COUNTING = `${BASE_URL}/ticket/api/v1/ticket/dashboard_counting/`;
export const GET_TICKET_DASHBOARD_SALES_PER_MONTH_COUNTING = `${BASE_URL}/ticket/api/v1/ticket/ticket_sell_per_month/`;
export const GET_TICKET_DASHBOARD_LATEST_TICKETS = `${BASE_URL}/ticket/api/v1/ticket/total_new_tickets_list/`;
export const GET_TICKET_DASHBOARD_TOTAL_PURCHASE_SALES = `${BASE_URL}/ticket/api/v1/ticket/total_tickets_sales_perchase/`;
export const GET_TICKET_DASHBOARD_PURCHASE_SALES = `${BASE_URL}/ticket/api/v1/ticket/total_tickets_summery/`;

//  days_of_expire_notifications
export const CREATE_EXPIRED_DAYS_COUNT = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/create/`;

export const GET_EXPIRED_DAYS_COUNTS = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/all/`;

export const GET_EXPIRED_DAYS_COUNTS_WITHOUT_PAGINATION = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/without_pagination/all/`;

export const GET_EXPIRED_DAYS_COUNTID = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/`;

export const UPDATE_EXPIRED_DAYS_COUNT = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/update/`;

export const DELETE_EXPIRED_DAYS_COUNT = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/delete/`;

export const SEARCH_EXPIRED_DAYS_COUNT = `${BASE_URL}/days_of_expire_notification/api/v1/days_of_expire_notification/search/`;

// Ticket Sales Report For Dashboard
export const GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT = `${BASE_URL}/air_ticket_report/api/v1/ticket_sales_report/filter/`;
export const GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT_WITHOUT_PG = `${BASE_URL}/air_ticket_report/api/v1/ticket_sales_report_wp/filter/`;

export const PASSENGER_STATUS_STEP_DIAGRAM = `${BASE_URL}/passenger_status_overview/api/v1/passenger_status_overview/passenger_status_step_diagram/`;

//  payorder_clearing
export const CREATE_PAYORDER_CLEARING = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/create/`;

export const GET_PAYORDER_CLEARINGS = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/all/`;

export const GET_PAYORDER_CLEARINGS_WITHOUT_PAGINATION = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/without_pagination/all/`;

export const GET_PAYORDER_CLEARING_BY_ID = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/`;

export const UPDATE_PAYORDER_CLEARING = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/update/`;

export const DELETE_PAYORDER_CLEARING = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/delete/`;
export const DELETE_PAYORDER_CLEARING_MULTIPLE = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/delete/`;

export const SEARCH_PAYORDER_CLEARING = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/search/`;

export const PAYORDER_CLEARING_PREVIOUS_BALANCE = `${BASE_URL}/payorder_clearing/api/v1/previous_balance_check_account/`;

export const PAYORDER_TYPE_WITHOUT_PAGINATION = `${BASE_URL}/payorder_clearing/api/v1/payorder_clearing/get_distinct_types_of_payorder/`;

export const LEDGER_BANK_CASH = `${BASE_URL}/ledger_account/api/v1/ledger_account/cash_bank/`;

export const LEDGER_BANK = `${BASE_URL}/ledger_account/api/v1/ledger_account/bank/`;

// PAY_ORDER_FILTER_BY
export const PAYORDER_FILTER_BY = `${BASE_URL}/postdate_cheque/api/v1/postdate_cheque/filter/`;

export const PAYORDER_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_receipt_voucher_wp/`;

// tudo
// ticket
export const CREATE_TICKET_DETAIL = `${ADMIN_URL}/ticket_detail/api/v1/ticket_detail/create_from_client/`;

export const CREATE_TICKET = `${ADMIN_URL}/ticket/api/v1/ticket/create/`;

export const GET_TICKET_DETAILS = `${ADMIN_URL}/ticket_detail/api/v1/ticket_detail/all/`;

export const GET_TICKET_DETAILS_BY_ID = `${ADMIN_URL}/ticket_detail/api/v1/ticket_detail/get_all_by_ticket_id/`;

export const GET_TICKET_BY_ID = `${ADMIN_URL}/ticket/api/v1/ticket/`;

export const GET_TICKETS = `${ADMIN_URL}/ticket/api/v1/ticket/all/`;
export const GET_TICKETS_FOR_CLIENTS = `${ADMIN_URL}/ticket/api/v1/ticket_for_client/all/`;

export const DELETE_TICKET = `${ADMIN_URL}/ticket/api/v1/ticket/delete/`;

export const UPDATE_TICKET = `${ADMIN_URL}/ticket/api/v1/ticket/update/`;

export const GET_ACCOUNT_TICKETS = `${ADMIN_URL}/ticket/api/v1/ticket/ticket_of_account_department`;

export const GET_SALES_TICKETS = `${ADMIN_URL}/ticket/api/v1/ticket/ticket_of_sales_department`;

export const GET_SUPPORT_TICKETS = `${ADMIN_URL}/ticket/api/v1/ticket/ticket_of_support_department`;

// ticket_deperment
export const GET_TICKET_DEPARTMENT = `${ADMIN_URL}/ticket_department/api/v1/ticket_department/all/`;

// ticket_status
export const GET_TICKET_STATUS = `${ADMIN_URL}/ticket_status/api/v1/ticket_status/all`;

export const UPDATE_TICKET_STATUS = `${BASE_URL}/ticket_status/api/v1/ticket_status/update/`;

// ticket_priority
export const GET_TICKET_PRIORITY = `${ADMIN_URL}/ticket_priority/api/v1/ticket_priority/all/`;
//  Device
export const CREATE_SUPPORT_API_IP = `${BASE_URL}/device_ip/api/v1/device_ip/create/`;

export const GET_SUPPORT_API_IPS = `${BASE_URL}/device_ip/api/v1/device_ip/all/`;

export const GET_SUPPORT_API_IPS_WITHOUT_PAGINATION = `${BASE_URL}/device_ip/api/v1/device_ip/without_pagination/all/`;

export const GET_SUPPORT_API_IPID = `${BASE_URL}/device_ip/api/v1/device_ip/`;

export const UPDATE_SUPPORT_API_IP = `${BASE_URL}/device_ip/api/v1/device_ip/update/`;

export const DELETE_SUPPORT_API_IP = `${BASE_URL}/device_ip/api/v1/device_ip/delete/`;

export const SEARCH_SUPPORT_API_IP = `${BASE_URL}/device_ip/api/v1/device_ip/search/`;

//  Client
export const CREATE_CLIENT = `${BASE_URL}/client/api/v1/client/create/`;

export const CLIENT_COLUMN = `${BASE_URL}/table_column/api/v1/table_column/`;

export const GET_CLIENTS = `${BASE_URL}/client/api/v1/client/all/`;

export const GET_CLIENT_BY_ID = `${BASE_URL}/client/api/v1/client/`;

export const UPDATE_CLIENT = `${BASE_URL}/client/api/v1/client/update/`;

export const DELETE_CLIENT = `${BASE_URL}/client/api/v1/client/delete/`;

export const SEARCH_CLIENT = `${BASE_URL}/client/api/v1/client/search/`;
export const GET_CLIENTS_WITHOUT_PAGINATION = `${BASE_URL}/client/api/v1/client/without_pagination/all/`;

//  Column
export const CREATE_COLUMN = `${BASE_URL}/table_column/api/v1/table_column/create/`;

export const COLUMN_COLUMN = `${BASE_URL}/client_column_client_column/api/v1/client_column_client_column/`;

export const GET_COLUMNS = `${BASE_URL}/table_column/api/v1/table_column/all/`;

export const GET_COLUMN_BY_ID = `${BASE_URL}/table_column_settings/api/v1/table_column_settings/`;

export const UPDATE_COLUMN = `${BASE_URL}/table_column_settings/api/v1/table_column_settings/update/`;

export const DELETE_COLUMN = `${BASE_URL}/table_column/api/v1/table_column/delete/`;

export const SEARCH_COLUMN = `${BASE_URL}/table_column/api/v1/table_column/search/`;

// employee
export const CREATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/create/`;

export const GET_EMPLOYEES = `${BASE_URL}/employee/api/v1/employee/all/`;

export const GET_EMPLOYEE_BY_ID = `${BASE_URL}/employee/api/v1/employee/`;

export const UPDATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/update/`;

export const DELETE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/delete/`;

export const SEARCH_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/search/`;

export const CHECK_USERNAME_EMPLOYEE = `${BASE_URL}/user/api/v1/user/check_username/`;

export const CHECK_EMAIL_EMPLOYEE = `${BASE_URL}/user/api/v1/user/check_email/`;

//  PAYMENT_DETAIL
export const CREATE_PAYMENT_DETAIL = `${BASE_URL}/payment/api/v1/payment/create/`;

export const GET_PAYMENT_DETAILS = `${BASE_URL}/payment/api/v1/payment/all/`;

export const GET_PAYMENT_DETAILS_WITHOUT_PAGINATION = `${BASE_URL}/payment/api/v1/payment/without_pagination/all/`;

export const GET_PAYMENT_DETAIL_BY_ID = `${BASE_URL}/payment/api/v1/payment/`;

export const UPDATE_PAYMENT_DETAIL = `${BASE_URL}/payment/api/v1/payment/update/`;

export const DELETE_PAYMENT_DETAIL = `${BASE_URL}/payment/api/v1/payment/delete/`;

export const SEARCH_PAYMENT_DETAIL = `${BASE_URL}/payment/api/v1/payment/search/`;
//  LOAN
export const CREATE_LOAN = `${BASE_URL}/loan/api/v1/loan/create/`;

export const CHECK_LOAN_ELIGBLITY = `${BASE_URL}/loan/api/v1/loan/check_availability/`;

export const GET_LOANS = `${BASE_URL}/loan/api/v1/loan/all/`;

export const GET_LOANS_WITHOUT_PAGINATION = `${BASE_URL}/loan/api/v1/loan/without_pagination/all/`;

export const GET_LOAN_BY_ID = `${BASE_URL}/loan/api/v1/loan/`;

export const UPDATE_LOAN = `${BASE_URL}/loan/api/v1/loan/update/`;

export const DELETE_LOAN = `${BASE_URL}/loan/api/v1/loan/delete/`;

export const SEARCH_LOAN = `${BASE_URL}/loan/api/v1/loan/search/`;

//  PACKAGE_TYPE
export const CREATE_PACKAGE_TYPE = `${BASE_URL}/package_type/api/v1/package_type/create/`;

export const GET_PACKAGE_TYPES = `${BASE_URL}/package_type/api/v1/package_type/all/`;

export const GET_PACKAGE_TYPES_WITHOUT_PAGINATION = `${BASE_URL}/package_type/api/v1/package_type/without_pagination/all/`;

export const GET_PACKAGE_TYPE_BY_ID = `${BASE_URL}/package_type/api/v1/package_type/`;

export const UPDATE_PACKAGE_TYPE = `${BASE_URL}/package_type/api/v1/package_type/update/`;

export const DELETE_PACKAGE_TYPE = `${BASE_URL}/package_type/api/v1/package_type/delete/`;

export const SEARCH_PACKAGE_TYPE = `${BASE_URL}/package_type/api/v1/package_type/search/`;

//  FEATURE_DETAIL
export const CREATE_FEATURE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/create/`;

export const GET_FEATURE_DETAILS = `${BASE_URL}/feature_details/api/v1/feature_details/all/`;

export const GET_FEATURE_DETAILS_WITHOUT_PAGINATION = `${BASE_URL}/feature_details/api/v1/feature_details/without_pagination/all/`;

export const GET_FEATURE_DETAIL_BY_ID = `${BASE_URL}/feature_details/api/v1/feature_details/`;

export const UPDATE_FEATURE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/update/`;

export const DELETE_FEATURE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/delete/`;

export const SEARCH_FEATURE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/search/`;

//  feature_details
export const CREATE_PACKAGE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/create/`;

export const PACKAGE_DETAIL_PACKAGE_DETAIL = `${BASE_URL}/client_column_client_column/api/v1/client_column_client_column/`;

export const GET_PACKAGE_DETAILS = `${BASE_URL}/feature_details/api/v1/feature_details/all/`;

export const GET_PACKAGE_DETAIL_BY_ID = `${BASE_URL}/package_type/api/v1/feature_customization/`;

export const UPDATE_PACKAGE_DETAIL = `${BASE_URL}/package_type/api/v1/feature_customization/update/`;

export const DELETE_PACKAGE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/delete/`;

export const SEARCH_PACKAGE_DETAIL = `${BASE_URL}/feature_details/api/v1/feature_details/search/`;

// sslcommerz
export const CREATE_SSL_COMMERZ = `${BASE_URL}/sslcommerz_admin/api/v1/ssl_commerz_admin/create/`;
export const PAYMENT_SUCCESS = `${BASE_URL}/sslcommerz_admin/api/v1/ssl_commerz_admin/success/`;

//  Client Type
export const CREATE_CLIENT_TYPE = `${BASE_URL}/client_type/api/v1/client_type/create/`;

export const GET_CLIENT_TYPES = `${BASE_URL}/client_type/api/v1/client_type/all/`;

export const GET_CLIENT_TYPES_WITHOUT_PAGINATION = `${BASE_URL}/client_type/api/v1/client_type/without_pagination/all/`;

export const GET_CLIENT_TYPE_BY_ID = `${BASE_URL}/client_type/api/v1/client_type/`;

export const UPDATE_CLIENT_TYPE = `${BASE_URL}/client_type/api/v1/client_type/update/`;

export const DELETE_CLIENT_TYPE = `${BASE_URL}/client_type/api/v1/client_type/delete/`;

export const SEARCH_CLIENT_TYPE = `${BASE_URL}/client_type/api/v1/client_type/search/`;

//  Report Column
export const CREATE_REPORT_COLUMN = `${BASE_URL}/table_column_settings_for_report/api/v1/table_column_settings_for_report/create/`;

export const REPORT_COLUMN_REPORT_COLUMN = `${BASE_URL}/client_column_client_column/api/v1/client_column_client_column/`;

export const GET_REPORT_COLUMNS = `${BASE_URL}/table_column_settings_for_report/api/v1/table_column_settings_for_report/all/`;

export const GET_REPORT_COLUMN_BY_ID = `${BASE_URL}/table_column_settings_for_report/api/v1/table_column_settings_for_report/`;

export const UPDATE_REPORT_COLUMN = `${BASE_URL}/table_column_settings_for_report/api/v1/table_column_settings_for_report/update/`;

export const DELETE_REPORT_COLUMN = `${BASE_URL}/table_column_settings_for_report/api/v1/table_column_settings_for_report/delete/`;

export const SEARCH_REPORT_COLUMN = `${BASE_URL}/table_column_settings_for_report/api/v1/table_column_settings_for_report/search/`;

//  Unit
export const CREATE_UNIT = `${BASE_URL}/unit/api/v1/unit/create/`;

export const GET_UNITS = `${BASE_URL}/unit/api/v1/unit/all/`;

export const GET_UNITS_WITHOUT_PAGINATION = `${BASE_URL}/unit/api/v1/unit_wp/all/`;

export const GET_UNIT_BY_ID = `${BASE_URL}/unit/api/v1/unit/`;

export const UPDATE_UNIT = `${BASE_URL}/unit/api/v1/unit/update/`;

export const DELETE_UNIT = `${BASE_URL}/unit/api/v1/unit/delete/`;

export const DELETE_UNIT_MULTIPLE = `${BASE_URL}/unit/api/v1/unit/delete/`;

export const SEARCH_UNIT = `${BASE_URL}/unit/api/v1/unit/search/`;

//  Compute
export const CREATE_COMPUTE = `${BASE_URL}/compute/api/v1/compute/create/`;

export const GET_COMPUTES = `${BASE_URL}/compute/api/v1/compute/all/`;

export const GET_COMPUTES_WITHOUT_PAGINATION = `${BASE_URL}/compute/api/v1/compute_wp/all/`;

export const GET_COMPUTE_BY_ID = `${BASE_URL}/compute/api/v1/compute/`;

export const UPDATE_COMPUTE = `${BASE_URL}/compute/api/v1/compute/update/`;

export const DELETE_COMPUTE = `${BASE_URL}/compute/api/v1/compute/delete/`;

export const DELETE_COMPUTE_MULTIPLE = `${BASE_URL}/compute/api/v1/compute/delete/`;

export const SEARCH_COMPUTE = `${BASE_URL}/compute/api/v1/compute/search/`;
