import React from 'react';
import chatStore from './stores/ChatStore';
import { observer } from 'mobx-react';
import { Message, ChatThread } from './model/model';

@observer
export default class ChatMain extends React.Component {
    
    componentDidMount() {

    }

    render() {
        const { chatThreads, activateChatThread, activeChatThread, sendTimeMessage } = chatStore;

        return (
            <div className='chat-main'>

                <div>
                    { chatThreads.slice().sort((c1, c2) => c2.lastUpdate - c1.lastUpdate).map((c:ChatThread) => (
                        <div className={'contact' + (c.contact.id === activeChatThread?.contact.id ? ' selected' : '')} key={c.contact.id} onClick={() => activateChatThread(c)}>
                            { c.contact.name }
                            <div className='summary'>
                                {c.messages[c.messages.length-1]?.content}
                            </div>
                        </div>
                    )) }
                </div>

                <div>
                    <div className='chat-messages'>
                        { activeChatThread?.contact.name }
                        { activeChatThread?.messages.map((m: Message, idx) => (
                            <div key={idx} className={'message ' + (m.isFromMe ? 'from-me' : 'not-from-me')}>
                                <div>
                                    {m.content}
                                </div>
                            </div>
                        )) }
                    </div>

                    <div className='message-send-box'>
                        <input type='text' ></input>
                        <button onClick={() => sendTimeMessage()}>Send Message</button>
                    </div>
                </div>
            </div>
        );

    }
}