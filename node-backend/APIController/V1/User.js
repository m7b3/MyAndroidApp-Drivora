const express = require('express')
const mssql = require('mssql')
const dataAccess = require('../../DatabaseConnection/data-access')
const Connection = require('../../DatabaseConnection/Connection')
const MessageList = require('../../Constants/MessageList');
const Utility = require('../../Helper/Utility')

const router = express.Router();

exports.UserSignUp = [async (req, res) => {
    try {
        const {
            FirstName,
            LastName,
            EmailID,
            Password,
            ConfirmPassword,
            IsActive,
            IsDelete
        } = req.body;

        if (!FirstName || !LastName || !EmailID || !Password || !ConfirmPassword) {
            return res.status(200).json({
                status: MessageList.status_false,
                message: MessageList.enter_all_required_fields,
                data: [],
                error: null,
            });
        }

        if (Password !== ConfirmPassword) {
            return res.status(200).json({
                status: MessageList.status_false,
                message: MessageList.password_mismatch,
                data: [],
                error: null,
            });
        }

        try {
            
            await Connection.connect();

            var checkUserData = [
                { name: 'Query', value: 'CheckUserEmail' },
                { name: 'EmailID', value: EmailID ? EmailID : null },
                { name: 'IsDelete', value: 'true' },
            ];

            const checkUserResult = await dataAccess.execute(`SP_UserData`, checkUserData);
            if (checkUserResult.recordset && checkUserResult.recordset[0]) {
                const userData = checkUserResult.recordset;
                if (userData.length > 0) {
                    return res.status(200).json({
                        status: MessageList.status_false,
                        message: MessageList.user_already_exists,
                        data: [],
                        error: null,
                    });
                }
            }

            var data = [
                { name: 'Query', value: 'Insert' },
                { name: 'FirstName', value: FirstName ? FirstName : null },
                { name: 'LastName', value: LastName ? LastName : null },
                { name: 'EmailID', value: EmailID ? EmailID : null },
                { name: 'Password', value: Password ? Password : null },
                { name: 'ConfirmPassword', value: ConfirmPassword ? ConfirmPassword : null },
                { name: 'IsActive', value: IsActive ? IsActive : null },
                { name: 'IsDelete', value: IsDelete ? IsDelete : null }
            ];

            const result = await dataAccess.execute(`SP_UserData`, data);
            if (result.rowsAffected && result.rowsAffected[0] == 1) {
                return res.status(200).json({
                    status: MessageList.status_true,
                    message: MessageList.success_insert,
                    data: [],
                    error: null,
                });
            } else {
                return res.status(200).json({
                    status: MessageList.status_false,
                    message: MessageList.not_insert,
                    data: [],
                    error: null,
                });
            }
        } catch (error) {
            await Utility.setErrorLog(req.headers.host + req.path, req.method, error.message, req.body);
            return res.status(500).json({
                status: MessageList.status_false,
                message: error.message,
                data: [],
                error: null,
            });
        }
    } catch (error) {
        await Utility.setErrorLog(req.headers.host + req.path, req.method, error.message, req.body);
        return res.status(500).json({
            status: MessageList.status_false,
            message: error.message,
            data: [],
            error: null,
        });
    }
}];

exports.UserLogin = async (req, res) => {
    try {
        const {
            EmailID,
            Password,
        } = req.body;

        if (!EmailID) {
            return res.status(200).json({ status: MessageList.status_false, message: MessageList.enter_EmailID, data: [], error: null });
        }
        else if (!Password) {
            return res.status(200).json({ status: MessageList.status_false, message: MessageList.enter_password, data: [], error: null });
        } else {
            try {
                await Connection.connect();

                const userLoginData = [
                    { name: 'Query', value: 'UserLogin' },
                    { name: 'EmailID', value: EmailID ? EmailID : null },
                    { name: 'Password', value: Password ? Password : null },
                    { name: 'IsActive', value: 'true' },
                    { name: 'IsDelete', value: 'false' },
                ];

                const userLoginResult = await dataAccess.execute('SP_UserData', userLoginData);

                var getUserData = userLoginResult.recordset;
                if (getUserData.length > 0 && getUserData[0].EmailID === EmailID) {

                    if (getUserData[0].Password === Password) {
                        const updateLogInOutStatusData = [
                            { name: 'Query', value: 'UpdateLogInOutStatus' },
                            // { name: 'UserID', value: getUserData[0].UserID },
                            { name: 'EmailID', value: getUserData[0].EmailID },
                            { name: 'LogInOutStatus', value: 'Login' },
                        ];

                        await dataAccess.execute('SP_UserData', updateLogInOutStatusData);
                        return res.status(200).json({ status: MessageList.status_true, message: MessageList.login_success, data: { UserID: getUserData[0].UserID, FirstName: getUserData[0].FirstName, LastName: getUserData[0].LastName, EmailID: getUserData[0].EmailID }, error: null });
                    } else {
                        return res.status(200).json({ status: MessageList.status_false, message: MessageList.invalid_password, data: [], error: null });
                    }
                } else {
                    return res.status(200).json({ status: MessageList.status_false, message: MessageList.invalid_credentials, data: [], error: null });
                }
            } catch (err) {
                await Utility.setErrorLog(req.headers.host + req.path, req.method, err.message, req.body);
                return res.status(500).json({ status: MessageList.status_false, message: err.message, data: [], error: null });
            }
        }
    } catch (error) {
        await Utility.setErrorLog(req.headers.host + req.path, req.method, error.message, req.body);
        return res.status(500).json({ status: MessageList.status_false, message: error.message, data: [], error: null });
    }
};

exports.UserLogOut = [async (req, res) => {
    try {
        const {
            //UserID,
            EmailID,
        } = req.body;
        try {
            await Connection.connect();
            const updateLogInOutStatusData = [
                { name: 'Query', value: 'UpdateLogInOutStatus' },
                //{ name: 'UserID', value: UserID },
                { name: 'EmailID', value: EmailID },
                { name: 'LogInOutStatus', value: 'Logout' },
            ];

            const result = await dataAccess.execute('SP_UserData', updateLogInOutStatusData);
            if (result.rowsAffected == 1) {
                return res.status(200).json({ status: MessageList.status_false, message: MessageList.logout_success, data: [], error: null });

            } else {
                return res.status(200).json({ status: MessageList.status_false, message: MessageList.logout_fail, data: [], error: null });

            }
        } catch (err) {
            await Utility.setErrorLog(req.headers.host + req.path, req.method, err.message, req.body);
            return res.status(500).json({ status: MessageList.status_false, message: err.message, data: [], error: null });
        }
    } catch (error) {
        await Utility.setErrorLog(req.headers.host + req.path, req.method, error.message, req.body);
        return res.status(500).json({ status: MessageList.status_false, message: error.message, data: [], error: null });
    }
}];

exports.ForgotPassword = async (req, res) => {
    try {
        const { EmailID, NewPassword, ConfirmPassword } = req.body;

        if (!EmailID) {
            return res.status(200).json({ status: MessageList.status_false, message: MessageList.enter_EmailID, data: [], error: null });
        }
        if (!NewPassword || !ConfirmPassword) {
            return res.status(200).json({ status: MessageList.status_false, message: MessageList.enter_password, data: [], error: null });
        }
        if (NewPassword !== ConfirmPassword) {
            return res.status(200).json({ status: MessageList.status_false, message: MessageList.password_mismatch, data: [], error: null });
        }

        try {
            await Connection.connect();

            const checkUserData = [
                { name: 'Query', value: 'CheckUserEmail' },
                { name: 'EmailID', value: EmailID }
            ];
            const checkUserResult = await dataAccess.execute('SP_UserData', checkUserData);

            if (checkUserResult.recordset.length === 0) {
                return res.status(200).json({ status: MessageList.status_false, message: MessageList.email_not_found, data: [], error: null });
            }

            const forgotPasswordData = [
                { name: 'Query', value: 'ForgotPassword' },
                { name: 'EmailID', value: EmailID },
                { name: 'Password', value: NewPassword },
                { name: 'ConfirmPassword', value: ConfirmPassword },
            ];

            await dataAccess.execute('SP_UserData', forgotPasswordData);

            return res.status(200).json({ status: MessageList.status_true, message: MessageList.password_updated_successfully, data: [], error: null });
        } catch (err) {
            await Utility.setErrorLog(req.headers.host + req.path, req.method, err.message, req.body);
            return res.status(500).json({ status: MessageList.status_false, message: err.message, data: [], error: null });
        }
    } catch (error) {
        await Utility.setErrorLog(req.headers.host + req.path, req.method, error.message, req.body);
        return res.status(500).json({ status: MessageList.status_false, message: error.message, data: [], error: null });
    }
};
