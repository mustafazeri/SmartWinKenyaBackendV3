const Sound = {

	enabled: true,

	play(name){

		if(!this.enabled) return;

		const audio = new Audio("sounds/" + name + ".mp3");

		audio.volume = 0.8;

		audio.play();

	},

	toggle(){

		this.enabled = !this.enabled;

		localStorage.setItem("soundEnabled", this.enabled);

	},

	load(){

		const value = localStorage.getItem("soundEnabled");

		if(value !== null){

			this.enabled = value === "true";

		}

	}

};

Sound.load();
