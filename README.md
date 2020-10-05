# Dockerized Email Notification Server for Postmark

A dockerized Express server for sending notication email templates via Postmark's transactional email service.

## Building a container

Build your container:
```
docker build -t notification-server .
```

Pass your applition variables via an entry in the .env file or using docker's --env flag
- POSTMARK_KEY (your Postmark api key)
- ALLOWED_ORIGIN (allowed origin for your requests)

Run your container:
```
docker run -p 3000:3000 --env ALLOWED_ORIGIN=??? --env POSTMARK_KEY=??? --restart=on-failure notification-server
```

## Using the container 

1. Trigger email notifications via a POST request to your server.
2. All requests must contain
- a **template-id** header (id of the Postmark template id which will be sent)
- a **from-email** header (the email address to send the notification email from)
3. The email address to send the notifcation to can be provided as a header (**to-email**), or in the body of the POST request (**email**). The notification email can be sent to multiple addresses using a comma-separated list


## Example
```
fetch('https://notifications.mysite.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Template-Id': '18611946',
        'From-Email': 'no-reply@mysite.com',
        'To-Email': 'info@mysite.com,tim@mysite.com,lucia@mysite.com'
    },
    body: JSON.stringify({
        firstName: "Sam",
        lastName: "Flowers",
        email: "sam.flowers@gmail.com",
    }),
  });
```