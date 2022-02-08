//http://api.cashconnectbd.com
//http://192.168.0.8:8002

//base url
export const BASE_URL = 'http://192.168.0.8:8002';

//login
export const LOGIN_URL = `${BASE_URL}/user/api/v1/user/login/`;

//user
export const USER_BY_ID = `${BASE_URL}/user/api/v1/user/`;

export const RESET_PASSWORD = `${BASE_URL}/auth/user/reset_password/`;

export const CONFIRM_RESET_PASSWORD = `${BASE_URL}/auth/user/reset_password_confirm/`;

// user
export const ALL_USERS = `${BASE_URL}/user/api/v1/user/all/`;

export const GET_USERS_WITHOUT_PAGINATION = `${BASE_URL}/user/api/v1/user/without_pagination/all/`;

export const SEARCH_USER = `${BASE_URL}/user/api/v1/user/search/`;

export const CHECK_EMAIL = `${BASE_URL}/user/api/v1/user/check_email_when_create/`;

export const CHECK_PRIMARY_PHONE = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_create/`;

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

//group
export const GROUPS_WITHOUT_PAGINATION = `${BASE_URL}/group/api/v1/group/without_pagination/all/`;

//primary group
export const PRIMARY_GROUPS_WITHOUT_PAGINATION = `${BASE_URL}/primary_group/api/v1/primary_group/all/`;

//designation
export const DESIGNATIONS_WITHOUT_PAGINATION = `${BASE_URL}/designation/api/v1/designation/without_pagination/all/`;

//visa egent
export const AGENTS_WITHOUT_PAGINATION = `${BASE_URL}/agent/api/v1/agent/without_pagination/all/`;

//visa entry
export const VISAENTRYS_WITHOUT_PAGINATION = `${BASE_URL}/visa_entry/api/v1/visa_entry/without_pagination/all/`;

//profession
export const PROFESSIONS_WITHOUT_PAGINATION = `${BASE_URL}/profession/api/v1/profession/all/`;

export const BRANCH_BY_USER_ID = `${BASE_URL}/branch/api/v1/branch/get_a_branch_by_user_id/`;

//demand
export const DEMANDS_WITHOUT_PAGINATION = `${BASE_URL}/demand/api/v1/demand/all/`;

export const PASSENGERTYPES_WITHOUT_PAGINATION = `${BASE_URL}/passenger_type/api/v1/passenger_type/all/`;

export const CURRENTSTATUSS_WITHOUT_PAGINATION = `${BASE_URL}/current_status/api/v1/current_status/all/`;

export const AGENCIES_WITHOUT_PAGINATION = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/all/`;

export const MEDICALCENTERS_WITHOUT_PAGINATION = `${BASE_URL}/medical_center/api/v1/medical_center/all/`;

export const PASSENGERS_WITHOUT_PAGINATION = `${BASE_URL}/passenger/api/v1/passenger/all/`;

//  employee
export const CREATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/create/`;

export const GET_EMPLOYEES = `${BASE_URL}/employee/api/v1/employee/all/`;

export const GET_EMPLOYEE_BY_ID = `${BASE_URL}/employee/api/v1/employee/`;

export const UPDATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/update/`;

export const DELETE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/delete/`;

export const SEARCH_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/search/`;

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

export const GET_DEPARTMENTID = `${BASE_URL}/department/api/v1/department/`;

export const UPDATE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/update/`;

export const DELETE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/delete/`;

export const SEARCH_DEPARTMENT = `${BASE_URL}/department/api/v1/department/search/`;

//  permission
export const CREATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/create/`;

export const GET_PERMISSIONS = `${BASE_URL}/permission/api/v1/permission/all/`;

export const GET_PERMISSIONS_WITHOUT_PAGINATION = `${BASE_URL}/permission/api/v1/permission/without_pagination/all/`;

export const GET_PERMISSIONID = `${BASE_URL}/permission/api/v1/permission/`;

export const UPDATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/update/`;

export const DELETE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/delete/`;

export const SEARCH_PERMISSION = `${BASE_URL}/permission/api/v1/permission/search/`;

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

export const GET_QUALIFICATIONID = `${BASE_URL}/qualification/api/v1/qualification/`;

export const UPDATE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/update/`;

export const DELETE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/delete/`;

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

export const UPDATE_CITY = `${BASE_URL}/city/api/v1/city/update/`;

export const DELETE_CITY = `${BASE_URL}/city/api/v1/city/delete/`;

export const SEARCH_CITY = `${BASE_URL}/city/api/v1/city/search/`;

//  thana
export const CREATE_THANA = `${BASE_URL}/thana/api/v1/thana/create/`;

export const GET_THANAS = `${BASE_URL}/thana/api/v1/thana/all/`;

export const GET_THANAS_WITHOUT_PAGINATION = `${BASE_URL}/thana/api/v1/thana/without_pagination/all/`;

export const GET_THANAID = `${BASE_URL}/thana/api/v1/thana/`;

export const UPDATE_THANA = `${BASE_URL}/thana/api/v1/thana/update/`;

export const DELETE_THANA = `${BASE_URL}/thana/api/v1/thana/delete/`;

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

//paymentVoucher
export const CREATE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/create/`;

export const GET_PAYMENTVOUCHERS = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/all`;

export const GET_PAYMENTVOUCHER_BY_ID = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/`;

export const UPDATE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/update/`;

export const DELETE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/delete/`;

export const DELETE_PAYMENTVOUCHER_MULTIPLE = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/delete_multiple/`;

export const SEARCH_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/search/`;

export const GET_PAYMENT_VOUCHER_BY_INVOICE_NO = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/payment_voucher_by_invoice_no/`;

//receiptVoucher
export const CREATE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/create/`;

export const GET_RECEIPTVOUCHERS = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/all`;

export const GET_RECEIPTVOUCHER_BY_ID = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/`;

export const UPDATE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/update/`;

export const DELETE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/delete/`;

export const DELETE_RECEIPTVOUCHER_MULTIPLE = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/delete_multiple/`;

export const SEARCH_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/search/`;

export const GET_RECEIPT_VOUCHER_BY_INVOICE_NO = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

//sales
export const CREATE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/create/`;

export const GET_RECEIVABLEBILLS = `${BASE_URL}/sales/api/v1/sales/all`;

export const GET_RECEIVABLEBILL_BY_ID = `${BASE_URL}/sales/api/v1/sales/`;

export const UPDATE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/update/`;

export const DELETE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/delete/`;

export const DELETE_RECEIVABLEBILL_MULTIPLE = `${BASE_URL}/sales/api/v1/sales/delete_multiple/`;

export const SEARCH_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/search/`;

export const GET_RECEIVABLEBILL_BY_INVOICE_NO = `${BASE_URL}/sales/api/v1/sales/receipt_voucher_by_invoice_no/`;

//purchases
export const CREATE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/create/`;

export const GET_PAYABLEBILLS = `${BASE_URL}/purchase/api/v1/purchase/all`;

export const GET_PAYABLEBILL_BY_ID = `${BASE_URL}/purchase/api/v1/purchase/`;

export const UPDATE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/update/`;

export const DELETE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/delete/`;

export const DELETE_PAYABLEBILL_MULTIPLE = `${BASE_URL}/purchase/api/v1/purchase/delete_multiple/`;

export const SEARCH_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/search/`;

export const GET_PAYABLEBILL_BY_INVOICE_NO = `${BASE_URL}/purchase/api/v1/purchase/purchase_by_invoice_no/`;

//contras
export const CREATE_CONTRA = `${BASE_URL}/contra/api/v1/contra/create/`;

export const GET_CONTRAS = `${BASE_URL}/contra/api/v1/contra/all`;

export const GET_CONTRA_BY_ID = `${BASE_URL}/contra/api/v1/contra/`;

export const UPDATE_CONTRA = `${BASE_URL}/contra/api/v1/contra/update/`;

export const DELETE_CONTRA = `${BASE_URL}/contra/api/v1/contra/delete/`;

export const DELETE_CONTRA_MULTIPLE = `${BASE_URL}/contra/api/v1/contra/delete_multiple/`;

export const SEARCH_CONTRA = `${BASE_URL}/contra/api/v1/contra/search/`;

export const GET_CONTRA_BY_INVOICE_NO = `${BASE_URL}/contra/api/v1/contra/contra_by_invoice_no/`;

//journals
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

export const GET_SITESETTINGS = `${BASE_URL}/general_setting/api/v1/general_setting/all/`;

export const UPDATE_SITESETTING = `${BASE_URL} /general_setting/api/v1/general_setting/update/`;

export const DELETE_SITESETTING = `${BASE_URL} /general_setting/api/v1/general_setting/delete/`;

// slidersettings
export const CREATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/create/`;

export const GET_SLIDERSETTINGID = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/`;

export const GET_SLIDERSETTINGS = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/all/`;

export const UPDATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/update/`;

export const DELETE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/delete/`;

// branch
export const CREATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/create/`;

export const GET_BRANCHID = `${BASE_URL}/branch/api/v1/branch/`;

export const GET_BRANCHS = `${BASE_URL}/branch/api/v1/branch/all/`;

export const GET_BRANCH_WITHOUT_PAGINATION = `${BASE_URL}/branch/api/v1/branch/without_pagination/all/`;

export const UPDATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/update/`;

export const DELETE_BRANCH = `${BASE_URL}/branch/api/v1/branch/delete/`;

export const SEARCH_BRANCH = `${BASE_URL}/branch/api/v1/branch/search/`;

// customer types
export const CREATE_CUSTOMERTYPE = `${BASE_URL}/customer_type/api/v1/customer_type/create/`;

export const GET_CUSTOMERTYPEID = `${BASE_URL}/customer_type/api/v1/customer_type/`;

export const GET_CUSTOMERTYPES = `${BASE_URL}/customer_type/api/v1/customer_type/all/`;

export const UPDATE_CUSTOMERTYPE = `${BASE_URL}/customer_type/api/v1/customer_type/update/`;

export const DELETE_CUSTOMERTYPE = `${BASE_URL}/customer_type/api/v1/customer_type/delete/`;

//menu item
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

//role menu
export const CREATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/create/`;

export const GET_ROLEMENUS = `${BASE_URL}/role_menu/api/v1/role_menu/all`;

export const GET_ROLEMENU_BY_ID = `${BASE_URL}/role_menu/api/v1/role_menu/`;

export const UPDATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/update/`;

export const DELETE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/delete/`;

// export const SEARCH_ROLEMENU = `${BASE_URL}/rolemenu/api/v1/rolemenu/search/`;

//passenger type
export const CREATE_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/create/`;

export const GET_PASSENGERTYPES = `${BASE_URL}/passenger_type/api/v1/passenger_type/all`;

export const GET_PASSENGERTYPE_BY_ID = `${BASE_URL}/passenger_type/api/v1/passenger_type/`;

export const UPDATE_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/update/`;

export const DELETE_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/delete/`;

export const SEARCH_PASSENGERTYPE = `${BASE_URL}/passenger_type/api/v1/passenger_type/search/`;

//current status
export const CREATE_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/create/`;

export const GET_CURRENTSTATUSS = `${BASE_URL}/current_status/api/v1/current_status/all`;

export const GET_CURRENTSTATUS_BY_ID = `${BASE_URL}/current_status/api/v1/current_status/`;

export const UPDATE_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/update/`;

export const DELETE_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/delete/`;

export const SEARCH_CURRENTSTATUS = `${BASE_URL}/current_status/api/v1/current_status/search/`;

//profession
export const CREATE_PROFESSION = `${BASE_URL}/profession/api/v1/profession/create/`;

export const GET_PROFESSIONS = `${BASE_URL}/profession/api/v1/profession/all`;

export const GET_PROFESSION_BY_ID = `${BASE_URL}/profession/api/v1/profession/`;

export const UPDATE_PROFESSION = `${BASE_URL}/profession/api/v1/profession/update/`;

export const DELETE_PROFESSION = `${BASE_URL}/profession/api/v1/profession/delete/`;

export const SEARCH_PROFESSION = `${BASE_URL}/profession/api/v1/profession/search/`;

//agent
export const CREATE_AGENT = `${BASE_URL}/agent/api/v1/agent/create/`;

export const GET_AGENTS = `${BASE_URL}/agent/api/v1/agent/all`;

export const GET_AGENT_BY_ID = `${BASE_URL}/agent/api/v1/agent/`;

export const UPDATE_AGENT = `${BASE_URL}/agent/api/v1/agent/update/`;

export const DELETE_AGENT = `${BASE_URL}/agent/api/v1/agent/delete/`;

export const SEARCH_AGENT = `${BASE_URL}/agent/api/v1/agent/search/`;

export const AGENT_FILTER_BY = `${BASE_URL}/report/api/v1/agent_report/filter/`;

export const AGENT_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/agent_report/without_pagination/filter/`;

//demand
export const CREATE_DEMAND = `${BASE_URL}/demand/api/v1/demand/create/`;

export const GET_DEMANDS = `${BASE_URL}/demand/api/v1/demand/all`;

export const GET_DEMAND_BY_ID = `${BASE_URL}/demand/api/v1/demand/`;

export const UPDATE_DEMAND = `${BASE_URL}/demand/api/v1/demand/update/`;

export const DELETE_DEMAND = `${BASE_URL}/demand/api/v1/demand/delete/`;

export const SEARCH_DEMAND = `${BASE_URL}/demand/api/v1/demand/search/`;

//recruitingAgency
export const CREATE_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/create/`;

export const GET_RECRUITINGAGENCYS = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/all`;

export const GET_RECRUITINGAGENCY_BY_ID = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/`;

export const UPDATE_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/update/`;

export const DELETE_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/delete/`;

export const SEARCH_RECRUITINGAGENCY = `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/search/`;

//visa_entry
export const CREATE_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/create/`;

export const GET_VISAENTRYS = `${BASE_URL}/visa_entry/api/v1/visa_entry/all`;

export const GET_VISAENTRY_BY_ID = `${BASE_URL}/visa_entry/api/v1/visa_entry/`;

export const UPDATE_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/update/`;

export const DELETE_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/delete/`;

export const DELETE_VISAENTRY_MULTIPLE = `${BASE_URL}/visa_entry/api/v1/visa_entry/delete_multiple/`;

export const SEARCH_VISAENTRY = `${BASE_URL}/visa_entry/api/v1/visa_entry/search/`;

export const VISAENTRY_BY_PASSENGER_ID = `${BASE_URL}/visa_entry/api/v1/visa_entry/get_a_visa_entry_by_pasenger_id/`;

//passenger
export const CREATE_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/create/`;

// export const GET_PASSENGERS = `${BASE_URL}/passenger/api/v1/passenger/all/`;

export const GET_PASSENGERS_BY_TYPE = `${BASE_URL}/passenger/api/v1/passenger/get_all_passenger_by_passenger_type_name/`;

export const GET_PASSENGER_BY_ID = `${BASE_URL}/passenger/api/v1/passenger/`;

export const UPDATE_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/update/`;

export const DELETE_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/delete/`;

// export const DELETE_PASSENGER_MULTIPLE = `${BASE_URL}/passenger/api/v1/passenger/delete_multiple/`;

export const SEARCH_PASSENGER = `${BASE_URL}/passenger/api/v1/passenger/search/`;

export const CHECK_PASSPORT_NO_WHEN_CREATE = `${BASE_URL}/passenger/api/v1/passenger/check_passport_no_when_create/`;

export const CHECK_PASSPORT_NO_WHEN_UPDATE = `${BASE_URL}/passenger/api/v1/passenger/check_passport_no_when_update/`;

export const SEARCH_PASSENGER_BY = `${BASE_URL}/passenger/api/v1/passenger/search_by_passenger_id_office_serial_passport_no_contact_no/`;

export const PASSENGER_FILTER_BY = `${BASE_URL}/report/api/v1/passenger_report/filter/`;

export const PASSENGER_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/passenger_report/without_pagination/filter/`;

export const PASSENGER_SUMMARY_FILTER_BY = `${BASE_URL}/report/api/v1/de_ag_ve_pa_me_mo_ow_mo_em_tr_mp_fl_report/filter/`;

export const PASSENGER_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/de_ag_ve_pa_me_mo_ow_mo_em_tr_mp_fl_report/filter/`;

//medical
export const CREATE_MEDICAL = `${BASE_URL}/medical/api/v1/medical/create/`;

export const UPDATE_MEDICAL = `${BASE_URL}/medical/api/v1/medical/update/`;

export const DELETE_MEDICAL = `${BASE_URL}/medical/api/v1/medical/delete/`;

export const MEDICAL_BY_PASSENGER_ID = `${BASE_URL}/medical/api/v1/medical/get_by_passenger_id/`;

export const MEDICAL_FILTER_BY = `${BASE_URL}/report/api/v1/medical_report/filter/`;

export const MEDICAL_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/medical_report/without_pagination/filter/`;

//medicalCenter
export const CREATE_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/create/`;

export const GET_MEDICALCENTERS = `${BASE_URL}/medical_center/api/v1/medical_center/all`;

export const GET_MEDICALCENTER_BY_ID = `${BASE_URL}/medical_center/api/v1/medical_center/`;

export const UPDATE_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/update/`;

export const DELETE_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/delete/`;

export const DELETE_MEDICALCENTER_MULTIPLE = `${BASE_URL}​/medical_center/api/v1/medical_center/delete_multiple/`;

export const SEARCH_MEDICALCENTER = `${BASE_URL}/medical_center/api/v1/medical_center/search/`;

export const MEDICALCENTER_WHEN_UPDATE = `${BASE_URL}/medical_center/api/v1/medical_center/check_when_update/`;

//embassy
export const CREATE_EMBASSY = `${BASE_URL}/embassy/api/v1/embassy/create/`;

export const UPDATE_EMBASSY = `${BASE_URL}/embassy/api/v1/embassy/update/`;

export const DELETE_EMBASSY = `${BASE_URL}/embassy/api/v1/embassy/delete/`;

export const EMBASSY_BY_PASSENGER_ID = `${BASE_URL}/embassy/api/v1/embassy/check_visa_entry_medical_mofa_and_get_embassy_by_passenger_id/`;

export const EMBASSY_FILTER_BY = `${BASE_URL}/report/api/v1/embassy_report/filter/`;

export const EMBASSY_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/embassy_report/without_pagination/filter/`;

//mofa
export const CREATE_MOFA = `${BASE_URL}/mofa/api/v1/mofa/create/`;

export const UPDATE_MOFA = `${BASE_URL}/mofa/api/v1/mofa/update/`;

export const DELETE_MOFA = `${BASE_URL}/mofa/api/v1/mofa/delete/`;

export const MOFA_BY_PASSENGER_ID = `${BASE_URL}/mofa/api/v1/mofa/get_by_passenger_id/`;

export const MOFA_FILTER_BY = `${BASE_URL}/report/api/v1/mofa_report/filter/`;

export const MOFA_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/mofa_report/without_pagination/filter/`;

//female_cv
export const CREATE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/create/`;

export const UPDATE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/update/`;

export const DELETE_FEMALECV = `${BASE_URL}/female_cv/api/v1/female_cv/delete/`;

export const FEMALECV_BY_PASSENGER_ID = `${BASE_URL}/female_cv/api/v1/female_cv/get_by_passenger_id/`;

//flight
export const CREATE_FLIGHT = `${BASE_URL}/flight/api/v1/flight/create/`;

export const UPDATE_FLIGHT = `${BASE_URL}/flight/api/v1/flight/update/`;

export const DELETE_FLIGHT = `${BASE_URL}/flight/api/v1/flight/delete/`;

export const FLIGHT_BY_PASSENGER_ID = `${BASE_URL}/flight/api/v1/flight/get_by_passenger_id/`;

export const FLIGHT_FILTER_BY = `${BASE_URL}/report/api/v1/flight_report/filter/`;

export const FLIGHT_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/flight_report/without_pagination/filter/`;

//male_cv
export const CREATE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/create/`;

export const UPDATE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/update/`;

export const DELETE_MALECV = `${BASE_URL}/male_cv/api/v1/male_cv/delete/`;

export const MALECV_BY_PASSENGER_ID = `${BASE_URL}/male_cv/api/v1/male_cv/get_by_passenger_id/`;

//man_power_list
export const CREATE_MANPOWERLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/create/`;

export const UPDATE_MANPOWERLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/update/`;

export const DELETE_MANPOWERLIST = `${BASE_URL}/man_power_list/api/v1/man_power_list/delete/`;

export const MANPOWERLIST_BY_PASSENGER_ID = `${BASE_URL}/man_power_list/api/v1/man_power_list/get_by_passenger_id/`;

//musaned_okala
export const CREATE_MUSANEDOKALA = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/create/`;

export const UPDATE_MUSANEDOKALA = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/update/`;

export const DELETE_MUSANEDOKALA = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/delete/`;

export const MUSANEDOKALA_BY_PASSENGER_ID = `${BASE_URL}/musaned_okala/api/v1/musaned_okala/get_by_passenger_id/`;

//office_work
export const CREATE_OFFICEWORK = `${BASE_URL}/office_work/api/v1/office_work/create/`;

export const UPDATE_OFFICEWORK = `${BASE_URL}/office_work/api/v1/office_work/update/`;

export const DELETE_OFFICEWORK = `${BASE_URL}/office_work/api/v1/office_work/delete/`;

export const OFFICEWORK_BY_PASSENGER_ID = `${BASE_URL}/office_work/api/v1/office_work/get_by_passenger_id/`;

//training
export const CREATE_TRAINING = `${BASE_URL}/training/api/v1/training/create/`;

export const UPDATE_TRAINING = `${BASE_URL}/training/api/v1/training/update/`;

export const DELETE_TRAINING = `${BASE_URL}/training/api/v1/training/delete/`;

export const TRAINING_BY_PASSENGER_ID = `${BASE_URL}/training/api/v1/training/get_by_passenger_id/`;

export const TRAINING_FILTER_BY = `${BASE_URL}/report/api/v1/training_report/filter/`;

export const TRAINING_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/training_report/without_pagination/filter/`;

//visa_cancel_list
export const CREATE_VISACANCELLIST = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/create/`;

export const UPDATE_VISACANCELLIST = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/update/`;

export const DELETE_VISACANCELLIST = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/delete/`;

export const VISACANCELLIST_BY_PASSENGER_ID = `${BASE_URL}/visa_cancel_list/api/v1/visa_cancel_list/get_by_passenger_id/`;

//visa_reissue_list
export const CREATE_VISAREISSUELIST = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/create/`;

export const UPDATE_VISAREISSUELIST = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/update/`;

export const DELETE_VISAREISSUELIST = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/delete/`;

export const VISAREISSUELIST_BY_PASSENGER_ID = `${BASE_URL}/visa_reissue_list/api/v1/visa_reissue_list/get_by_passenger_id/`;

//visa_submission_list
export const CREATE_VISASUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/create/`;

export const UPDATE_VISASUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/update/`;

export const DELETE_VISASUBMISSIONLIST = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/delete/`;

export const VISASUBMISSIONLIST_BY_PASSENGER_ID = `${BASE_URL}/visa_submission_list/api/v1/visa_submission_list/get_by_passenger_id/`;

//man_power
export const CREATE_MANPOWER = `${BASE_URL}/man_power/api/v1/man_power/create/`;

export const UPDATE_MANPOWER = `${BASE_URL}/man_power/api/v1/man_power/update/`;

export const DELETE_MANPOWER = `${BASE_URL}/man_power/api/v1/man_power/delete/`;

export const MANPOWER_BY_PASSENGER_ID = `${BASE_URL}/man_power/api/v1/man_power/check_embassy_by_passenger_id/`;

export const MANPOWER_FILTER_BY = `${BASE_URL}/report/api/v1/man_power_report/filter/`;

export const MANPOWER_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/man_power_report/without_pagination/filter/`;

//calling_emb_attestation
export const CREATE_CALLINGEMBATTESTATION = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/create/`;

export const UPDATE_CALLINGEMBATTESTATION = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/update/`;

export const DELETE_CALLINGEMBATTESTATION = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/delete/`;

export const CALLINGEMBATTESTATION_BY_PASSENGER_ID = `${BASE_URL}/calling_emb_attestation/api/v1/calling_emb_attestation/get_a_calling_emb_attestation_by_passenger_id/`;

//ledger
export const CREATE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/create/`;

export const GET_LEDGERS = `${BASE_URL}/ledger_account/api/v1/ledger_account/all`;

export const GET_LEDGER_BY_ID = `${BASE_URL}/ledger_account/api/v1/ledger_account/`;

export const UPDATE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/update/`;

export const DELETE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/delete/`;

export const DELETE_LEDGER_MULTIPLE = `${BASE_URL}/ledger_account/api/v1/ledger_account/delete_multiple/`;

export const SEARCH_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/search/`;

export const LEDGERS_WITHOUT_PAGINATION = `${BASE_URL}/ledger_account/api/v1/ledger_account/all`;

//subLedger
export const CREATE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/create/`;

export const GET_SUBLEDGERS = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/all`;

export const GET_SUBLEDGER_BY_ID = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/`;

export const UPDATE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/update/`;

export const DELETE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/delete/`;

export const DELETE_SUBLEDGER_MULTIPLE = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/delete_multiple/`;

export const SEARCH_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/search/`;

export const SUBLEDGERS_WITHOUT_PAGINATION = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/all`;

//group
export const CREATE_GROUP = `${BASE_URL}/group/api/v1/group/create/`;

export const GET_GROUPS = `${BASE_URL}/group/api/v1/group/all`;

export const GET_GROUP_BY_ID = `${BASE_URL}/group/api/v1/group/`;

export const UPDATE_GROUP = `${BASE_URL}/group/api/v1/group/update/`;

export const DELETE_GROUP = `${BASE_URL}/group/api/v1/group/delete/`;

export const DELETE_GROUP_MULTIPLE = `${BASE_URL}/group/api/v1/group/delete_multiple/`;

export const SEARCH_GROUP = `${BASE_URL}/group/api/v1/group/search/`;
