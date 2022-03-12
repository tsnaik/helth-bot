# helth-bot

## Setting up env

To use the [Telegram Bot API](https://core.telegram.org/bots/api), 
you first have to [get a bot account](https://core.telegram.org/bots) 
by [chatting with BotFather](https://core.telegram.org/bots#6-botfather).

BotFather will give you a *token*, something like `123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ`.

Put it in a file named `.env`:

```
BOT_TOKEN=123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ
```

## Installing required modules

```
yarn install
```

## Running bot server locally

```
yarn start
```

## Linting js source files

```
yarn lint
```
...and fix (some of the) lint errors

```
yarn lint-fix
```