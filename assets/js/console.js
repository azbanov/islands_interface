function new_channel(subtopic, screen_name) {
	return socket.channel("game:" + subtopic, {screen_name: screen_name});
}

function join(channel) {
	channel.join()
		.receive("ok", response => {
			console.log("Joined successfully!", response)
		})
		.receive("error", response => {
			console.log("Unable to join", response)
		})
}

function leave(channel) {
	channel.leave()
		.receive("ok", response => {
			console.log("Left successfully", response)
		})
		.receive("error", response => {
			console.log("Unable ot leave", response)
		})
}

function say_hello(channel, greeting) {
	channel.push("hello", {"message": greeting})
		.receive("ok", response => {
			console.log("Hello", response.message)
		})
		.receive("error", response => {
			console.log("Unable to say hello to the channel.", response.message)
		})
}

function listening(game_channel) {
    game_channel.on("said_hello", response => {
        console.log("Returned Greeting", response.message)
    })
}

function new_game(channel) {
    channel.push("new_game")
        .receive("ok", response => {
            console.log("New Game!", response)
        })
        .receive("error", response => {
            console.log("Unable to start a new game.", response)
        })
}

function add_player(channel, player) {
    channel.push("add_player", player)
        .receive("error", response => {
            console.log("Unable to add new player:" + player, response)
        })
}

function player_added(game_channel) {
    game_channel.on("player_added", response => {
        console.log("Player Added", response)
    })
}