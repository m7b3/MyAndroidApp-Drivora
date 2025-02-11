var express = require("express");
const MessageList = Object.freeze({
  status_true: true,
  status_false: false,
  success: "Success.",
  no_data_found: "No Data Found.",
  record_already_available: "Record Already Available",
  record_already_exists: "Record Already Exists",
  success_insert: "Successfully Inserted.",
  success_update: "Successfully Updated.",
  not_insert: "Not Inserted",
  not_update: "Not Updated",
  success_delete: "Successfully Deleted.",
  not_delete: "Not Deleted.",
  something_went_wrong: "Something went wrong.Please try again",
  image_error: 'Only .png, .jpg and .jpeg format allowed!',
  pdf_error: "Only .pdf files are allowed!",
  file_upload_error: 'Invalid file format!',
  
  enter_mobile_no: "Please Enter Mobile No",
  enter_password: "Please Enter Password",
  login_success: "Login Success.",
  login_fail: "Login Fail.",
  logout_success: "LogOut Success.",
  logout_fail: "LogOut Fail.",
  already_logout: "Already Logged Out ",
  invalid_mobile_no_password: "Invalid Mobile No Or Password",
  cannot_delete_record_available: "Cannot Delete Records",
  account_active: "Your account is activated",
  in_active: "Your account is deactivated. Please Contact Admin",
  img_not_found: "Image Not Found !",


  enter_name: "Please Enter Name",
  enter_userid: "Please Enter User ID",
  enter_EmailID: "Please Enter EmailID",
  user_already_exists: "User Already Exists",
  mobile_number_exists: "MobileNO Already Registered !",
  username_exists: "Username Already Registered! Try Different Username",
  email_not_found: "EmailID Not Found !",
  password_updated_successfully: "Password Updated Successfully !",

  enter_userid: "Please Enter UserID",
  enter_name: "Please Enter name",
  enter_mobileno: "Please Enter MobileNo",
  enter_username: "Please Enter Username",
  enter_password: "Please Enter Password",
  enter_emailid: "Please Enter EmailID",
  invalid_password: "invalid password",
  invalid_credentials: "invalid credentials",
  user_not_register: "User not register",
  enter_usertypeid: "Please Enter UserTypeID",
  enter_usertype: "Please Enter UserType",
  password_changed: "Password Changed !",

  enter_all_required_fields: "Please Enter All Required Fields",
  password_mismatch: "Password Mismatch",
});

module.exports = MessageList;