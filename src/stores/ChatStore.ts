import { observable, action, toJS }  from 'mobx';
import chatService from '../services/chatService';
import { Message, ChatThread } from '../model/model';

function scrollIntoLastMessage() {
    setImmediate(()=> {
        const lastMessage = document.querySelector('.chat-messages > div:last-child');
        if (lastMessage) {
            lastMessage.scrollIntoView();
        }
    });
}

class ChatStore {
    @observable
    dummy = 'dummy!';

    @observable
    chatThreads = [];

    constructor() {
        this.chatThreads = chatService.getInitialChatThreads();
    }

    @observable 
    activeChatThread: ChatThread = null;

    @action.bound
    activateChatThread(cThread: ChatThread) {
        this.activeChatThread = cThread;
    }

    @action.bound
    sendTimeMessage() {
        if (!this.activeChatThread) {
            return;
        }

        const message = new Message();
        message.content = (new Date()).toISOString();
        message.isFromMe = true;

        this.activeChatThread.messages.push(message);
        this.activeChatThread.lastUpdate = new Date();

        const wasActiveChatThread = this.activeChatThread;

        scrollIntoLastMessage();

        setTimeout(() => {
            const backMessage = new Message();
            backMessage.content = message.content;
            backMessage.isFromMe = false;
    
            wasActiveChatThread.messages.push(backMessage);
            wasActiveChatThread.lastUpdate = new Date();

            scrollIntoLastMessage();
                
        }, 1000);

    }
}

const chatStore = new ChatStore();

export default chatStore;