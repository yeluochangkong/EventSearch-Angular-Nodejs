    
module.exports = {
    EventObj: function (date, eventName, category, venueInfo, id, fav){
        this.date = date;
        this.eventName = eventName;
        this.category = category;
        this.venueInfo = venueInfo;
        this.id = id;
        this.fav = fav;
        },
    Artist: function(name, followers, popularity, checkAt) {
        this.name = name; 
        this.followers = followers;
        this.popularity = popularity;
        this.checkAt = checkAt;
    },
    EventDetail: function(artist, venue, time, category, priceLow, priceHigh, ticketStatus, buyTicketAt, seatMap, eventId) {
        this.artist = artist; 
        this.venue = venue; 
        this.time = time; 
        this.category = category; 
        this.priceLow = priceLow; 
        this.priceHigh = priceHigh;
        this.ticketStatus = ticketStatus; 
        this.buyTicketAt = buyTicketAt; 
        this.seatMap = seatMap; 
        this.eventId = eventId;
    },
    UpComingEvent: function(displayName, uri, artist, time, type) {
        this.displayName = displayName;
        this.uri = uri;
        this.artist = artist;
        this.time = time;
        this.type = type;
    },
    Venue: function(address, city, phoneNumber, openHours, generalRule, childRule, lat, lng, venueName) {
        this.address = address; 
        this.city = city;
        this.phoneNumber = phoneNumber; 
        this.openHours = openHours; 
        this.generalRule = generalRule; 
        this.childRule = childRule; 
        this.lat = lat;
        this.lng = lng;
        this.venueName = venueName;
    }

}