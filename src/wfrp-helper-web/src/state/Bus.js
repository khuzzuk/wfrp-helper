import Message from "./Message";
import {Collections} from "../util/Collections";

const loggingMessages = true;
const loggingReceiving = false;

export default class Bus {
    subscribers: Map<string, any => void[]> = new Map();

    send = (message: Message) => {
        const topic = `${message.type}_${message.domain}`;
        const topicSubscribers = this.subscribers.get(topic);

        if (topicSubscribers) {
            if (loggingMessages) {
                console.log(`received topic: ${topic}, subscribers: ${topicSubscribers.length}`)
            }
            topicSubscribers.forEach(sub => this.receiveMessage(message, sub));
        } else {
            console.warn('No subscribers for message: ' + topic);
        }
    };

    subscribe = (messageType: string, domain: string, subscriber: any => void): () => void => {
        const topic = `${messageType}_${domain}`;
        if (!this.subscribers.has(topic)) {
            this.subscribers.set(topic, []);
        }

        let topicSubscribers = this.subscribers.get(topic);
        topicSubscribers.push(subscriber);
        return () => Collections.removeElement(topicSubscribers, subscriber);
    };

    receiveMessage = (message: Message, subscriber: any => void) => {
        if (loggingReceiving) {
            console.log('subscriber receiving:');
            console.log(message);
            console.log(subscriber);
        }
        subscriber(message.content);
    };
}