

class Blobs{
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {

		this.aof = aof
		this.center = new Vector()
	}


	update(t, dt) {
		//updates done in draw due to how the blobs work, also from Prof Compton's template code.
	}

	draw(p) {
		let t = p.millis()*.001

		p.push()
		p.translate(0, -200*p.noise(.2*t + this.id))
		p.rotate(1*p.noise(.3*t + this.id) - .5)


		let blobSize = this.aof.get("size")*25 + 12

		//number of spikes
		let pointCount = this.aof.get("spikes")*20 + 3

		//size of inner color components
		let inner = this.aof.get("innerColor") / 2

		//noise for spike movment
		let spikeNoise = this.aof.get("noise") / 2

		let color = this.aof.get("color")

		let bodyPoint = (r, theta, index) => {

			r *= 1+this.aof.get("spikeSize")*(index%2)
			let bp = Vector.polar(r, theta)

			// Use noise to offset each point
			let defR =  .05*r*spikeNoise
			let scale = .1
			let defTheta =  20*p.noise((bp[0]*scale, bp[1]*scale +  t*.3))


			bp.addPolar(defR, defTheta)
			return bp
		}

		// Draw a blobby shape, actually draw 3 shapes on top of each other
		for (var i = 0; i < 3; i++) {
			let size = blobSize*(1 - i*inner)
			p.fill(((color + .2*i)%1)*360, 100, 50 - i*10, 1)
			p.beginShape()
			for (var j = 0; j < pointCount + 2; j++) {

				// get the point on this body
				let theta = j*Math.PI*2/pointCount
				let bp = bodyPoint(size, theta, j)
				p.curveVertex(...bp)

			}

			p.endShape()
		}



		// Draw a face

		p.push()
		p.translate(-blobSize*.5, -blobSize*.2)
		p.fill(0)
		p.circle(0,0, 4)
		p.fill(80)
		p.circle(1,1.8, 1)
		p.fill(100)
		p.circle(.5,-1.5, 2)
		p.pop()

		p.push()
		p.translate(blobSize*.5, -blobSize*.2)
		p.fill(0)
		p.circle(0,0, 4)
		p.fill(80)
		p.circle(1,1.8, 1)
		p.fill(100)
		p.circle(.5,-1.5, 2)
		p.pop()

		p.push()
		p.fill(0)
		p.arc(0, 0, .4*blobSize, .4*blobSize, .05*Math.PI, .95*Math.PI)

		p.pop()

		p.pop()
	}
}

// Optional background: drawn once per population
// Fish.drawBackground = function(p) {
// 	p.background(190, 80, 90)
// }

// Static properties for this class
Blobs.landmarks = {
	"diamond": [0.61, 0.14, 0.85, 0.053, 0.496, 0.372],
	"sun": [0.52, 0.77, 0.56, 0.94, 0.13, 0.16],
	"blob": [0.77,0.45,0.00,0.13,0.09,0.18],
	"speechbubble": [0.98,0.08,0.31,0.11,0.55,0.23],
	"triangle": [0.43,0.64,0.29,0.15,1.00,0.35]
}
Blobs.labels = ["size", "color", "spikeSize", "spikes", "innerColor", "noise"]
