/*
 * Copyright Evan Summers
 * 
 */
package saltserver.storage.adminuser;

/**
 *
 * @author evan
 */
public enum AdminUserQuery {
    validate,
    insert,
    update_login,
    update_logout,
    update_secret,
    update_cert,
    update_display_name,
    update_display_name_subject_cert,
    exists_username,
    exists_email,
    delete_username,
    find_username,
    find_email,
    list,
}
