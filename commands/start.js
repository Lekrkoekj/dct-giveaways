const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:cross:682985295385329688>｜You need to be an **Admin** to start giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send('<:cross:682985295385329688>｜You have to mention a valid channel! \n **Command usage:** `ga!start <channel_mention> <duration> <winners> <prize>`');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('<:cross:682985295385329688>｜You have to specify a valid duration! \n **Command usage:** `ga!start <channel_mention> <duration> <winners> <prize>`');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('<:cross:682985295385329688>｜You have to specify a valid number of winners! \n **Command usage:** `ga!start <channel_mention> <duration> <winners> <prize>`');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send('<:cross:682985295385329688>｜You have to specify a valid prize! \n **Command usage:** `ga!start <channel_mention> <duration> <winners> <prize>`');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        embedColor: "#DDCD69",
        embedColorEnd: "#E17641",
        reaction: "🎉",
        thumbnail: "https://cdn.discordapp.com/embed/avatars/0.png",
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"<:dctgiveaway:732340863497404457> **GIVEAWAY** <:dctgiveaway:732340863497404457>",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"<:dctgiveaway:732340863497404457> **GIVEAWAY ENDED** <:dctgiveaway:732340863497404457>",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`<:check:682985280973570148>｜Giveaway started in ${giveawayChannel}!`);

};