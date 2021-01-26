import { observable, action, toJS }  from 'mobx';

export class ChatThread {
    contact: any;
    lastUpdate: Date;
    @observable
    messages: Message[]

}

export class Message {
    content: string;
    isFromMe: boolean;
}
