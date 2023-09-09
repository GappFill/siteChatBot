//class Chatbox {
//    constructor() {
//       this.args = {
//        openButton: document.querySelector( selectors:'.chatbox__button'),
//        chatBox: document.querySelector( selectors:'.chatbox__support'),
//        sendButton: document.querySelector( selectors:'.send__button'),
//       }
//
//
//        this.state = false;
//        this.messages = [];
//    }
//    display() {
//        const {openButton, chatBox, sendButton} = this.args;
//
//        openButton.addEventListener(type:'click', listener:() => this.toggleState(chatBox))
//
//        sendButton.addEventListener(type:'click', listener: () => this.onSendButton(chatBox))
//
//        const node = chatBox.querySelector(selectors:'input');
//        node.addEventListener( type:"keyup", listener:({key:string}) => {
//
//            if (key === "Enter") {
//                this.onSendButton(chatBox)
//            }
//
//        })
//    }
//
//    toggleState(chatbox) {
//        this.state = !this.state;
//
//
//        // show or hides the box
//        if(this.state) {
//            chatbox.classList.add('chatbox--active')
//        } else {
//            chatbox.classList.remove(tokens:'chatbox--active')
//        }
//    }
//
//
//    onSendButton(chatBox) {
//        yar textField = chatbox.querySelector('input');
//        let text1 = textField.value
//        if (text1 === "") {
//            return;
//        }
//
//        let msg1 = { name: "User", message: text1 }
//        this.messages.push(msg1);
//
//        // 'http://127.0.0.1:5000/predict
//         fetch( input: $SCRIPT_ROOT + '/predict', init: {
//            method: 'POST',
//            body: JSON.stringify( value:{ message: text1 }),
//            mode: 'cors',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            }, Promise<Response>
//            .then(r => r.json()) Promise<any>
//            .then( r => {
//
//                let msg2 = { name: "Sam", message: r.answer };
//                this.messages.push(msg2);
//                this.updateChatText(chatbox)
//                textField.value = ''
//         }).catch((error) => {
//              console.error('Error:', error)
//              this.updateChatText(chatbox)
//              textField.value = ''
//
//            });
//    }
//
//    updateChatText(chatbox) {
//        var html= '';
//        this.message.slice().reverse().forEach(function(item, index:number) {
//            if (item.name === 'Sam')
//            {
//                html += '<div class = "messages__item messages__item--visitor">' + item.message + '</div>'
//            }
//            else
//            {
//                html += '<div class="messages__item messages__item--operator">' + item.message + '/div'
//            }
//
//          });
//
//        const chatmessage = chatbox.querySelector('.chatbox__messsages');
//        chatmessage.innerHTML = html;
//    }
//
//}
//
//const chatbox = nem Chatbox();
//chatbox.display();

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
        };

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({ key }) => {
            if (key === 'Enter') {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatBox) {
        this.state = !this.state;

        // Show or hide the box
        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatBox) {
        const textField = chatBox.querySelector('input');
        const text = textField.value.trim();

        if (text === '') {
            return;
        }

        const msg = { name: 'User', message: text };
        this.messages.push(msg);

        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((r) => r.json())
        .then((response) => {
            const msg2 = { name: 'Sam', message: response.answer };
            this.messages.push(msg2);
            this.updateChatText(chatBox);
            textField.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatBox);
            textField.value = '';
        });
    }

    updateChatText(chatBox) {
        let html = '';
        this.messages.slice().reverse().forEach((item) => {
            const messageClass = item.name === 'Sam' ? 'messages__item messages__item--visitor' : 'messages__item messages__item--operator';
            html += `<div class="${messageClass}">${item.message}</div>`;
        });

        const chatMessage = chatBox.querySelector('.chatbox__messages');
        chatMessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
