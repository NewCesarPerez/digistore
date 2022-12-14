const socket = io()
const elapseTime = Date.now()
const today = new Date(elapseTime)
const date= today.toLocaleDateString()
const time = new Date()
const localTime=time.toLocaleTimeString('it-IT')

const formMessage = document.querySelector('#formMessage')
//const userEmailInput = document.querySelector('#userEmailInput')
const messageInput = document.querySelector('#messageInput')
const messagePool=document.querySelector('#messagePool')


function sendMessage(){
    //const email=userEmailInput.value
    //console.log('email' + email)
    const message=messageInput.value
    const date = new Date().toLocaleString()
    socket.emit('client:message',{date, message })
}


function renderMessages(messagesArray){
    try {
        const html = messagesArray.map(messageInfo => {
            
            return(`<div>
                <strong style="color: blue;" >${messageInfo.email}</strong>[
                <span style="color: brown;">${messageInfo.date}</span>]:
                <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`)
        }).join(" ");

        messagePool.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}
formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = ""
})

socket.on('server:message', messages=>renderMessages(messages))
socket.on('server:products', products => {
    renderProducts(products)
})