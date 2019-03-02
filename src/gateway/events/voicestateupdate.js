"use strict";

/**
 * Emitted once a Member joins a VoiceChannel
 * @event Client.VOICE_STATE_UPDATE
 */

class Ready {
  constructor() {}

  emit(shard, packet) {
    let guild = shard.client.guilds.get(packet.d.guild_id);
    let OldVoiceState = guild.voiceStates.get(packet.d.user_id);

    guild.voiceStates.set(packet.d.user_id, packet.d);

    if (!OldVoiceState || !OldVoiceState.channel_id && packet.d.channel_id && shard.client.channels.has(packet.d.channel_id)) {
      return shard.client.emit('VOICE_CHANNEL_JOIN', shard.client.users.get(packet.d.user_id), shard.client.channels.get(packet.d.channel_id));
    } else if (OldVoiceState.channel_id && !packet.d.channel_id && shard.client.channels.has(OldVoiceState.channel_id)) {
      return shard.client.emit('VOICE_CHANNEL_LEAVE', shard.client.users.get(packet.d.user_id), shard.client.channels.get(OldVoiceState.channel_id));
    } else if (OldVoiceState.channel_id !== packet.d.channel_id && shard.client.channels.has(OldVoiceState.channel_id) && shard.client.channels.has(packet.d.channel_id)) {
      return shard.client.emit('VOICE_CHANNEL_MOVE', shard.client.users.get(packet.d.user_id), shard.client.channels.get(OldVoiceState.channel_id), shard.client.channels.get(packet.d.channel_id));
    }
  }
};

module.exports = Ready;