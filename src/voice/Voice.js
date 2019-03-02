"use strict";

let { EventEmitter } = require('events');
let Websocket = require('ws');

class Voice extends EventEmitter {
  constructor(shard, options = {}) {
    super();
    Object.defineProperty(this, 'client', { value: shard.client });
    Object.defineProperty(this, 'shard', { value: shard });

    this.options = options;
  }

  connect() {
    return this.shard.send({
      op: 4,
      d: {
        guild_id: this.options.guildID,
        channel_id: this.options.channelID,
        self_mute: this.options.muted,
        self_deaf: this.options.deaf
      }
    });
  }
};

module.exports = Voice;