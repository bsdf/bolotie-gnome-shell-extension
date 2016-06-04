const Gio = imports.gi.Gio;

const IDBus = '\
<node> \
  <interface name="org.freedesktop.DBus"> \
    <method name="ListNames"> \
      <arg type="as" direction="out" /> \
    </method> \
    <signal name="NameOwnerChanged"> \
      <arg type="s" direction="out" /> \
      <arg type="s" direction="out" /> \
      <arg type="s" direction="out" /> \
    </signal> \
  </interface> \
</node>';

const IDBusProperties = '\
<node> \
  <interface name="org.freedesktop.DBus.Properties"> \
    <method name="Get"> \
      <arg type="s" direction="in" /> \
      <arg type="s" direction="in" /> \
      <arg type="v" direction="out" /> \
    </method> \
    <signal name="PropertiesChanged"> \
      <arg type="s" direction="out" /> \
      <arg type="a{sv}" direction="out" /> \
      <arg type="as" direction="out" /> \
    </signal> \
  </interface> \
</node>';

const IPlayer = '\
<node> \
  <interface name="org.mpris.MediaPlayer2.Player"> \
    <method name="PlayPause" /> \
    <method name="Pause" /> \
    <method name="Play" /> \
    <method name="Stop" /> \
    <method name="Next" /> \
    <method name="Previous" /> \
    <method name="SetPosition"> \
      <arg type="o" direction="in" /> \
      <arg type="x" direction="in" /> \
    </method> \
    <property name="CanPause" type="b" access="read" /> \
    <property name="CanSeek" type="b" access="read" /> \
    <property name="Metadata" type="a{sv}" access="read" /> \
    <property name="Volume" type="d" access="readwrite" /> \
    <property name="PlaybackStatus" type="s" access="read" /> \
    <property name="Position" type="x" access="read" /> \
    <signal name="Seeked"> \
      <arg type="x" direction="out" /> \
    </signal> \
  </interface> \
</node>';

function getDBus() {
  let proxy = Gio.DBusProxy.makeProxyWrapper(IDBus);
  return new proxy(Gio.DBus.session, 'org.freedesktop.DBus', '/');
}

function getDBusProperties(player, callback) {
  let proxy = Gio.DBusProxy.makeProxyWrapper(IDBusProperties);
  return new proxy(Gio.DBus.session,
                   'org.mpris.MediaPlayer2.' + player,
                   '/org/mpris/MediaPlayer2',
                   callback);
}

function getDBusPlayer(player) {
  let proxy = Gio.DBusProxy.makeProxyWrapper(IPlayer);
  return new proxy(Gio.DBus.session,
                   'org.mpris.MediaPlayer2.' + player,
                   '/org/mpris/MediaPlayer2');
}
