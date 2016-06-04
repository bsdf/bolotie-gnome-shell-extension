const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const BoloTie = Me.imports.bolotie.BoloTie;
const Player = Me.imports.player.Player;
const DBus = Me.imports.dbus;

const regex = /^org\.mpris\.MediaPlayer2.([a-zA-Z0-9]+)$/;

let bolo;
let players = {};

function init() {
  // create bowlet
  bolo = new BoloTie();

  // setup dbus query to get active players
  let dbus = DBus.getDBus();
  dbus.ListNamesRemote(_handleNamesResponse);
}

function _handleNamesResponse(response) {
  let names = response[0];
  if (names) {
    names.forEach(function(name) {
      let matches = name.match(regex);
      if (matches) {
        let playername = matches[1];
        players[playername] = new Player(playername, bolo);
      }
    });
  }
}

function enable() {
  Main.uiGroup.add_actor(bolo.actor);
}

function disable() {
  Main.uiGroup.remove_child(bolo.actor);
}
