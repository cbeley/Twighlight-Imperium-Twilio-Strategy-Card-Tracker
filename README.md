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
TIServer [info] TI Server running on port 9000 +0ms
TIServer [info] TI Server running extenerally on https://f13416f7.ngrok.io +2ms
TIServer [info] TI Server twilio handler at https://f13416f7.ngrok.io/twilio-handler +1ms
```

The server will be externaly proxied through ngrok so that the outside world can access your locally
running instance.  In order to have Twilio talk with your newly running service, you'll have to 
update the 'Request URL' for the Twilio number you wish to use at https://www.twilio.com/user/account/messaging/phone-numbers.
