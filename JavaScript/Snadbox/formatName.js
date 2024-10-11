function formatNamePart(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
let userName = "";
function formatName(userName) {
  if (!userName) {
    return "";
  }
  let nameParts = userName.trim().replace(/\s\s+/g, " ").split(" ");
  let formattedName = "";
  for (namePart of nameParts) {
    formattedName += formatNamePart(namePart);
    formattedName += " ";
  }
  formattedName = formattedName.trim()
  console.log(formattedName);
  

//   context.session.BotUserSession.user.name = formattedName;
//   context.session.BotUserSession.user.firstName = formattedParts[0];
//   context.session.BotUserSession.user.lastName = formattedParts.slice(1).join(" ");
}

formatName(" iaNn          bezerra         DE       oliveIra ")