const Lang = imports.lang;
const Gio = imports.gi.Gio;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const DBus = Me.imports.dbus;

const Player = new Lang.Class({
  Name: 'Player',

  _init: function(playername, bowlet) {
    this.bowlet = bowlet;

    // PropertiesChanged proxy
    DBus.getDBusProperties(playername, function(proxy) {
      this.props = proxy;
      this.props.connectSignal('PropertiesChanged', this._handlePropertiesChanged.bind(this));
    }.bind(this));

    // player proxy to get initial status
    this.player = DBus.getDBusPlayer(playername);
    this._parseMetadata(this.player.Metadata);
  },

  _handlePropertiesChanged: function(proxy, sender, [iface, props]) {
    if (props.Metadata) {
      let metadata = props.Metadata.deep_unpack();
      this._parseMetadata(metadata);
    }
  },

  _parseMetadata: function(metadata) {
    // if (this.player.PlaybackStatus === 'Playing') {
      let artist = metadata['xesam:artist'].deep_unpack();
      let song = metadata['xesam:title'].deep_unpack();
      this.bowlet.set_song(artist[0], song);
    // }
  },
});

