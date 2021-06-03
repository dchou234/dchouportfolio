


// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `
		<div id="app">

		<div id="chatui">
			<div id="infotext"> You currently have <b>{{bot.razzBerries}}</b> Razz berries and <b>{{bot.money}}</b> PokeDollars. </div>
			<chat-widget :messages="messages" />

			<div id="controls">
				<div>
					<input ref="input" v-model="currentInput" @keyup="sayKey" @keyup.enter="enterInput">

					<button @click="enterInput">↩️</button>
				</div>
				<div id="presetbtns">
					<button @click="handleInput('feed razzberry')">Feed</button>
					<button @click="handleInput('buy berry')">Buy Berries</button>
					<button @click="handleInput('shake!')">Shake</button>
					<button @click="handleInput('high five!')">HighFive</button>
					<button @click="handleInput('battle')">Battle</button>
				</div>


			</div>
		</div>	
			

		</div>`,

		watch: {

			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {
			sayKey() {
				console.log("KEY")
			},

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""


				this.handleInput(text)

			},

			handleInput(text) {
				//emojis dictating users/bot
				this.postToChat(text, "😐", true)
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "😊")

				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {

			}, 1000)

			this.bot.post = (text) =>  {

				this.postToChat(text, "😊")
			}

		},


		data() {
			//store everything
			return {
				bot: new EeveeBot(),
				messages: [],
				currentInput: ""
			}
		}
	})
})
