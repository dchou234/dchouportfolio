
let positions = []

// You may want to change these starting values
let tool = {
	//gray color HSL value
	color0: [240,8,44],
	//aquamarine hsl value
	color1: [165,100,50],
	size: 2,
	mode: "circlePencil"
}


let tools = {
	circlePencil(p, size, color0, color1) {

		let mouse = [p.mouseX, p.mouseY]

		p.fill(...color1)
		p.circle(...mouse, size*4)
		p.fill(...color0)
		p.circle(mouse[0], mouse[1] - size, size*3)
	},

	normalPencil(p, size, color0, color1) {

		p.stroke(...color1)
		p.strokeWeight(size)
		p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
	},

	space(p, size) {

		let mouse = new Vector()

		let emojiOptions = ["🚀","🌍","🌙","🌠","🌌","👾"]

		let index = Math.floor(emojiOptions.length*Math.random())
		let emoji = emojiOptions[index]

		let x = p.mouseX
		let y = p.mouseY

		x += 7*size*(Math.random() - .5)
		y += 7*size*(Math.random() - .5)

		p.textSize(Math.sqrt(size)*7)

		if (Math.random() < 0.3)
			p.text(emoji, x, y)
	},

	comet(p, size, color0, color1, drawCount) {
		let t = p.millis()*.001
		let mouse = [p.mouseX, p.mouseY]
		positions.push(mouse)

		p.noFill()

		let lineColor = color1.slice()
		let pastelShift = p.noise(t) - .5
		lineColor[2] += (pastelShift)*90


		p.stroke(...lineColor, .5*Math.random())

		size += 24*p.noise(t*.5)
		let jump = 12

		p.beginShape()
		for (var i = 0; i < 5; i++) {
			let index = positions.length - 1 - i*jump

			if (index > 0) {
				let pos = positions[index].slice()
				let scribbleSize = 0.5
				pos[0] += scribbleSize*size*(Math.random() - .75)*i
				pos[1] += scribbleSize*size*(Math.random() - .75)*i

				p.curveVertex(...pos)
			}

		p.endShape()
	}
},

	clearBlack(p, size){

	},
	clearWhite(p, size){

	}
}
