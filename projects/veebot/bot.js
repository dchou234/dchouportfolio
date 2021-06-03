class EeveeBot {
	constructor() {
		this.razzBerries = 10
		this.money = 2000
		this.battleTime = 20;

		this.eeveePics =
		[
			"<img src = 'https://cdn.vox-cdn.com/thumbor/-Qqhvrhbw5vmjHT3GHLhIg-feno=/0x0:1280x720/1200x0/filters:focal(0x0:1280x720):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13434617/Switch_PokemonLetsGo_090618_PressKit_SCRN_11_bmp_jpgcopy.jpg' width = '225px' height = 'auto'</img>",
			"<img src = 'https://www.telegraph.co.uk/content/dam/gaming/2018/10/15/Pokemon_Let-s_Go_screenshot_6_trans_NvBQzQNjv4BqNJjoeBT78QIaYdkJdEY4CnGTJFJS74MYhNY6w3GNbO8.png' width = '225px' height = 'auto'</img>",
			"<img src = 'https://www.vgr.com/wp-content/uploads/2018/06/Pokemon-Lets-Go-Eevee.jpg' width = '225px' height = 'auto'</img>",
			"<img src = 'https://www.vgr.com/wp-content/uploads/2018/06/Pokemon-Lets-Go-Eevee.jpg' width = '225px' height = 'auto'</img>"
		]

		this.highFive = [
			"<img src = 'https://assets.gamepur.com/wp-content/uploads/2020/03/18001553/eevee-high-five-pokemon-lets-go.jpg' width = '225px' height = 'auto'</img>"
		]

		this.shake = [
			"<img src = 'https://cdn.vox-cdn.com/thumbor/komAhGx5taJzX_7IsEAxroQ73d4=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/11444987/Screen_Shot_2018_05_29_at_9.40.42_PM.png' width = '225px' height = 'auto'</img>"
		]

		this.eat = [
			"<img src = 'https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2020/08/lets-go-eevee-feeding.jpg' width = '225px' height = 'auto'</img>"
		]

		this.win = [
			"<img src = 'https://www.imore.com/sites/imore.com/files/styles/xlarge/public/field/image/2018/11/pokemon-lets-go-eevee-screen-bond.jpg' width = '225px' height = 'auto'</img>"
		]

		this.lose = [
			"<img src = 'https://poketouch.files.wordpress.com/2018/10/project_eevee_pokemon_lets_go_pikachu_and_lets_go_screenshot_of_sad_customized_eevee.jpg' width = '225px' height = 'auto'</img>"
		]

		this.battle = [
			"<img src = 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/07/Pokemon-Lets-Go-Eevee-Moves-Featured-Photo.jpg' width = '225px' height = 'auto'</img>"
		]

		this.grammar = tracery.createGrammar(eeveeGrammar)
		this.grammar.addModifiers(baseEngModifiers)
	}

	respondTo(s) {
		if(s.toLowerCase().includes("hello")){
			let chance = Math.floor(Math.random()*this.eeveePics.length)
			this.post(this.grammar.flatten("#greeting#"))
			return this.eeveePics[chance]
		}

		if(s.toLowerCase().includes("feed razzberry")){
			if (this.razzBerries  <= 0)
				return "No more razz berries, buy more."
			this.razzBerries -= 1
			this.post(this.grammar.flatten("#eating#"))
			return this.eat[0]
		}


		if (s.toLowerCase().includes("buy berry")) {
			if (this.money  <= 0)
				return "No more money, sorry"

			this.razzBerries += 1
			this.money -= 300
			return this.grammar.flatten("You buy a razz berry for 300 PokeDollars, Eevee #randomaction#")
		}

		if(s.toLowerCase().includes("shake!")){
			this.post(this.grammar.flatten("#handshake#"))
			return this.shake[0]
		}

		if(s.toLowerCase().includes("high five!")){
			this.post(this.grammar.flatten("#highFive#"))
			return this.highFive[0]
		}

		if(s.toLowerCase().includes("battle")){
			this.post("You and Eevee find a strong trainer!")
			this.post(this.battle[0])
			let chance = Math.random()

			let finish = false

			let interval = setInterval(() => {
				this.battleTime -= Math.floor(Math.random() * 10)
				if (this.battleTime < 0) {
					clearInterval(interval)
					this.battleTime = 20
					if(chance < 0.3){
						if(this.money < 500){
							this.post("You don't have enough money! You give the rest of your money to the trainer and go into debt.")
							this.money -= 500
							this.post(this.lose[0])
						}
						this.post("You have unfortunately lost, and give 500 Pokedollars to the trainer")
						this.money -= 500
						this.post(this.lose[0])
					}

					else{
						this.post("You won! The trainer gives you 700 Pokedollars")
						this.money += 700;
						this.post(this.win[0])
					}
					finish = true
				}
				else {
					this.post(this.grammar.flatten("#fighting#"))
				}
			}, 500)


			this.post("You and Eevee get ready to fight!")
			return this.grammar.flatten("#greeting#")
		}


		return(this.grammar.flatten("#randomaction# #requests#"))

	}
}
