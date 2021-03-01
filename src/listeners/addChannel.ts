import { Listener } from "discord-akairo";


class ChannelCreate extends Listener {
    constructor() {
        super('channelCreated', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    exec() {
        console.log('channel created !');
    }
}

export default ChannelCreate;