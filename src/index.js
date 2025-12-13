const core = require('@actions/core');
const github = require('@actions/github');

try {
  const webhookUrl = core.getInput('webhook_url', { required: true });
  const mentionUsers = core.getInput('mention_users') || "";
  const mentionRoles = core.getInput('mention_roles') || "";

  const issue = github.context.payload.issue;
  if (!issue) {
    core.setFailed("No issue context found");
    process.exit(1);
  }

  let mentions = "";
  if (mentionUsers) {
    mentionUsers.split(",").forEach(id => {
      if (id.trim()) mentions += `<@${id.trim()}> `;
    });
  }
  if (mentionRoles) {
    mentionRoles.split(",").forEach(id => {
      if (id.trim()) mentions += `<@&${id.trim()}> `;
    });
  }

  const embed = {
    title: issue.title,
    url: issue.html_url,
    description: issue.body || "",
    color: 16753920
  };

  const payload = {
    content: `${mentions} New GitHub Issue created!`,
    embeds: [embed],
    allowed_mentions: {
      users: mentionUsers ? mentionUsers.split(",").map(id => id.trim()) : [],
      roles: mentionRoles ? mentionRoles.split(",").map(id => id.trim()) : [],
      parse: []
    }
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(res => {
    if (!res.ok) {
      core.setFailed(`Discord webhook failed: ${res.status} ${res.statusText}`);
    } else {
      core.info("Notification sent to Discord successfully.");
    }
  }).catch(err => core.setFailed(err.message));

} catch (error) {
  core.setFailed(error.message);
}
