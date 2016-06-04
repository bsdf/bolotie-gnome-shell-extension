const Main = imports.ui.main;
const Lang = imports.lang;
const St = imports.gi.St;

const BoloTie = new Lang.Class({
  Name: 'BoloTie',

  _init: function() {
    this.actor = new St.BoxLayout({ style_class: 'bolo-tray' });
    this._song = new St.Label({ text: 'Still Life in Mobile Homes', style_class: 'bolo-song' });
    this._artist = new St.Label({ text: 'Japan', style_class: 'bolo-artist' });

    this._icon = new St.Icon({ style_class: 'bolo-icon' });
    this._corner = new St.Icon({ style_class: 'bolo-corner' });

    this.actor.add(this._icon);
    this.actor.add(this._song);
    this.actor.add(this._artist);
    this.actor.add(this._corner);

    let monitor = Main.layoutManager.primaryMonitor;
    //this.actor.set_position(monitor.x, monitor.y + monitor.height - this.actor.height);
    this.actor.set_position(monitor.x, monitor.y + monitor.height - 22);

    // Main.layoutManager.addChrome(this.actor);
    // Main.uiGroup.set_child_below_sibling(this.actor, Main.layoutManager.modalDialogGroup);
    // Main.uiGroup.add_actor(this.actor);
  },

  set_song: function(artist, song) {
    this._artist.text = artist;
    this._song.text = song;
  },
});
