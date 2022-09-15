const socket = io('localhost:3000')

let user = '';

socket.on('update_messages', (messages) => {

  updateMessagesOnScreen(messages)

})


function updateMessagesOnScreen(messages) {
  const div_messages = document.getElementById('messages')
  // ou const div_messages = document.querySelector('#messages')
  let list_messages = '<ul>'
  messages.forEach((message) => {
    list_messages += `<li><strong>${message.user}:</strong> ${message.msg}</li>`
  })
  list_messages += '</ul>'

  div_messages.innerHTML = list_messages
}

document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.querySelector('#user_form')
  userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    user = document.forms['user_form_name']['user_input_name'].value
    if(user) {
      userForm.parentNode.removeChild(userForm)
    } else {
      alert('Digite o nome de usuário')
      userErrorMessage = document.querySelector('#user_error_message')
      userErrorMessage.innerText = "Digite o nome de usuário para enviar mensagem"
    }
  })

  const form = document.querySelector('#message_form')
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(!user) {
      alert('Defina um usuário para enviar mensagem')
      return
    }

    const message = document.forms['message_form_name']['message_input_name'].value
    new_message(message)
  })
})

function new_message(message) {
  socket.emit('new_message', {user: user, msg: message})
}