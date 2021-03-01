import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';

class UserAdd extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member: GuildMember) {
        member.createDM().then((dm) => {
            dm.send("")
        })
    }
}

export default UserAdd;