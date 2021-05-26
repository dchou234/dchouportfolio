let animations = [
	// Each animation is represented an object
	// with a title, setup, and draw function
	// This one draws a circle moving around
	{
		title: "Windmill",

		draw: function(p) {
			p.background(0)
			let t = p.millis()*.001
			p.translate(150, 150)

			let loopTime = 6;
			let cyclePct = (t/loopTime)%1
			let theta = cyclePct * Math.PI * 2


			for(var i = 0; i < 6; i++){
				p.fill('#9867C5')
				p.ellipse(0, 50, 50, 100)
				p.ellipse(0, -50, 50, 100)
				p.rotate(theta)


				let x = 125 * Math.sin(theta)
				let y = 125 * Math.cos(theta)

				p.circle(x, y , 20)
				p.circle(-x, -y, 20)
			}
		}
	},


	{
		title: "Cascade",
		//uses some components from the Loops example code provided by Professor Compton
		draw: function(p) {

			 p.background(0)

			let t = p.millis()*.001

			for (var i = 0; i < 70; i++) {
				let x = (t*50 + i*20) - 30*p.noise(t + i*.05)
				let y = (t*60 + i*4) + 100*p.noise(t + i*.1)

				x %= p.width
				y %= p.height

				let r = (t*50 + i)%360

				p.fill(r, 75, 60)
				p.rect(x, y, 10,10, 4)
			}
		}
	},

	{
		title: "Solar System",

		draw: function(p){
			p.background(0)
			let t = p.millis()*0.001

			p.translate(150, 150)

			p.fill('yellow')
			p.circle(0,0, 50)

			let mercX = 50 * Math.sin(1.22*t)
			let mercY = 50 * Math.cos(1.22*t)

			p.noStroke()
			p.fill('#696969')
			p.circle(mercX, mercY, 6)


			let vX = 75 * Math.sin(0.48*t)
			let vY = 75 * Math.cos(0.48*t)

			p.noStroke()
			p.fill('#DC143C')
			p.circle(vX, vY, 12)

			let eX = 100 * Math.sin(0.3*t)
			let eY = 100 * Math.cos(0.3*t)

			p.noStroke()
			p.fill('#87CEFA')
			p.circle(eX, eY, 15)

			let marsX = 125 * Math.sin(0.2*t)
			let marsY = 125 * Math.cos(0.2*t)

			p.noStroke()
			p.fill('#8B0000')
			p.circle(marsX, marsY, 14)


		}
	}


]
