

// Moving noise into the global scope so its not attached to P5
let noise = () => {}
const canvasW = 650
const canvasH = 450
const dimensions = 10



let app = {
}


// Change any of these
let controls = {
	// TODO: change these lines to contain your class
	classes: [Blobs],
	selectedClass: Blobs,
	hovered: 0,
	selected: 0,
	count: 7,
	animationMode: "static",
	isAnimating: true,
	selectedAOF: undefined,
	updateSelected() {
		if (controls.selected !== undefined) {
			controls.selected = Math.min(controls.selected, population.individuals.length - 1)
			controls.selectedAOF = population.individuals[controls.selected].aof
		}
	}
}

let population = new Population(controls.selectedClass)


// Setup and Vue things
document.addEventListener("DOMContentLoaded", function(){

	Vue.component("aof", {
		template: `<div class="aof">

		`,
		props: ["aof"]
	})

	//==========================================================
	// CONTROLS
	// UI to control things *not* handled by individual AOFs
	new Vue({
		el : "#controls",
		template: `<div id="controls">
			<select v-model="controls.selectedClass">
				<option v-for="c in controls.classes" :value="c">{{c.name}}</option>
			</select>

			<aof-sliders :aof="controls.selectedAOF" />
			<aof-population />
			<aof-landmarks />

		</div>`,

		watch: {
			"controls.selected": function() {
				controls.updateSelected()
			},

			"controls.selectedClass": function() {
				population.individualClass = controls.selectedClass
				population.regenerate()
			}
		},


		data() {
			return {
				controls:controls
			}
		}

	})



	//==========================================================
	// Track shift and shift-selecting multiple individuals
	document.addEventListener('keyup', function(e){
		if (e.key === "Shift") {
			app.shiftDown = false
		}
	});

	document.addEventListener('keydown', function(e){
		if (e.key === "Shift") {
			app.shiftDown = true
			Vue.set(app, "shiftSelected", [])
		}
	});


	//==========================================================
	// Setup P5

	let p = new p5((p) => {
		// Save the noise fxn
		noise = p.noise


		let mousePos = []
		// Basic P5 setup
		p.setup = () => {
			p.createCanvas(canvasW, canvasH)
			p.colorMode(p.HSL)
			p.ellipseMode(p.RADIUS)

		}

		//-------------------------------------------
		// Mouse things

		// Utility fxn to test if mouse in p5
		function mouseInP5() {
			return p.mouseX > 0 && p.mouseX < canvasW && p.mouseY > 0 && p.mouseY < canvasH
		}

		p.mouseMoved = () => {
			if (mouseInP5()) {
				controls.hovered = population.getClosest([p.mouseX,p.mouseY])
			}
		}
		p.doubleClicked = () => {
			if (mouseInP5()) {
				let ind = population.individuals[controls.selected]
				if (ind)
					population.nextGeneration({
						parents: [ind.aof]
					})
			}
		}

		p.mouseClicked = () => {
			controls.selected = controls.hovered
		}
		//-------------------------------------------
		// Draw

		p.draw = () => {

			//-------------------
			// UPDATES


			// Run some update code every frame
			population.update(p)


			//-------------------------
			// DRAWING
			population.draw(p)
		}
	}, document.getElementById("app"))

})

//============================================================
// Utilities
// Returns a value between 0 and 1, but never reaching either
function sigmoid(v) {
	return 1 / (1 + Math.pow(Math.E, -v));
}

function unitSigmoid(v, range=1) {
	return 1 / (1 + Math.pow(Math.E, -range*(v - .5)));
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
