const duplicateEmail = "Duplicate email found!";
const createdSuccess = "Created successfully!";
const recordsNotFound = "No records found!";
const recordsFound = "Records found!";
const updateFailedRecordNotFound = "Record not found. Update failed!";
const updateSuccess = "Updated successfully!";
const emailRequired = "Email is required";
const deleteFailedRecordNotFound = "Record not found. Delete failed!";
const deleteSuccess = "Deleted successfully!";
const invalidToken = "Invalid token";
const incorrectPassword = "The password you entered is incorrect. Please verify and try again.";
const userNotFound = "The email you entered does not match our records. Please enter a valid email.";
const invalidUser = "User is not valid user!";
const signInSuccess = "You have successfully signed in!";
const otpSentSuccess = async (email) => {
  return `We have sent an OTP to your registered email address at ${email}. Please check your email and enter it here.`;
};
const otpSentFail = async(email) => {
  return `Failed to send OTP to ${email}.`
}
const invalidOtp = "The OTP you entered is incorrect. Please verify and try again.";

module.exports = {
    duplicateEmail,
    createdSuccess,
    recordsNotFound,
    recordsFound,
    updateFailedRecordNotFound,
    updateSuccess,
    emailRequired,
    deleteFailedRecordNotFound,
    deleteSuccess,
    invalidToken,
    incorrectPassword,
    userNotFound,
    invalidUser,
    signInSuccess,
    otpSentSuccess,
    otpSentFail,
    invalidOtp
}