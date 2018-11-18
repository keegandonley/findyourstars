const fs = require('fs');
const path = require('path');
const Datastore = require('@google-cloud/datastore');
const moment = require('moment');

const res = fs.readFileSync(path.join(__dirname, '../data/eclipses-comp.geojson'));
const stringData = res.toString('utf-8');
const data = JSON.parse(stringData);
const { features } = data;

const clean = features.map(({ properties, geometry }) => {
	const historicalCutoff = 1484699710;
	const eventDate = moment(properties.Date_).unix();
	if (eventDate < historicalCutoff) {
		return null;
	}
	return {
		id: properties.OBJECTID,
		name: properties.EclipseName,
		time: properties.TimeGE,
		DT: properties.DT,
		Lunation: properties.Lunation,
		Saro: properties.Saro,
		EclType: properties.EclType,
		Gamma: properties.Gamma,
		EclMagn: properties.EclMagn,
		Latitude: properties.Latitude,
		Longitude: properties.Longitud,
		SunAlt: properties.SunAlt,
		SunAzi: properties.SunAzi,
		PathWid: properties.PathWid,
		DurationSeconds: properties.DurationSeconds,
		date: properties.Date_,
		epoch: eventDate,
		uid: properties.unique_id,
		area: properties.Shape__Area,
		length: properties.Shape__Length,
		geometry: geometry,
	}
}).filter(x => x);

const projectId = 'sachacks-222818';
const datastore = new Datastore({
	projectId: projectId,
});
const kind = 'Eclipse';

const geometries = {};
clean.forEach((element) => {
	const key = datastore.key([kind, element.id]);
	const task = {
		key: key,
		data: {
			name: element.name,
			geoType: element.geometry.type,
			eclipse_id: element.id,
			time: element.TimeGE,
			DT: element.DT,
			Lunation: element.Lunation,
			Saro: element.Saro,
			EclType: element.EclType,
			Gamma: element.Gamma,
			EclMagn: element.EclMagn,
			Latitude: element.Latitude,
			Longitude: element.Longitude,
			SunAlt: element.SunAlt,
			SunAzi: element.SunAzi,
			PathWid: element.PathWid,
			DurationSeconds: element.DurationSeconds,
			date: element.date,
			epoch: element.epoch,
			uid: element.unique_id,
			area: element.area,
			length: element.length,
		},
	};
	geometries[element.id] = element.geometry.coordinates;

	datastore.save(task).then(() => {
		console.log(`saved ${element.name} (${element.id})`);
	});
});

fs.writeFileSync(path.join(__dirname, '../public/data/eclipse_geometries.json'), JSON.stringify(geometries));
