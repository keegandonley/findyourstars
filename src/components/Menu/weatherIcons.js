import { faCloudSun, faSun, faMoon, faSnowflake, faWind, faCloud, faCloudMoon, faTint, faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, faThermometerFull } from '@fortawesome/pro-light-svg-icons';

export function getWeatherIcon(icon) {
	if (icon === 'clear-day') {
	  return faSun;
	} else if (icon === 'clear-night') {
	  return faMoon;
	} else if (icon === 'rain') {
	  return faTint;
	} else if (icon === 'snow') {
	  return faSnowflake;
	} else if (icon === 'sleet') {
	  return faSnowflake;
	} else if (icon === 'wind') {
	  return faWind;
	} else if (icon === 'fog') {
	  return faCloud;
	} else if (icon === 'cloudy') {
	  return faCloud;
	} else if (icon === 'partly-cloudy') {
	  return faCloudSun;
	} else if (icon === 'partly-cloudy-day') {
		return faCloudSun;
	} else if (icon === 'partly-cloudy-night') {
	  return faCloudMoon;
	}
}

export function getTherm(temp) {
	if (temp > 90) {
	  return faThermometerFull;
	} else if (temp > 75) {
	  return faThermometerThreeQuarters;
	} else if (temp > 60) {
	  return faThermometerHalf;
	} else if (temp > 50) {
	  return faThermometerQuarter;
	}
	return faThermometerEmpty
}