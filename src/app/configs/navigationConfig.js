import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */

const navigationConfig = [
	{
		id: 'dashboards',
		title: 'Dashboards',
		translate: 'Dashboards',
		display_order: 1,
		type: 'collapse',
		icon: 'people',
		url: '',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'Dashboards',
				display_order: 1,

				type: 'item',
				icon: 'dashboard',

				url: '/apps/dashboards/project'
			},
			{
				id: 'ticket_dashboards',
				title: 'Ticket Dashboards',
				translate: 'Ticket Dashboards',
				display_order: 2,
				type: 'item',
				icon: 'dashboard',

				url: '/apps/dashboards/ticket'
			},
			{
				id: 'malaysia_dashboards',
				title: 'Malaysia Dashboards',
				translate: 'Malaysia Dashboards',
				display_order: 3,
				type: 'item',
				icon: 'dashboard',

				url: '/apps/dashboards/malaysia'
			},
			{
				id: 'saudi_dashboards',
				title: 'Saudi Arabic Dashboards',
				translate: 'Saudi Arabic Dashboards',
				display_order: 3,
				type: 'item',
				icon: 'dashboard',

				url: '/apps/dashboards/saudi'
			}
		]
	},

	{
		id: 'employee_management',
		title: 'Employee',
		translate: 'Employee Management',
		display_order: 2,
		type: 'collapse',
		icon: 'people',
		url: '',
		children: [
			{
				id: 'department',
				title: 'Department',
				translate: 'Department',
				display_order: 1,
				type: 'item',
				url: '/apps/department/departments',
				exact: true
			},
			{
				id: 'designation',
				title: 'Designation',
				translate: 'Designation',
				display_order: 2,
				type: 'item',
				url: '/apps/designation/designations',
				exact: true
			},
			{
				id: 'employee',
				title: 'Employee',
				translate: 'Employee',
				display_order: 3,
				type: 'item',
				url: '/apps/employee/employees',
				exact: true
			},
			{
				id: 'qualification',
				title: 'Qualification',
				translate: 'Qualification',
				display_order: 4,
				type: 'item',
				url: '/apps/qualification/qualifications',
				exact: true
			}
		]
	},
	{
		id: 'agent',
		title: 'Agent',
		translate: 'Agent',
		display_order: 3,
		type: 'collapse',
		icon: 'people',
		url: '',
		exact: true,
		children: [
			{
				id: 'agent_list',
				title: 'Agent List',
				translate: 'Agent List',
				display_order: 1,
				type: 'item',
				url: '/apps/agent/agents',
				exact: true
			},
			{
				id: 'agent_report',
				title: 'Agent Report',
				translate: 'Agent Report',
				display_order: 2,
				type: 'item',
				url: '/apps/agents/report',
				exact: true
			}
		]
	},
	{
		id: 'visa_entry',
		title: 'Visa Entry',
		translate: 'Visa Entry',
		display_order: 4,
		type: 'collapse',
		icon: 'description',
		url: '',
		children: [
			{
				id: 'demand',
				title: 'Demand',
				translate: 'Demand',
				display_order: 1,
				type: 'item',
				url: '/apps/demand/demands',
				exact: true
			},
			{
				id: 'visa_entry',
				title: 'Visa Enty',
				translate: 'Visa Enty',
				display_order: 2,
				type: 'item',
				url: '/apps/visaEntry/visaEntrys',
				exact: true
			},
			{
				id: 'calling_entry',
				title: 'Calling Enty',
				translate: 'Calling Enty',
				display_order: 3,
				type: 'item',
				url: '/apps/callingEntry/callingEntrys',
				exact: true
			},
			{
				id: 'e_visa_entry',
				title: 'E-Visa Enty',
				translate: 'E-Visa Enty',
				display_order: 4,
				type: 'item',
				url: '/apps/eVisaEntry/eVisaEntrys',
				exact: true
			},
			{
				id: 'calling_assign',
				title: 'Calling Assign',
				translate: 'Calling Assign',
				display_order: 5,
				type: 'item',
				url: '/apps/callingAssign/callingAssigns/new',
				exact: true
			},
			{
				id: 'demand_assign',
				title: 'Demand Assign',
				translate: 'Demand Assign',
				display_order: 6,
				type: 'item',
				url: '/apps/demandAssign/demandAssigns/new',
				exact: true
			}
		]
	},

	{
		id: 'passenger',
		title: 'Passenger',
		translate: 'Passenger',
		display_order: 5,
		type: 'collapse',
		icon: 'people',
		url: '',
		exact: true,
		children: [
			{
				id: 'recruiting',
				title: 'Recruiting',
				translate: 'Recruiting',
				display_order: 1,
				type: 'item',
				url: '/apps/passenger/passengers/recruiting',
				exact: true
			},
			{
				id: 'processing',
				title: 'Processing',
				translate: 'Processing',
				display_order: 2,
				type: 'item',
				url: '/apps/passenger/passengers/processing',
				exact: true
			},
			{
				id: 'female',
				title: 'Female',
				translate: 'Female',
				display_order: 3,
				type: 'item',
				url: '/apps/passenger/passengers/female',
				exact: true
			},
			{
				id: 'hajj',
				title: 'Hajj',
				translate: 'Hajj',
				display_order: 4,
				type: 'item',
				url: '/apps/passenger/passengers/hajj',
				exact: true
			},

			{
				id: 'umrah',
				title: 'Umrah',
				translate: 'Umrah',
				display_order: 5,
				type: 'item',
				url: '/apps/passenger/passengers/umrah',
				exact: true
			},
			{
				id: 'travel',
				title: 'Travel',
				translate: 'Travel',
				display_order: 6,
				type: 'item',
				url: '/apps/passenger/passengers/travel',
				exact: true
			},
			{
				id: 'student',
				title: 'Student',
				translate: 'Student',
				display_order: 7,
				type: 'item',
				url: '/apps/passenger/passengers/student',
				exact: true
			},
			{
				id: 'passenger_delivery_report',
				title: 'Passenger Delivery ',
				translate: 'Passenger Delivery ',
				display_order: 8,
				type: 'item',
				url: '/apps/report-management/passengerdelivery-reports',
				exact: true
			},
			{
				id: 'passenger_delivery_reportreport',
				title: 'Passenger Delivery Report ',
				translate: 'Passenger Delivery Report',
				display_order: 9,
				type: 'item',
				url: '/apps/passengerDeliveryReports/report',
				exact: true
			}
		]
	},

	{
		id: 'cv',
		title: 'CV',
		translate: 'CV',
		display_order: 6,
		type: 'collapse',
		icon: 'description',
		url: '',
		exact: true,
		children: [
			{
				id: 'cv_bank',
				title: 'CV Bank',
				translate: 'CV Bank',
				display_order: 1,
				type: 'item',
				url: '/apps/cvBank/cvBanks',
				exact: true
			},
			{
				id: 'cv_female',
				title: 'Female CV',
				translate: 'Female CV',
				display_order: 1,
				type: 'item',
				url: '/apps/cvFemale/cvFemales',
				exact: true
			},
			{
				id: 'cv_male',
				title: 'FMle CV',
				translate: 'Male CV',
				display_order: 2,
				type: 'item',
				url: '/apps/cvMale/cvMales',
				exact: true
			},
			{
				id: 'complain',
				title: 'Complain',
				translate: 'Complain',
				display_order: 3,
				type: 'item',
				url: '/apps/complain/complains',
				exact: true
			}
		]
	},
	{
		id: 'service',
		title: 'Service',
		translate: 'Service',
		display_order: 7,
		type: 'collapse',
		icon: 'design_services',
		url: '',
		exact: true,
		children: [
			{
				id: 'auto_status_update',
				title: 'Auto Status Update',
				translate: 'Auto Status Update',
				display_order: 1,
				type: 'item',
				url: '/apps/autoStatusUpdate-management/new',
				exact: true
			},
			{
				id: 'office_work',
				title: 'Office Work',
				translate: 'Office Work',
				display_order: 2,
				type: 'item',
				url: '/apps/officeWork/officeWorks/new',
				exact: true
			},
			{
				id: 'medical',
				title: 'Medical',
				translate: 'Medical',
				display_order: 3,
				type: 'item',
				url: '/apps/medical/medicals/new',
				exact: true
			},
			{
				id: 'mofa',
				title: 'Mofa',
				translate: 'Mofa',
				display_order: 4,
				type: 'item',
				url: '/apps/mofa-management/mofas/new',
				exact: true
			},
			{
				id: 'musaned_okala',
				title: 'Musaned Okala',
				translate: 'Musaned Okala',
				display_order: 5,
				type: 'item',
				url: '/apps/musanedOkala-management/musanedOkalas/new',
				exact: true
			},

			{
				id: 'malaysia_status',
				title: 'Malaysia Status',
				translate: 'Malaysia Status',
				display_order: 6,
				type: 'item',
				url: '/apps/callingEmbAttestation-management/callingEmbAttestations/new',
				exact: true
			},

			{
				id: 'embassy',
				title: 'Embassy',
				translate: 'Embassy',
				display_order: 7,
				type: 'item',
				url: '/apps/embassy-management/embassys/new',
				exact: true
			},
			{
				id: 'training',
				title: 'Training',
				translate: 'Training',
				display_order: 8,
				type: 'item',
				url: '/apps/training-management/trainings/new',
				exact: true
			},
			{
				id: 'manPower',
				title: 'Manpower',
				translate: 'Manpower',
				display_order: 9,
				type: 'item',
				url: '/apps/manPower-management/manPowers/new',
				exact: true
			},

			{
				id: 'flight',
				title: 'Flight',
				translate: 'Flight',
				display_order: 10,
				type: 'item',
				url: '/apps/flight-management/flights/new',
				exact: true
			},

			{
				id: 'visa_cancel_list',
				title: 'Visa Cancel List',
				translate: 'Visa Cancel List',
				display_order: 11,
				type: 'item',
				url: '/apps/visaCancelList-management/visaCancelLists/new',
				exact: true
			},
			{
				id: 'visa_reissue_list',
				title: 'Visa Reissue List',
				translate: 'Visa Reissue List',
				display_order: 12,
				type: 'item',
				url: '/apps/visaReissueList-management/visaReissueLists/new',
				exact: true
			},

			{
				id: 'document_send',
				title: 'Document Send',
				translate: 'Document Send',
				display_order: 13,
				type: 'item',
				url: '/apps/docmentSend/docmentSends/new',
				exact: true
			},

			{
				id: 'make_a_lists',
				title: 'Make A List',
				translate: 'Make A List',
				display_order: 14,
				type: 'item',
				url: '/apps/makeAList/makeALists',
				exact: true
			},
			{
				id: 'multiple_statu_update',
				title: 'Multiple Status Update',
				translate: 'Multiple Status Update',
				display_order: 15,
				type: 'item',
				url: '/apps/multipleStatusUpdate-management/new',
				exact: true
			},
			{
				id: 'multiple_visa_entry',
				title: 'Multiple Visa Entry',
				translate: 'Multiple Visa Entry',
				display_order: 16,
				type: 'item',
				url: '/apps/multipleVisaEntry-management/multipleVisaEntrys/new',
				exact: true
			}
		]
	},
	{
		id: 'accounts',
		title: 'Account',
		translate: 'Account',
		display_order: 8,
		type: 'collapse',
		icon: 'account_balance',
		url: '',
		exact: true,
		children: [
			{
				id: 'post_date_cheque',
				title: 'Post Date Cheque',
				translate: 'Post Date Cheque',
				type: 'item',
				url: '/apps/postDateCheck-management/postDateChecks',
				exact: true,
				display_order: 1
			},
			{
				id: 'PayorderClearing',
				title: 'Post Date Payorder',
				translate: 'Post Date Payorder',
				type: 'item',
				url: '/apps/payorderClearing-management/payorderClearings',
				exact: true,
				display_order: 14
			},
			{
				id: 'groups',
				title: 'Group',
				translate: 'Group',
				display_order: 1,
				type: 'item',
				url: '/apps/group-management/groups',
				exact: true
			},
			{
				id: 'ledgers',
				title: 'Ledger',
				translate: 'Ledger',
				display_order: 2,
				type: 'item',
				url: '/apps/ledger-management/ledgers',
				exact: true
			},

			{
				id: 'authorize',
				title: 'Authorize',
				translate: 'Authorize',
				display_order: 3,
				type: 'item',
				url: '/apps/authorize-management/authorizes',
				exact: true
			},
			{
				id: 'sub_ledgers',
				title: 'Sub Ledger',
				translate: 'Sub Ledger',
				display_order: 4,
				type: 'item',
				url: '/apps/subLedger-management/subLedgers',
				exact: true
			},
			{
				id: 'payment_vouchers',
				title: 'Payment Voucher',
				translate: 'Payment Voucher',
				display_order: 5,
				type: 'item',
				url: '/apps/paymentVoucher-management/paymentVouchers',
				exact: true
			},
			{
				id: 'receipt_vouchers',
				title: 'Receipt Voucher',
				translate: 'Receipt Voucher',
				display_order: 6,
				type: 'item',
				url: '/apps/receiptVoucher-management/receiptVouchers',
				exact: true
			},
			{
				id: 'receivable_bills',
				title: 'Receivable Bill',
				translate: 'Receivable Bill',
				display_order: 7,
				type: 'item',
				url: '/apps/receivableBill-management/receivableBills',
				exact: true
			},
			{
				id: 'payable_bills',
				title: 'Payable Bill',
				translate: 'Payable Bill',
				display_order: 8,
				type: 'item',
				url: '/apps/payableBill-management/payableBills',
				exact: true
			},
			{
				id: 'contras',
				title: 'Contra',
				translate: 'Contra',
				display_order: 9,
				type: 'item',
				url: '/apps/contra-management/contras',
				exact: true
			},
			{
				id: 'journals',
				title: 'Journal',
				translate: 'Journal',
				display_order: 10,
				type: 'item',
				url: '/apps/journal-management/journals',
				exact: true
			},

			{
				id: 'journal_IDs',
				title: 'Id Journal',
				translate: 'Id Journal',
				display_order: 11,
				type: 'item',
				url: '/apps/journalID-management/journalIDs',
				exact: true
			}
		]
	},
	{
		id: 'setting',
		title: 'Setting',
		translate: 'Setting',
		display_order: 9,
		type: 'collapse',
		icon: 'settings',
		url: '',
		exact: true,
		children: [
			{
				id: 'current_statuss',
				title: 'Current Status',
				translate: 'Current Status',
				display_order: 1,
				type: 'item',
				url: '/apps/currentStatus-management/currentStatuss',
				exact: true
			},
			{
				id: 'professions',
				title: 'Profession',
				translate: 'Profession',
				display_order: 2,
				type: 'item',
				url: '/apps/profession-management/professions',
				exact: true
			},
			{
				id: 'Expired_days_count',
				title: 'Expired Days Count',
				translate: 'Expired Days Count',
				display_order: 2,
				type: 'item',
				url: '/apps/expiredDayForNotification-management/expiredDayForNotifications',
				exact: true
			},
			{
				id: 'passenger_types',
				title: 'Passenger Type',
				translate: 'Passenger Type',
				display_order: 3,
				type: 'item',
				url: '/apps/passengerType-management/passengerTypes',
				exact: true
			},
			{
				id: 'medical_centers',
				title: 'Medical Center',
				translate: 'Medical Center',
				display_order: 4,
				type: 'item',
				url: '/apps/medicalCenter-management/medicalCenters',
				exact: true
			},
			{
				id: 'recruiting_agencies',
				title: 'Recruiting Agency',
				translate: 'Recruiting Agency',
				display_order: 5,
				type: 'item',
				url: '/apps/recruitingAgency-management/recruitingAgencys',
				exact: true
			},
			{
				id: 'currencys',
				title: 'Currency',
				translate: 'Currency',
				display_order: 6,
				type: 'item',
				url: '/apps/currency-management/currencys',
				exact: true
			},

			{
				id: 'country',
				title: 'Country',
				translate: 'Country',
				display_order: 7,
				type: 'item',
				url: '/apps/country-management/countrys',
				exact: true
			},
			{
				id: 'district',
				title: 'District',
				translate: 'District',
				display_order: 8,
				type: 'item',
				url: '/apps/city-management/cities',
				exact: true
			},
			{
				id: 'police_station',
				title: 'Police Station',
				translate: 'Police Station',
				display_order: 9,
				type: 'item',
				url: '/apps/thana-management/thanas',
				exact: true
			},
			{
				id: 'branch',
				title: 'branch',
				translate: 'Branch',
				display_order: 10,
				type: 'item',
				url: '/apps/branch-management/branchs',
				exact: true
			},
			{
				id: 'site_setting',
				title: 'Site Setting',
				translate: 'Site Setting',
				display_order: 11,
				type: 'item',
				url: '/apps/sitesettings-management/sitesettings',
				exact: true
			},

			{
				id: 'todo_task_types',
				title: 'To-Do Task Type',
				translate: 'To-Do Task Type',
				display_order: 12,
				type: 'item',
				url: '/apps/todotasktype-management/todotasktypes',
				exact: true
			}
		]
	},
	{
		id: 'report',
		title: 'Report',
		translate: 'Report',
		display_order: 10,
		type: 'collapse',
		icon: 'people',
		url: '',
		exact: true,
		children: [
			{
				id: 'passenger_report',
				title: 'Passenger Report',
				translate: 'Passenger Report',
				display_order: 1,
				type: 'item',
				url: '/apps/passengers/report',
				exact: true
			},
			{
				id: 'company_overview_report',
				title: 'Company Overview Report',
				translate: 'Company Overview Report',
				display_order: 2,
				type: 'item',
				url: '/apps/companyOverviews/report',
				exact: true
			},
			{
				id: 'medical_report',
				title: 'Medical Report',
				translate: 'Medical Report',
				display_order: 3,
				type: 'item',
				url: '/apps/report-management/medical-reports',
				exact: true
			},
			{
				id: 'embassy_report',
				title: 'Embassy Report',
				translate: 'Embassy Report',
				display_order: 4,
				type: 'item',
				url: '/apps/report-management/embassy-reports',
				exact: true
			},
			{
				id: 'mofa_report',
				title: 'Mofa Report',
				translate: 'Mofa Report',
				display_order: 5,
				type: 'item',
				url: '/apps/report-management/mofa-reports',
				exact: true
			},
			{
				id: 'training_report',
				title: 'Training Report',
				translate: 'Training Report',
				display_order: 6,
				type: 'item',
				url: '/apps/report-management/training-reports',
				exact: true
			},
			{
				id: 'manPower_report',
				title: 'ManPower Report',
				translate: 'ManPower Report',
				display_order: 7,
				type: 'item',
				url: '/apps/report-management/manpower-reports',
				exact: true
			},
			{
				id: 'flight_report',
				title: 'Flight Report',
				translate: 'Flight Report',
				display_order: 8,
				type: 'item',
				url: '/apps/report-management/flight-reports',
				exact: true
			},
			{
				id: 'passenger_summary_report',
				title: 'Passenger Summary Report',
				translate: 'Passenger Summary Report',
				display_order: 9,
				type: 'item',
				url: '/apps/passenger_summarys/report',
				exact: true
			},
			{
				id: 'circular_report',
				title: 'Circular Report',
				translate: 'Circular Report',
				display_order: 10,
				type: 'item',
				url: '/apps/circulars/report',
				exact: true
			},
			{
				id: 'passenger_status_overview_report',
				title: 'Passenger Status Overview Report',
				translate: 'Passenger Status Overview Report',
				display_order: 11,
				type: 'item',
				url: '/apps/passengerStatusOverviews/report',
				exact: true
			},

			{
				id: 'visa_entry_report',
				title: 'Visa Entry Report',
				translate: 'Visa Entry Report',
				display_order: 12,
				type: 'item',
				url: '/apps/report-management/visaEntry-reports',
				exact: true
			},
			{
				id: 'calling_entry_report',
				title: 'Calling Entry Report',
				translate: 'Calling Entry Report',
				display_order: 13,
				type: 'item',
				url: '/apps/report-management/callingEntry-reports',
				exact: true
			},
			{
				id: 'e_visa_report',
				title: 'Calling Entry Report',
				translate: 'Calling Entry Report',
				display_order: 13,
				type: 'item',
				url: '/apps/report-management/callingEntry-reports',
				exact: true
			},
			{
				id: 'demand_report',
				title: 'Demand Report',
				translate: 'Demand Report',
				display_order: 13,
				type: 'item',
				url: '/apps/report-management/demand-reports',
				exact: true
			},
			{
				id: 'authorize_log_report',
				title: 'Authorize Log Report',
				translate: 'Authorize Log Report',
				display_order: 14,
				type: 'item',
				url: '/apps/report-management/authorizeLog-reports',
				exact: true
			}
		]
	},

	{
		id: 'account_report',
		title: 'Account Report',
		translate: 'Account Report',
		display_order: 11,
		type: 'collapse',
		icon: 'account_balance',
		url: '',
		exact: true,
		children: [
			{
				id: 'receipt_report',
				title: 'Receipt Report',
				translate: 'Receipt Report',
				display_order: 1,
				type: 'item',
				url: '/apps/report-management/receipt-reports',
				exact: true
			},
			{
				id: 'receipt_summary_report',
				title: 'Receipt Summary Report',
				translate: 'Receipt Summary Report',
				display_order: 2,
				type: 'item',
				url: '/apps/report-management/receipt-summary-reports',
				exact: true
			},
			{
				id: 'payment_report',
				title: 'Payment Report',
				translate: 'Payment Report',
				display_order: 3,
				type: 'item',
				url: '/apps/report-management/payment-reports',
				exact: true
			},
			{
				id: 'payment_summary_report',
				title: 'Payment Summary Report',
				translate: 'Payment Summary Report',
				display_order: 4,
				type: 'item',
				url: '/apps/report-management/payment-summary-reports',
				exact: true
			},
			{
				id: 'ledger_report',
				title: 'Ledger Report',
				translate: 'Ledger Report',
				display_order: 5,
				type: 'item',
				url: '/apps/report-management/ledger-reports',
				exact: true
			},
			{
				id: 'foreign_ledger_report',
				title: ' Foreign Ledger Report',
				translate: 'Foreign Ledger Report',
				display_order: 6,
				type: 'item',
				url: '/apps/report-management/foreignledger-reports',
				exact: true
			},
			{
				id: 'Passenger_summary',
				title: 'Passenger Account Summary',
				translate: 'Passenger Account Summary',
				display_order: 7,
				type: 'item',
				url: '/apps/report-management/passengerSummary-reports',
				exact: true
			},
			{
				id: 'Passenger_ledger_report',
				title: 'Passenger Ledger Report',
				translate: 'Passenger Ledger Report',
				display_order: 8,
				type: 'item',
				url: '/apps/report-management/passengerledger-reports',
				exact: true
			},
			{
				id: 'account_statement_report',
				title: 'Account Statement Report',
				translate: 'Account Statement Report',
				display_order: 9,
				type: 'item',
				url: '/apps/report-management/account-statement-reports',
				exact: true
			},
			{
				id: 'account_summary_report',
				title: 'Account Summary Report',
				translate: 'Account Summary Report',
				display_order: 10,
				type: 'item',
				url: '/apps/report-management/account-statement-summary-reports',
				exact: true
			},
			{
				id: 'trial_balance_report',
				title: 'Trial Balance Report',
				translate: 'Trial Balance Report',
				display_order: 11,
				type: 'item',
				url: '/apps/report-management/trial-balance-summary-reports',
				exact: true
			},
			{
				id: 'balance_sheet_report',
				title: 'Balance Sheet Report',
				translate: 'Balance Sheet Report',
				display_order: 12,
				type: 'item',
				url: '/apps/report-management/balance-sheet-summary-reports',
				exact: true
			},
			{
				id: 'profit_loss_report',
				title: 'Profit Loss Report',
				translate: 'Profit Loss Report',
				display_order: 13,
				type: 'item',
				url: '/apps/report-management/profit-loss-summary-reports',
				exact: true
			},
			{
				id: 'creditor_report',
				title: 'Sundry Creditors Report',
				translate: 'Sundry Creditors Report',
				display_order: 14,
				type: 'item',
				url: '/apps/report-management/creditor-reports',
				exact: true
			},
			{
				id: 'debtor_report',
				title: 'Sundry Debtors Report',
				translate: 'Sundry Debtors Report',
				display_order: 15,
				type: 'item',
				url: '/apps/report-management/debtor-reports',
				exact: true
			},
			{
				id: 'passenger_historys',
				title: 'Passenger History',
				translate: 'Passenger History',
				display_order: 16,
				type: 'item',
				url: '/apps/passengerEditHistory-management/passengerEditHistorys',
				exact: true
			},
			{
				id: 'post_date_cheque_report',
				title: 'Post Date Cheque Report',
				translate: 'Post Date Cheque Report',
				display_order: 17,
				type: 'item',
				url: '/apps/report-management/postDateCheque-reports',
				exact: true
			},
			{
				id: 'PayorderClearing',
				title: 'Post Date Payorder Rpt',
				translate: 'Post Date Payorder Rpt',
				type: 'item',
				url: '/apps/report-management/payorderClearing-reports',
				exact: true,
				display_order: 20
			}
		]
	},
	{
		id: 'form',
		title: 'Form',
		translate: 'Form',
		display_order: 12,
		type: 'collapse',
		icon: 'description',
		url: '',
		exact: true,
		children: [
			{
				id: 'bmet',
				title: 'Bmet Form',
				translate: 'Bmet Form',
				display_order: 1,
				type: 'item',
				url: '/apps/bmet/bmets',
				exact: true
			},
			{
				id: 'malaysia_visa',
				title: 'Malaysia Visa Form',
				translate: 'Malaysia Visa Form',
				display_order: 2,
				type: 'item',
				url: '/apps/malaysiaVisa/malaysiaVisas',
				exact: true
			},
			{
				id: 'thailand_visa',
				title: 'Thailand Visa Form',
				translate: 'Thailand Visa Form',
				display_order: 3,
				type: 'item',
				url: '/apps/thailandVisa/thailandVisas',
				exact: true
			},
			{
				id: 'kuwait_visa',
				title: 'Kuwait Visa Form',
				translate: 'Kuwait Visa Form',
				display_order: 4,
				type: 'item',
				url: '/apps/kuwaitVisa/kuwaitVisas',
				exact: true
			},
			{
				id: 'bmet_contract',
				title: 'Bmet Contract Form',
				translate: 'Bmet Contract Form',
				display_order: 5,
				type: 'item',
				url: '/apps/bmetContract/bmetContracts',
				exact: true
			},
			{
				id: 'ksa_visa',
				title: 'Visa Form',
				translate: 'Visa Form',
				display_order: 6,
				type: 'item',
				url: '/apps/ksaVisa/ksaVisas',
				exact: true
			},
			{
				id: 'ksa_visa_manual',
				title: 'Visa Form (Manual)',
				translate: 'Visa Form (Manual)',
				display_order: 7,
				type: 'item',
				url: '/apps/ksaVisaManual/ksaVisaManuals',
				exact: true
			},
			{
				id: 'passenger_agreement',
				title: 'Passenger Agreement Form',
				translate: 'Passenger Agreement Form',
				display_order: 8,
				type: 'item',
				url: '/apps/passengerAgreement/passengerAgreements',
				exact: true
			},
			{
				id: 'manpower_note_sheet',
				title: 'Manpower Note Sheet',
				translate: 'Manpower Note Sheet',
				display_order: 9,
				type: 'item',
				url: '/apps/manpowerNoteSheet/manpowerNoteSheets/new',
				exact: true
			},

			{
				id: 'manpower_note_sheet_male',
				title: 'Manpower Note Sheet Male',
				translate: 'Manpower Note Sheet Male',
				display_order: 10,
				type: 'item',
				url: '/apps/manpowerNoteSheetMale-management/manpowerNoteSheetMale/new',
				exact: true
			},
			{
				id: 'manpower_note_sheet_female',
				title: 'Manpower Note Sheet Female',
				translate: 'Manpower Note Sheet Female',
				display_order: 11,
				type: 'item',
				url: '/apps/manpowerNoteSheetFemale-management/manpowerNoteSheetFemale/new',
				exact: true
			},

			{
				id: 'finger',
				title: 'Finger Form',
				translate: 'Finger Form',
				display_order: 12,
				type: 'item',
				url: '/apps/finger/fingers',
				exact: true
			},
			{
				id: 'departure',
				title: 'Departure Card',
				translate: 'Departure Card',
				display_order: 13,
				type: 'item',
				url: '/apps/departure/departures',
				exact: true
			},
			{
				id: 'visa_submission_list',
				title: 'Visa Submission List',
				translate: 'Visa Submission List',
				display_order: 14,
				type: 'item',
				url: '/apps/visaSubmissionList-management/visaSubmissionList/new',
				exact: true
			},
			{
				id: 'manpower_submission_list',
				title: 'Manpower Submission List',
				translate: 'Manpower Submission List',
				display_order: 15,
				type: 'item',
				url: '/apps/manpowerSubmissionList/manpowerSubmissionLists/new',
				exact: true
			},
			{
				id: 'manpower_submission_V2_list',
				title: 'Manpower Submission List V2',
				translate: 'Manpower Submission List V2',
				display_order: 16,
				type: 'item',
				url: '/apps/manpowerSubmissionV2List-management/manpowerSubmissionV2List/new',
				exact: true
			},
			{
				id: 'bmet_stamp',
				title: 'BMET Stamp Form',
				translate: 'BMET Stamp Form',
				display_order: 17,
				type: 'item',
				url: '/apps/bmetStamp-management/bmetStamp/new',
				exact: true
			},
			{
				id: 'list_Of_manpowerRef',
				title: 'Manpower REF List',
				translate: 'Manpower REF List',
				display_order: 18,
				type: 'item',
				url: '/apps/ListOfManpowerRef-management/ListOfManpowerRef/new',
				exact: true
			},
			{
				id: 'bmet_application',
				title: 'BMET Application',
				translate: 'BMET Application',
				display_order: 19,
				type: 'item',
				url: '/apps/bmetApplication-management/bmetApplication/new',
				exact: true
			},
			{
				id: 'bmet_applicationv2',
				title: 'BMET Application V2',
				translate: 'BMET Application V2',
				display_order: 20,
				type: 'item',
				url: '/apps/bmetApplication-management-v2/bmetApplication/new',
				exact: true
			}
		]
	},

	{
		id: 'letter',
		title: 'Letter',
		translate: 'Letter',
		display_order: 13,
		type: 'collapse',
		icon: 'people',
		url: '',
		exact: true,
		children: [
			{
				id: 'form_content_detail',
				title: 'Form Content Detail',
				translate: 'Form Content Detail',
				display_order: 1,
				type: 'item',
				url: '/apps/formContentDetail/formContentDetails',
				exact: true
			},
			{
				id: 'male_training',
				title: 'Male Training Letter',
				translate: 'Male Training Letter',
				display_order: 2,
				type: 'item',
				url: '/apps/maletraining/maletrainings',
				exact: true
			},

			{
				id: 'female_training',
				title: 'Female Training Letter',
				translate: 'Female Training Letter',
				display_order: 3,
				type: 'item',
				url: '/apps/femaletraining/femaletrainings',
				exact: true
			},
			{
				id: 'bmet_verify',
				title: 'BMET Verify Form',
				translate: 'BMET Verify Form',
				display_order: 4,
				type: 'item',
				url: '/apps/bmetVerify/bmetVerifys',
				exact: true
			},

			{
				id: 'male_finger_letter',
				title: 'Male Finger Letter',
				translate: 'Male Finger Letter',
				display_order: 5,
				type: 'item',
				url: '/apps/malefingerletter-management/malefingerletter-form',
				exact: true
			},
			{
				id: 'female_finger_letter',
				title: 'Female Finger Letter',
				translate: 'Female Finger Letter',
				display_order: 6,
				type: 'item',
				url: '/apps/femalefingerletter-management/femalefingerletter-form',
				exact: true
			}
		]
	},

	{
		id: 'todo',
		title: 'To-Do',
		translate: 'TODO',
		display_order: 14,
		type: 'item',
		icon: 'check_box',
		url: '/apps/todo'
	},
	{
		id: 'calendar',
		title: 'Calendar',
		translate: 'CALENDAR',
		display_order: 15,
		type: 'item',
		icon: 'today',
		url: '/apps/calendar'
	},

	{
		id: 'ticket',
		title: 'Ticket',
		translate: 'TICKET ',
		display_order: 16,
		type: 'collapse',
		icon: 'book_online',
		url: '',
		exact: true,
		children: [
			{
				id: 'tiket_entrys_new',
				title: 'Bulk Ticket Entrys',
				translate: 'Bulk Ticket Entrys',
				display_order: 1,
				type: 'item',
				url: '/apps/ticketEntry-management/ticketEntrys/new',
				exact: true
			},
			{
				id: 'tiket_entrys',
				title: 'Ticket Purchase',
				translate: 'Ticket Purchase',
				display_order: 1,
				type: 'item',
				url: '/apps/tiketentry-management/tiketentrys',
				exact: true
			},
			{
				id: 'ticket_sales_report',
				title: 'Ticket Purchase Report',
				translate: 'Ticket Purchase Report',
				display_order: 2,
				type: 'item',
				url: '/apps/ticketsaless/report',
				exact: true
			},

			{
				id: 'ticket_posting_report',
				title: 'Ticket Posting ',
				translate: 'Ticket Posting',
				display_order: 3,
				type: 'item',
				url: '/apps/ticketpostings/report',
				exact: true
			},

			{
				id: 'ticket_refund',
				title: 'Ticket Refund',
				translate: 'Ticket Refund',
				display_order: 4,
				type: 'item',
				url: '/apps/ticketrefund-management/ticketrefunds',
				exact: true
			},
			{
				id: 'ticket_depute',
				title: 'Ticket Depute',
				translate: 'Ticket Depute',
				display_order: 5,
				type: 'item',
				url: '/apps/ticketdepute-management/ticketdeputes',
				exact: true
			},
			{
				id: 'ticket_pic_sales',
				title: 'Ticket Sales ',
				translate: 'Ticket Sales ',
				display_order: 6,
				type: 'item',
				url: '/apps/ticketPicsale-management/ticketPicsales',
				exact: true
			},

			{
				id: 'ticket_edits',
				title: 'Ticket Edit ',
				translate: 'Ticket Edit ',
				display_order: 7,
				type: 'item',
				url: '/apps/ticketedit-management/ticketedits',
				exact: true
			}
		]
	},

	{
		id: 'ticket_setting',
		title: 'Ticket Setting',
		translate: 'Ticket Setting ',
		display_order: 17,
		type: 'collapse',
		icon: 'settings',
		url: '',
		exact: true,
		children: [
			{
				id: 'airway',
				title: 'Airway',
				translate: 'Airway',
				display_order: 1,
				type: 'item',
				url: '/apps/airway-management/airways',
				exact: true
			},

			{
				id: 'gds',
				title: 'GDS',
				translate: 'GDS',
				display_order: 2,
				type: 'item',
				url: '/apps/gds-management/gdss',
				exact: true
			}
		]
	},
	{
		id: 'ticket_report',
		title: 'Report',
		translate: 'Report ',
		display_order: 18,
		type: 'collapse',
		icon: 'report',
		url: '',
		exact: true,
		children: [
			{
				id: 'ticket_sale_report',
				title: 'Ticket Sales Report',
				translate: 'Ticket Sales Report',
				display_order: 1,
				type: 'item',
				url: '/apps/ticketsales/report',
				exact: true
			},
			{
				id: 'ticket_refund_report',
				title: 'Ticket Refund Report',
				translate: 'Ticket Refund Report',
				display_order: 2,
				type: 'item',
				url: '/apps/ticketrefunds/report',
				exact: true
			},
			{
				id: 'ticket_depute_report',
				title: 'Ticket Depute Report',
				translate: 'Ticket Depute Report',
				display_order: 3,
				type: 'item',
				url: '/apps/ticketdeputes/report',
				exact: true
			},
			{
				id: 'ticket_sales_summary_report',
				title: 'Ticket Sales Summary Report',
				translate: 'Ticket Sales Summary Report',
				display_order: 4,
				type: 'item',
				url: '/apps/ticketsalessummarys/report',
				exact: true
			}
		]
	},
	// support
	{
		id: 'supportTicket',
		title: 'supportTicket',
		translate: 'Support Ticket',
		type: 'collapse',
		icon: 'support_agent',
		url: '/apps/support-management/supports',
		children: [
			{
				id: 'api_connect',
				title: 'API Connect',
				translate: 'API Connect',
				type: 'item',
				url: '/apps/supportAPI-management/supportAPIs',
				exact: true,
				display_order: 3
			},
			{
				id: 'newsupport',
				title: 'Supports',
				translate: 'Supports',
				type: 'item',
				url: '/apps/support-management/supports',
				exact: true
			}
		]
	},
	{
		id: 'user_config',
		title: 'User Config',
		translate: 'User Config',
		display_order: 19,
		type: 'collapse',
		icon: 'admin_panel_settings',
		url: '',
		exact: true,
		children: [
			{
				id: 'permission',
				title: 'Permission',
				translate: 'Permission',
				display_order: 1,
				type: 'item',
				url: '/apps/permission-management/permissions',
				exact: true
			},
			{
				id: 'role',
				title: 'Role',
				translate: 'Role',
				display_order: 2,
				type: 'item',
				url: '/apps/roles-management/roles'
			},
			{
				id: 'user_list',
				title: 'User list',
				translate: 'User List',
				display_order: 3,
				type: 'item',
				url: '/apps/users-management/userslist',
				exact: true
			},
			{
				id: 'menu',
				title: 'Menu',
				translate: 'Menu',
				display_order: 4,
				type: 'item',
				url: '/apps/menu-management/menus',
				exact: true
			},

			{
				id: 'role_menu',
				title: 'Role Menu',
				translate: 'Role Menu',
				display_order: 5,
				type: 'item',
				url: '/apps/roleMenu-management/roleMenus',
				exact: true
			},
			{
				id: 'activity_log_report',
				title: 'Activity Log',
				translate: 'Activity Log',
				display_order: 6,
				type: 'item',
				url: '/apps/activityLogs/report',
				exact: true
			}
		]
	}
];
export default navigationConfig;
