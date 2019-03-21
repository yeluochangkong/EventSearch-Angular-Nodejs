export class UpComingEvent {
    displayName: string;
    uri: string;
    artist: string;
    time: string;
    type: string;
    constructor(dispalyName, uri, artist, time, type) {
        this.displayName = dispalyName;
        this.uri = uri;
        this.artist = artist;
        this.time = time;
        this.type = type;
    }
    setDisplayName (name) {
        this.displayName = name;
    }
    setUri (uri) {
        this.uri = uri;
    }
    setArtist (artist) {
        this.artist = artist;
    }
    setTime (time) {
        this.time = time;
    }
    setType (type) {
        this.type = type;
    }
}
