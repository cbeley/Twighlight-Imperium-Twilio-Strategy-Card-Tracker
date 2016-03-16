# Twighlight Imperium Strategy Card Tracker
Keep track of who is done and what strategy card is currently in play for Twighlight Imperium via text!

## Why?
One of the bigger problems of large games of Twilight Imperium is keeping people on track.  At least for
our group, we have noticed that Strategy Cards are a major time sync since people will forget what is currently
is in play or not realize that everyone has finished their secondary ability on the strategy card.  This project
hopes to solve that by allowing all players to keep up to date on the current strategy card progress completely via
text using the Twilio API.

## Usage
### Twilio Account
In order to run this, you need a Twilio account to be able to have people send and receive texts from the game
server.  You can get a free Twilio trial account at https://www.twilio.com/try-twilio.

Note that if you are using a Twilio trial account, unfortunately all numbers you wish to use will have to be
manually added via the Twilio Admin interface at https://www.twilio.com/user/account/phone-numbers/verified.

### Update config.js
You'll need to update config.js with your Twilio accountSid and authToken in order for text commands to work.

### Build
Before running this, you'll have to set up your enviornment and build all client-side JS.

```
npm install
npm run build
```

### Run
```
npm run start
```

Upon running that command, you'll see something like the following:

```
TIServer [info] TI Server running on port 8000 +0ms
TIServer [info] TI Server running extenerally on https://f13416f7.ngrok.io +2ms
TIServer [info] TI Server twilio handler at https://f13416f7.ngrok.io/twilio-handler +1ms
```

The server will be externaly proxied through ngrok so that the outside world can access your locally
running instance.  In order to have Twilio talk with your newly running service, you'll have to 
update the 'Request URL' for the Twilio number you wish to use at https://www.twilio.com/user/account/messaging/phone-numbers.

### Use
First, begin a new game by going to http://localhost:8000/game/whateverGameNameYouWant in your browser.
This will automatically create a new game for you with the custom name you chose.

To join the game, have players text the following to the number on the webpage:

```
join whateverGameNameYouWant Your Name Here
```

Players an initiate a card by texting:

```
start Trade
```

Where trade can be whatever you want.  All players will be then notified and the web UI will automatically update.

When a player is done doing whatever they need to do with the strategy card, they simply text:

```
done
```

Once all players are done, all players will be notified that the strategy card is completed.  The last person to 
send done will also be sent to all other players so that they can be shamed for being too slow. :-P

## Screenshots
![sms](docs/imgs/sms.png?raw=true)
![No Active Card](docs/imgs/web-no-card.png?raw=true)
![Active Card](docs/imgs/web-active-card.png?raw=true)

## TODO/Limitations
* Send users the text of the card
* Only allow valid strategy cards
* Allow users to place an automated call or text to all players currently not done.
* Better UI
* General code clean-up
* Tests

## License
This is free and unencumbered public domain software. For more information, see unlicense.org or the accompanying UNLICENSE file.