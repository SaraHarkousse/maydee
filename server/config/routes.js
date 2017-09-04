module.exports = function (app, passport) {
    /**Declare all routes file */
	require('../user/user.route')(app, passport);
};
