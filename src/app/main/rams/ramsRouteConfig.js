import { lazy } from 'react';

const ramsRouteConfig = {
	settings: {
		layout: {}
	},
	routes: [
		//employee
		{
			path: '/apps/employee-management/employees',
			component: lazy(() => import('./EmployeeManagement/Employees/Employees'))
		},
		{
			path: '/apps/employee-management/:employeeId',
			component: lazy(() => import('./EmployeeManagement/Employee/NewEmployee'))
		},
		{
			path: '/apps/employee-management/:employeeId/:employeeName?',
			component: lazy(() => import('./EmployeeManagement/Employee/NewEmployee'))
		},
		{
			path: '/apps/users-management/userslist',
			component: lazy(() => import('./EmployeeManagement/UsersList/UsersList'))
		},
		{
			path: '/apps/users-management/forgot-password/:userId',
			component: lazy(() => import('./EmployeeManagement/UsersList/ForgotPassword'))
		},

		//department
		{
			path: '/apps/department-management/departments/:departmentId/:departmentName?',
			component: lazy(() => import('./DepartmentsManagement/Department/NewDepartment'))
		},
		{
			path: '/apps/department-management/departments',
			component: lazy(() => import('./DepartmentsManagement/Departments/Departments'))
		},
		{
			path: '/apps/department-management/:departmentId',
			component: lazy(() => import('./DepartmentsManagement/Department/NewDepartment'))
		},

		//qualification
		{
			path: '/apps/qualification-management/qualifications/:qualificationId/:qualificationName?',
			component: lazy(() => import('./QualificationsManagement/Qualification/NewQualification'))
		},
		{
			path: '/apps/qualification-management/qualifications',
			component: lazy(() => import('./QualificationsManagement/Qualifications/Qualifications'))
		},
		{
			path: '/apps/qualification-management/:qualificationId',
			component: lazy(() => import('./QualificationsManagement/Qualification/NewQualification'))
		},

		//city
		{
			path: '/apps/city-management/cities/:cityId/:cityName?',
			component: lazy(() => import('./CitysManagement/City/NewCity'))
		},
		{
			path: '/apps/city-management/cities',
			component: lazy(() => import('./CitysManagement/Citys/Citys'))
		},
		{
			path: '/apps/city-management/:cityId',
			component: lazy(() => import('./CitysManagement/City/NewCity'))
		},

		//thana
		{
			path: '/apps/thana-management/thanas/:thanaId/:thanaName?',
			component: lazy(() => import('./ThanasManagement/Thana/NewThana'))
		},
		{
			path: '/apps/thana-management/thanas',
			component: lazy(() => import('./ThanasManagement/Thanas/Thanas'))
		},
		{
			path: '/apps/thana-management/:thanaId',
			component: lazy(() => import('./ThanasManagement/Thana/NewThana'))
		},

		//branch
		{
			path: '/apps/branch-management/branchs/:branchId/:branchName?',
			component: lazy(() => import('./BranchsManagement/Branch/NewBranch'))
		},
		{
			path: '/apps/branch-management/branchs',
			component: lazy(() => import('./BranchsManagement/Branchs/Branchs'))
		},
		{
			path: '/apps/branch-management/:branchId',
			component: lazy(() => import('./BranchsManagement/Branch/NewBranch'))
		},

		//sitesettings
		{
			path: '/apps/sitesettings-management/sitesetting/:sitesettingId/:sitesettingName?',
			component: lazy(() => import('./SitesettingsManagement/Sitesetting/NewSitesetting'))
		},
		{
			path: '/apps/sitesettings-management/sitesettings/',
			component: lazy(() => import('./SitesettingsManagement/Sitesettings/Sitesettings'))
		},
		{
			path: '/apps/sitesettings-management/sitesetting/:sitesettingId',
			component: lazy(() => import('./SitesettingsManagement/Sitesetting/NewSitesetting'))
		},

		//permission
		{
			path: '/apps/permission-management/permissions/:permissionId/:permissionName?',
			component: lazy(() => import('./PermissionsManagement/Permission/NewPermission'))
		},
		{
			path: '/apps/permission-management/permissions',
			component: lazy(() => import('./PermissionsManagement/Permissions/Permissions'))
		},
		{
			path: '/apps/permission-management/:permissionId',
			component: lazy(() => import('./PermissionsManagement/Permission/NewPermission'))
		},

		//roles
		{
			path: '/apps/roles-management/roles',
			component: lazy(() => import('./RoleManagement/Roles/Roles'))
		},
		{
			path: '/apps/roles-management/:roleId',
			component: lazy(() => import('./RoleManagement/Role/NewRole'))
		},
		{
			path: '/apps/roles-management/:roleId/:roleName?',
			component: lazy(() => import('./RoleManagement/Role/NewRole'))
		},
		//menu
		{
			path: '/apps/menu-management/menus/:menuId/:menuName?',
			component: lazy(() => import('./MenusManagement/Menu/NewMenu.js'))
		},
		{
			path: '/apps/menu-management/menus',
			component: lazy(() => import('./MenusManagement/Menus/Menus'))
		},
		{
			path: '/apps/menu-management/:menuId',
			component: lazy(() => import('./MenusManagement/Menu/NewMenu'))
		},

		//roleMenu
		{
			path: '/apps/roleMenu-management/roleMenus/:roleMenuId/:roleMenuName?',
			component: lazy(() => import('./RoleMenusManagement/RoleMenu/NewRoleMenu.js'))
		},
		{
			path: '/apps/roleMenu-management/roleMenus',
			component: lazy(() => import('./RoleMenusManagement/RoleMenus/RoleMenus'))
		},
		{
			path: '/apps/roleMenu-management/:roleMenuId',
			component: lazy(() => import('./RoleMenusManagement/RoleMenu/NewRoleMenu'))
		},

		//passengerType
		{
			path: '/apps/passengerType-management/passengerTypes/:passengerTypeId/:passengerTypeName?',
			component: lazy(() => import('./PassengerTypesManagement/PassengerType/NewPassengerType.js'))
		},
		{
			path: '/apps/passengerType-management/passengerTypes',
			component: lazy(() => import('./PassengerTypesManagement/PassengerTypes/PassengerTypes'))
		},
		{
			path: '/apps/passengerType-management/:passengerTypeId',
			component: lazy(() => import('./PassengerTypesManagement/PassengerType/NewPassengerType'))
		},

		//currentStatus
		{
			path: '/apps/currentStatus-management/currentStatuss/:currentStatusId/:currentStatusName?',
			component: lazy(() => import('./CurrentStatussManagement/CurrentStatus/NewCurrentStatus.js'))
		},
		{
			path: '/apps/currentStatus-management/currentStatuss',
			component: lazy(() => import('./CurrentStatussManagement/CurrentStatuss/CurrentStatuss'))
		},
		{
			path: '/apps/currentStatus-management/:currentStatusId',
			component: lazy(() => import('./CurrentStatussManagement/CurrentStatus/NewCurrentStatus'))
		},
		//profession
		{
			path: '/apps/profession-management/professions/:professionId/:professionName?',
			component: lazy(() => import('./ProfessionsManagement/Profession/NewProfession'))
		},
		{
			path: '/apps/profession-management/professions',
			component: lazy(() => import('./ProfessionsManagement/Professions/Professions'))
		},
		{
			path: '/apps/profession-management/:professionId',
			component: lazy(() => import('./ProfessionsManagement/Profession/NewProfession'))
		},
		//agent
		{
			path: '/apps/agent-management/agents/:agentId/:agentName?',
			component: lazy(() => import('./AgentsManagement/Agent/NewAgent.js'))
		},
		{
			path: '/apps/agent-management/agents',
			component: lazy(() => import('./AgentsManagement/Agents/Agents'))
		},
		{
			path: '/apps/agent-management/:agentId',
			component: lazy(() => import('./AgentsManagement/Agent/NewAgent'))
		},
		//demand
		{
			path: '/apps/demand-management/demands/:demandId/:demandName?',
			component: lazy(() => import('./DemandsManagement/Demand/NewDemand.js'))
		},
		{
			path: '/apps/demand-management/demands',
			component: lazy(() => import('./DemandsManagement/Demands/Demands'))
		},
		{
			path: '/apps/demand-management/:demandId',
			component: lazy(() => import('./DemandsManagement/Demand/NewDemand'))
		},
		//recruitingAgency
		{
			path: '/apps/recruitingAgency-management/recruitingAgencys/:recruitingAgencyId/:recruitingAgencyName?',
			component: lazy(() => import('./RecruitingAgencysManagement/RecruitingAgency/NewRecruitingAgency.js'))
		},
		{
			path: '/apps/recruitingAgency-management/recruitingAgencys',
			component: lazy(() => import('./RecruitingAgencysManagement/RecruitingAgencys/RecruitingAgencys'))
		},
		{
			path: '/apps/recruitingAgency-management/:recruitingAgencyId',
			component: lazy(() => import('./RecruitingAgencysManagement/RecruitingAgency/NewRecruitingAgency'))
		},
		//visaEntry
		{
			path: '/apps/visaEntry-management/visaEntrys/:visaEntryId/:visaEntryName?',
			component: lazy(() => import('./VisaEntrysManagement/VisaEntry/NewVisaEntry.js'))
		},
		{
			path: '/apps/visaEntry-management/visaEntrys',
			component: lazy(() => import('./VisaEntrysManagement/VisaEntrys/VisaEntrys'))
		},
		{
			path: '/apps/visaEntry-management/:visaEntryId',
			component: lazy(() => import('./VisaEntrysManagement/VisaEntry/NewVisaEntry'))
		},
		//passenger
		{
			path: '/apps/passenger-management/passenger/:passengerId/:passengerName?/:passengerType?',
			component: lazy(() => import('./PassengersManagement/Passenger/NewPassenger.js'))
		},
		{
			path: '/apps/passenger-management/passengers/:passengerType?',
			component: lazy(() => import('./PassengersManagement/Passengers/Passengers'))
		},
		{
			path: '/apps/passenger-management/:passengerId/:passengerType?',
			component: lazy(() => import('./PassengersManagement/Passenger/NewPassenger'))
		},
		//medicalCenter
		{
			path: '/apps/medicalCenter-management/medicalCenters/:medicalCenterId/:medicalCenterName?',
			component: lazy(() => import('./MedicalCentersManagement/MedicalCenter/NewMedicalCenter'))
		},
		{
			path: '/apps/medicalCenter-management/medicalCenters',
			component: lazy(() => import('./MedicalCentersManagement/MedicalCenters/MedicalCenters'))
		},
		{
			path: '/apps/medicalCenter-management/:medicalCenterId',
			component: lazy(() => import('./MedicalCentersManagement/MedicalCenter/NewMedicalCenter'))
		},

		//medical
		{
			path: '/apps/medical-management/medical/:medicalId/:fromSearch?',
			component: lazy(() => import('./MedicalsManagement/Medical/NewMedical'))
		},
		//embassy
		{
			path: '/apps/embassy-management/embassy/:embassyId/:fromSearch?',
			component: lazy(() => import('./EmbassysManagement/Embassy/NewEmbassy'))
		},
		//mofa
		{
			path: '/apps/mofa-management/mofa/:mofaId/:fromSearch?',
			component: lazy(() => import('./MofasManagement/Mofa/NewMofa'))
		},
		//femaleCV
		{
			path: '/apps/femaleCV-management/femaleCV/:femaleCVId/:fromSearch?',
			component: lazy(() => import('./FemaleCVsManagement/FemaleCV/NewFemaleCV'))
		},
		//flight
		{
			path: '/apps/flight-management/flight/:flightId/:fromSearch?',
			component: lazy(() => import('./FlightsManagement/Flight/NewFlight'))
		},
		//maleCV
		{
			path: '/apps/maleCV-management/maleCV/:maleCVId/:fromSearch?',
			component: lazy(() => import('./MaleCVsManagement/MaleCV/NewMaleCV'))
		},
		//manPowerList
		{
			path: '/apps/manPowerList-management/manPowerList/:manPowerListId/:fromSearch?',
			component: lazy(() => import('./ManPowerListsManagement/ManPowerList/NewManPowerList'))
		},
		//musanedOkala
		{
			path: '/apps/musanedOkala-management/musanedOkala/:musanedOkalaId/:fromSearch?',
			component: lazy(() => import('./MusanedOkalasManagement/MusanedOkala/NewMusanedOkala'))
		},
		//officeWork
		{
			path: '/apps/officeWork-management/officeWork/:officeWorkId/:fromSearch?',
			component: lazy(() => import('./OfficeWorksManagement/OfficeWork/NewOfficeWork'))
		},
		//training
		{
			path: '/apps/training-management/training/:trainingId/:fromSearch?',
			component: lazy(() => import('./TrainingsManagement/Training/NewTraining'))
		},
		//visaCancelList
		{
			path: '/apps/visaCancelList-management/visaCancelList/:visaCancelListId/:fromSearch?',
			component: lazy(() => import('./VisaCancelListsManagement/VisaCancelList/NewVisaCancelList'))
		},
		//visaReissueList
		{
			path: '/apps/visaReissueList-management/visaReissueList/:visaReissueListId/:fromSearch?',
			component: lazy(() => import('./VisaReissueListsManagement/VisaReissueList/NewVisaReissueList'))
		},
		//visaSubmissionList
		{
			path: '/apps/visaSubmissionList-management/visaSubmissionList/:visaSubmissionListId/:fromSearch?',
			component: lazy(() => import('./VisaSubmissionListsManagement/VisaSubmissionList/NewVisaSubmissionList'))
		},
		//manPower
		{
			path: '/apps/manPower-management/manPower/:manPowerId/:fromSearch?',
			component: lazy(() => import('./ManPowersManagement/ManPower/NewManPower'))
		},
		//callingEmbAttestation
		{
			path: '/apps/callingEmbAttestation-management/callingEmbAttestation/:callingEmbAttestationId/:fromSearch?',
			component: lazy(() =>
				import('./CallingEmbAttestationsManagement/CallingEmbAttestation/NewCallingEmbAttestation')
			)
		},
		//passengerSearch
		{
			path: '/apps/passenger/search/:searchKeyword',
			component: lazy(() => import('./PassengerSearch/PassengerAllDetails'))
		},
		//agentReport
		{
			path: '/apps/agents/report',
			component: lazy(() => import('./ReportManagement/AgentReportManagement/AgentReport/AgentReport'))
		},
		//passengerReport
		{
			path: '/apps/passengers/report',
			component: lazy(() =>
				import('./ReportManagement/PassengerReportManagement/PassengerReport/PassengerReport')
			)
		},
		//medicalReport
		{
			path: '/apps/medicals/report',
			component: lazy(() => import('./ReportManagement/MedicalReportManagement/MedicalReport/MedicalReport'))
		},
		//embassyReport
		{
			path: '/apps/embassies/report',
			component: lazy(() => import('./ReportManagement/EmbassyReportManagement/EmbassyReport/EmbassyReport'))
		},
		//mofa Report
		{
			path: '/apps/mofas/report',
			component: lazy(() => import('./ReportManagement/MofaReportManagement/MofaReport/MofaReport'))
		},
		//training Report
		{
			path: '/apps/trainings/report',
			component: lazy(() => import('./ReportManagement/TrainingReportManagement/TrainingReport/TrainingReport'))
		},
		//man_power Report
		{
			path: '/apps/man_powers/report',
			component: lazy(() => import('./ReportManagement/ManPowerReportManagement/ManPowerReport/ManPowerReport'))
		},
		//flight Report
		{
			path: '/apps/flights/report',
			component: lazy(() => import('./ReportManagement/FlightReportManagement/FlightReport/FlightReport'))
		},
		//passenger_summary Report
		{
			path: '/apps/passenger_summarys/report',
			component: lazy(() =>
				import(
					'./ReportManagement/PassengerSummaryReportManagement/PassengerSummaryReport/PassengerSummaryReport'
				)
			)
		},
		//ledger
		{
			path: '/apps/ledger-management/ledgers/:ledgerId/:ledgerName?',
			component: lazy(() => import('./AllAccountManagement/LedgersManagement/Ledger/NewLedger'))
		},
		{
			path: '/apps/ledger-management/ledgers',
			component: lazy(() => import('./AllAccountManagement/LedgersManagement/Ledgers/Ledgers'))
		},
		{
			path: '/apps/ledger-management/:ledgerId',
			component: lazy(() => import('./AllAccountManagement/LedgersManagement/Ledger/NewLedger'))
		},
		//subLedger
		{
			path: '/apps/subLedger-management/subLedgers/:subLedgerId/:subLedgerName?',
			component: lazy(() => import('./AllAccountManagement/SubLedgersManagement/SubLedger/NewSubLedger'))
		},
		{
			path: '/apps/subLedger-management/subLedgers',
			component: lazy(() => import('./AllAccountManagement/SubLedgersManagement/SubLedgers/SubLedgers'))
		},
		{
			path: '/apps/subLedger-management/:subLedgerId',
			component: lazy(() => import('./AllAccountManagement/SubLedgersManagement/SubLedger/NewSubLedger'))
		},
		//group
		{
			path: '/apps/group-management/groups/:groupId/:groupName?',
			component: lazy(() => import('./AllAccountManagement/GroupsManagement/Group/NewGroup'))
		},
		{
			path: '/apps/group-management/groups',
			component: lazy(() => import('./AllAccountManagement/GroupsManagement/Groups/Groups'))
		},
		{
			path: '/apps/group-management/:groupId',
			component: lazy(() => import('./AllAccountManagement/GroupsManagement/Group/NewGroup'))
		},
		//paymentVoucher
		{
			path: '/apps/paymentVoucher-management/paymentVouchers/:paymentVoucherId/:paymentVoucherName?',
			component: lazy(() =>
				import('./AllAccountManagement/PaymentVouchersManagement/PaymentVoucher/NewPaymentVoucher')
			)
		},
		{
			path: '/apps/paymentVoucher-management/paymentVouchers',
			component: lazy(() =>
				import('./AllAccountManagement/PaymentVouchersManagement/PaymentVouchers/PaymentVouchers')
			)
		},
		{
			path: '/apps/paymentVoucher-management/:paymentVoucherId',
			component: lazy(() =>
				import('./AllAccountManagement/PaymentVouchersManagement/PaymentVoucher/NewPaymentVoucher')
			)
		},
		//receiptVoucher
		{
			path: '/apps/receiptVoucher-management/receiptVouchers/:receiptVoucherId/:receiptVoucherName?',
			component: lazy(() =>
				import('./AllAccountManagement/ReceiptVouchersManagement/ReceiptVoucher/NewReceiptVoucher')
			)
		},
		{
			path: '/apps/receiptVoucher-management/receiptVouchers',
			component: lazy(() =>
				import('./AllAccountManagement/ReceiptVouchersManagement/ReceiptVouchers/ReceiptVouchers')
			)
		},
		{
			path: '/apps/receiptVoucher-management/:receiptVoucherId',
			component: lazy(() =>
				import('./AllAccountManagement/ReceiptVouchersManagement/ReceiptVoucher/NewReceiptVoucher')
			)
		},
		//receivableBill
		{
			path: '/apps/receivableBill-management/receivableBills/:receivableBillId/:receivableBillName?',
			component: lazy(() =>
				import('./AllAccountManagement/ReceivableBillsManagement/ReceivableBill/NewReceivableBill')
			)
		},
		{
			path: '/apps/receivableBill-management/receivableBills',
			component: lazy(() =>
				import('./AllAccountManagement/ReceivableBillsManagement/ReceivableBills/ReceivableBills')
			)
		},
		{
			path: '/apps/receivableBill-management/:receivableBillId',
			component: lazy(() =>
				import('./AllAccountManagement/ReceivableBillsManagement/ReceivableBill/NewReceivableBill')
			)
		},
		//payableBill
		{
			path: '/apps/payableBill-management/payableBills/:payableBillId/:payableBillName?',
			component: lazy(() => import('./AllAccountManagement/PayableBillsManagement/PayableBill/NewPayableBill'))
		},
		{
			path: '/apps/payableBill-management/payableBills',
			component: lazy(() => import('./AllAccountManagement/PayableBillsManagement/PayableBills/PayableBills'))
		},
		{
			path: '/apps/payableBill-management/:payableBillId',
			component: lazy(() => import('./AllAccountManagement/PayableBillsManagement/PayableBill/NewPayableBill'))
		}
	]
};

export default ramsRouteConfig;
