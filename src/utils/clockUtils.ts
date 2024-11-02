export const getTime = (currentDateObj: Date, is12HourFormat = true) => {
	let hours = currentDateObj.getHours();
	const minutes = currentDateObj.getMinutes();

	const meridiem = is12HourFormat && (hours < 12 ? "AM" : "PM");

	// Converts hours to 12-hour format
	if (is12HourFormat) {
		hours = hours % 12;
		hours = hours ? hours : 12; // If hours is 0, set it to 12
	}

	// Ensure two-digit format for hours and minutes
	const formattedHours = hours < 10 ? "0" + hours : hours;
	const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

	return {
		time: `${formattedHours}:${formattedMinutes}`,
		meridiem,
		is12HourFormat,
	};
};
