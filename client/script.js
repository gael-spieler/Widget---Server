// Global

let selected_channel;

// Functions

const format_date = function(date) {
	return new Date(date).getDate() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear() + ' ' + new Date(date).getHours() + ':' + new Date(date).getMinutes()
}

const create_message = function(message) {
	return '<div class="message" id="'+message._id+'"><span class="author">'+message.user.name+'</span><span>'+message.content+'</span><small>' + format_date(message.created) + '</small><div class="extras"><button class="like">Like</button><span class="score">'+message.likes+'</span><button class="delete">x</button></div></div>'
}

const load_messages = function(channel) {
	$('#messages').html('')
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/api/messages?channel=' + channel
	}).done(function(messages) {
		console.log(messages)
		// For each message from the API, create a .message and append to the UI
		messages.forEach(function(message) {
			$(create_message(message)).hide().fadeIn('slow').appendTo('#messages')
		})
	})
}

// Interaction

$('#new_message :text').on('keyup', function(e) {
	if (e.which == 13) {
		// $((create_message($(this).val(), 'Tony', new Date()))).hide().fadeIn('slow').appendTo('#messages')

		let data = JSON.stringify({
			content: $(this).val(),
			channel: selected_channel,
			user: '5cb6eef1faa4c004121d69d0'
		})

		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/api/messages',
			data: data,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json'
		}).done(function(message) {
			// If everhing goes fine!
			$((create_message(message))).hide().fadeIn('slow').appendTo('#messages')
			console.log('message', message);
		}).fail(function(xhr, status, err) {
			// Handle error by adding class to message
			// console.log({xhr, status, err});
			alert('Sorry, message not sent. Please try again later.')
			// $('#messages .message:last-child').addClass('error')
		})

		$(this).val('')
	}
});

$(document).on('click', '.delete', function() {
	$(this).parent().parent().detach()
})

$(document).on('click', '.like', function() {
	let score = $(this).next('.score').text()
	score ++
	$(this).next('.score').text(score)
	let id = $(this).parent().parent().attr('id')
	data = JSON.stringify({
		likes: score
	})
	$.ajax({
		method: 'PATCH',
		url: 'http://localhost:3000/api/messages/' + id,
		data: data,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	})
})

$(document).on('click', '#sidebar ul li', function() {
	$('#sidebar ul li').removeClass('active')
	$(this).addClass('active')

	let id = $(this).attr('id');
	selected_channel = id;
	console.log(id);

	let name = $(this).attr('data-name');
	console.log(name);
	$('#messages').append(`<h2>#${name}</h2>`)

	load_messages(id)

})

// Ajax

// This Ajax call starts as soon as this .js file is loaded onto the html file
$.ajax({
	method: 'GET',
	url: 'http://localhost:3000/api/channels'
}).done(function(channels) {
	console.log(channels);
	// The rest of the function is initiated when the DOM is ready
	$(document).ready(function() {
		// For each channel from the API, create an <li></li> and add to the sidebar
		channels.forEach(function(channel) {
			$('#sidebar ul').append(`<li id="${channel._id}" data-name="${channel.name}"># ${channel.name}</li>`)
		});
		// Add the class 'active' to the first element in the sidebar list
		$('#sidebar ul li:first-child').addClass('active');
		// Get messages from the API using the id of the first channel
		selected_channel = $('#sidebar ul li:first-child').attr('id')
		load_messages(selected_channel)
	})
})

// Different ways of passing params to functions

// let user_create = function(a, b, c, d) {
// 	name = a
// 	age = b
// 	address = c
// 	gender = d
// }
//
// user_create('John', 50, '! Main Street', 'male')
//
// // OR
//
// let user_create = function(user) {
// 	name = user.name
// 	age = user.age
// 	address = user.address
// 	gender = user.gender
// }
//
// user_create({
// 	name: 'John',
// 	age: 50,
// 	address: '1 Main Street',
// 	gender: 'male'
// })
