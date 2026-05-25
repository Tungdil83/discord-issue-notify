# Notify Discord on New Issue GitHub Action

This action can be used to post a notification message to Discord channels whenever a new issue is opened.  
The message includes an embed with the issue title, URL, and body, and can optionally mention specific users or roles.

## Usage

This action requires a Discord webhook to be created. For reference on creating webhooks please have a look [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

After creating the webhook, copy the URL and set it as a secret in your repository settings.

If you want to be mentioned on Discord, simply provide user or role IDs as comma‑separated values in the configuration.

## Example

```yaml
name: Notify Discord on new Issue

# This workflow runs whenever an issue is opened
on:
  issues:
    types: ["opened"]

jobs:
  notify:
    name: Send Discord Notification
    runs-on: ubuntu-latest
    steps:
      - name: Notify Discord
        uses: Tungdil83/discord-issue-notify@latest
        with:
          webhook_url: ${{ secrets.DISCORD_WEBHOOK_URL }}
          mention_users: ""
          mention_roles: ""
```
