import CalendarAppConfig from './calendar/CalendarAppConfig';
import MessengerAppConfig from './messenger/MessengerAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import HelpCenterAppConfig from './help-center/HelpCenterAppConfig';
import MailboxAppConfig from './mailbox/MailboxAppConfig';
import NotesAppConfig from './notes/NotesAppConfig';
import ProfileAppConfig from './profile/profileAppConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
import TasksAppConfig from './tasks/TasksAppConfig';
import NotificationsAppConfig from './notifications/NotificationsAppConfig';
import UserAppConfig from '../rams/UsersManagement/UserAppConfig';
import EmployeeAppConfig from '../rams/EmployeesManagement/EmployeeAppConfig';
import ColumnAppConfig from '../rams/ColumnsManagement/ColumnAppConfig';
import DepartmentAppConfig from '../rams/DepartmentsManagement/DepartmentAppConfig';
import DesignationAppConfig from '../rams/DesignationsManagement/DesignationAppConfig';
import MenuAppConfig from '../rams/MenusManagement/MenuAppConfig';
import PermissionAppConfig from '../rams/PermissionsManagement/PermissionAppConfig';
import RoleAppConfig from '../rams/RolesManagement/RoleAppConfig';
import RoleMenuAppConfig from '../rams/RoleMenusManagement/RoleMenuAppConfig';
import SupportAppConfig from '../rams/SupportsManagement/SupportAppConfig';
import PaymentDetailAppConfig from '../rams/PaymentDetailsManagement/PaymentDetailAppConfig';
import SubscriptionLoanAppConfig from '../rams/SubscriptionLoansManagement/SubscriptionLoanAppConfig';
import FeatureDetailAppConfig from '../rams/FeatureDetailsManagement/FeatureDetailAppConfig';
import AgentAppConfig from '../rams/AgentsManagement/AgentAppConfig';
import PassengerAppConfig from '../rams/PassengersManagement/PassengerAppConfig';
/**
 * The list of application configurations.
 */
const appsConfigs = [
  CalendarAppConfig,
  MessengerAppConfig,
  ContactsAppConfig,
  ECommerceAppConfig,
  FileManagerAppConfig,
  HelpCenterAppConfig,
  MailboxAppConfig,
  NotesAppConfig,
  ProfileAppConfig,
  ScrumboardAppConfig,
  TasksAppConfig,
  NotificationsAppConfig,
  UserAppConfig,

  AgentAppConfig,
  ColumnAppConfig,

  EmployeeAppConfig,
  SubscriptionLoanAppConfig,
  DepartmentAppConfig,
  PaymentDetailAppConfig,
  SupportAppConfig,
  RoleMenuAppConfig,
  DesignationAppConfig,

  MenuAppConfig,
  PermissionAppConfig,
  RoleAppConfig,
  PassengerAppConfig,

  FeatureDetailAppConfig,
];
export default appsConfigs;
