class Starjs {
	constructor(config) {
		this._elemID = config ? config.id || 'stars' : 'stars';
		this._count = config ? config.count : null;
		this._elem = document.getElementById(config.id || 'stars');
		this._elem.width = config.width || document.body.clientWidth;
		this._elem.height = config.height || document.body.clientHeight;
	}

	// Begins the creation process. Should be called once the DOM has loaded
	init(count) {
		var oldCount = this._count;
		if (count) {
			this._count = count;
		} 
		this._paint();
		this._count = oldCount;
	}

	// Draws a pre-generated array of stars
	_paint() {
		var ctx = this._elem.getContext('2d');
		var stars = this._makeStars();
		stars.forEach(function (star) {
			ctx.beginPath();
			ctx.fillStyle = star.c;
			ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
			ctx.fill();
		})
	}

	// Builds all the stars and then returns an array
	_makeStars() {
		var stars = [];
		var width = this._elem.getBoundingClientRect().width;
		var height = this._elem.getBoundingClientRect().height;
		var count = this._count || width / 2;
		for (var i = 0; i < count; ++i) {
			var m = Math.random();
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				c: 'rgba(255, 255, 255, ' + m + ')',
				r: m * 2
			});
		}
		return stars;
	}
}

export default Starjs;