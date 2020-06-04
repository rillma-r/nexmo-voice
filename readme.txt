### This is an implementation of Certification Project using Voice API. ###

This repo contains the code for https://vonage-workshop.nexmodev.com/voice/certification/ on using the Voice API.

### GitHub Repository ###
You can download your own version from:
https://github.com/rillma-r/nexmo-voice.git

### How download and run the project ###
You can use below commands:
$$\...> git clone https://github.com/rillma-r/nexmo-voice.git
$$\...> cd nexmo-voice
$$\...\nexmo-voice> npm install

### Initial Configuration ###
Edit the '.env' with your data from https:\\dashboard.nexmo.com
* ` YOUR_NUMBER`: A primary number
* ` VIRTUAL_NUMBER:` A second phone number

### Start the application ###
In order to star the application, run below command:

$$\...\nexmo-voice> npm start

Start the ngrok to make the webhooks available publicly by running:
 $$\...\nexmo-vocie> ngrok http 3000

### Configure the new App on Nexmo Dashboard ###

Login into your (https://dashboard.nexmo.com) and create a new application.

Select Voice and add the following webhooks:

* Events: https://ngrok-generated-url/webhooks/events
* Answer: https://ngrok-generated-url/webhooks/answer

Save the application and link a virtual number with it.
