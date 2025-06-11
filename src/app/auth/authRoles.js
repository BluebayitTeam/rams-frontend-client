/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */
	admin: [ 'admin' ],
	/**
	 * The staff role grants access to users with the 'admin' or 'staff' role.
	 */
	staff: [ 'staff', 'manager', 'accounts', 'owner' ],
	/**
	 * The user role grants access to users with the 'admin', 'staff', or 'user' role.
	 */
	user: [ 'manager', 'accounts', 'owner' ],
	/**
	 * The onlyGuest role grants access to unauthenticated users.
	 */
	onlyGuest: []
};
export default authRoles;
