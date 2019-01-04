
/**
 * @name util.js
 * @fileOverview Helper class to handle various utility functions
 * @author Fazlul RM
 */

(function() {

  'use strict';

	var moment = require('moment');
	/**
	 * Format DB date to human readable
	 * @param {string} date - DB date string
	 * @param {string} format - Date format
	 * @returns {string}
	 */
	function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
		return moment(date).utc().format(format);
	}

	/**
	 * Check whether user has permission to parituclar action
	 * @param {string} date - DB date string
	 * @returns {string}
	 */
	function hasPermission(permission, userPermissions) {
		if (_.indexOf(userPermissions, permission) > -1) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Video types
	 * @returns {Array}
	 */
	function videoTypes() {
		return ["video/mp4"];
	}

	
	/**
	 * Image types
	 * @returns {Array}
	 */
	function imageTypes() {
		return ["image/png", "image/jpeg"];
	}

	/**
	 * Export module fumctions to be accessed from outside
	 */
	module.exports = {
		formatDate,
		hasPermission,
		videoTypes,
		imageTypes
	}

})();