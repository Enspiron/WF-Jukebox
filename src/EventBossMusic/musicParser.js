
function musicParser(props, type, event = "Event Music") {
    const source = "https://wfjukebox.b-cdn.net/music/event/";
    const bosses = ["D-Dragon", "Spirit Beast", "Steam Bot", "Empress", "Raid Event", "Other"]

    const music = require('./music.json');
    function buildURL(type, event, song) {
        return source + event + "/" +  type + "/" + song;
    }

    const displayEvents = {
        eventName: props(),
        event: music.events.find(e => e.name === props),
        showEvent() {
            console.log(this.eventName);
        },
        showSongs() {
            const eventFound = music.events.find(e => e.name === this.eventName);
            return(eventFound.songs);
        },
        battle() {
            return(this.event.songs.battle)
        },
        story() {
            return(this.event.songs.story)
        },
        system() {
            return(this.event.songs.system)
        },
        buildURL(index, type) {
            try {
                const song = this.event.songs[type][index];
                return source + this.eventName + "/" +  type + "/" + song;
            } catch (error) {
                console.log(error);
            }
        },



    }

    function isBossMusic() {
        if(bosses.includes(props())) {
            return true;
        } else {
            return false;
        }
    }

    function fetchEvent(eventName = props()) {
        console.log(event, type)
        
        console.log("type of song: ", eventName)
        if(isBossMusic()) {
            try {
                const bossfound = music[eventName]
                const foundBoss = bossfound.find(e => e.element === type);
                console.log(foundBoss)

            } catch (error) {
                return ["no songs"]
            }
        }


        
        if(event === "Main Story") {
            try {
            console.log("searching for ",eventName)
            const eventFound = music.world.find(e => e.name === eventName);
            console.log("found songs: ",eventFound.songs)
            if(type === "Battle") {
                return eventFound.songs.battle
            }else if(type === "Story") {
                return eventFound.songs.story
            } else {
                return["if you are in mains story select battle or story"]
            }

            }catch(error) {
                return["no songs"]
            }
        }

        if(event === "Event Music") {
        try {
            // Assuming music is your JSON data
            console.log(eventName);

            // Accessing the "events" array from the "music" object
            const eventFound = music.events.find(e => e.name === eventName);
            console.log(eventFound.songs);

            const typeLowerCase = type.toLowerCase();
            if (typeLowerCase === "battle" && eventFound.songs.battle != null) {
                return eventFound.songs.battle;
            } else if (typeLowerCase === "story" && eventFound.songs.story != null) {
                return eventFound.songs.story;
            } else if (typeLowerCase === "system" && eventFound.songs.system != null) {
                return eventFound.songs.system;
            } else {
                return ["no events"];
            }
        } catch (error) {
            return ["no events"];
        }
        }
    }

    function fetchBoss(boss, element) {
        const bossFound = music[boss]
        const foundBoss = bossFound.find(e => e.element === element);
        console.log(foundBoss)
        return foundBoss;
    }

    function audioPlayer() {
        return(
            <div>
                <audio controls>
                    <source src={displayEvents.buildURL(0, "battle")} type="audio/mpeg" />
                </audio>
            </div>
        )
    }

    return(
        fetchEvent()
    )


}
export default musicParser;