

docker build -t notification-server .

eg:
docker run -p 3000:3000 --env ALLOWED_ORIGIN=??? --env POSTMARK_KEY=??? --restart=on-failure notification-server
