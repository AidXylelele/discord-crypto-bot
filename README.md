# discord-crypto-bot

This bot helps the user to get up-to-date information about the cryptocurrency.

## Pre-requisites

To run this project, you'll need to set up certain environment variables. You can do this by creating a `.env` file at the root of your project directory.

## Configuration

The project requires the following environment variables to be set in the `.env` file:

- `TOKEN`: This is the Discord bot token. You'll get this from your Discord bot page.
- `APIKEY`: This is the Binance API key. You'll get this from your Binance account page.
- `APISECRET`: This is the Binance API secret. This will also be provided by Binance.

Here's an example of what your `.env` file should look like:

```bash
TOKEN=your_discord_token
APIKEY=your_binance_api_key
APISECRET=your_binance_api_secret
```

Replace your_discord_token, your_binance_api_key, and your_binance_api_secret with the respective values obtained from Discord and Binance.

Note: Never commit your .env file or any files containing your secrets to your repository. Always add .env to your .gitignore file.

## Run

To run this project run this command:

```bash
 docker-compose up --build
```
