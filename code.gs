
const postRichHTMLToTelegram = () => {
  // Chat Id of the Telegram user, group or channel
  const chatId = 'your chat id from the code above';
  const form = FormApp.getActiveForm();
  const formResponses = form.getResponses();
  Logger.log('form id = ' + form.getId() + ', length = ' + formResponses.length);
  const formResponse = formResponses[formResponses.length-1];
  const itemResponses = formResponse.getItemResponses()


  // Rich text with HTML tags and entities
  const message = `<b> Incident Reporting - ${itemResponses[3].getResponse()} </b>
====== 
<b> ${itemResponses[0].getItem().getTitle()} </b> : ${itemResponses[0].getResponse()}  
<b> ${itemResponses[1].getItem().getTitle()} </b> : ${itemResponses[1].getResponse()} 
<b> ${itemResponses[2].getItem().getTitle()} </b> : ${itemResponses[2].getResponse()} 
<b> ${itemResponses[3].getItem().getTitle()} </b> : ${itemResponses[3].getResponse()}  
<b> ${itemResponses[4].getItem().getTitle()} </b> : ${itemResponses[4].getResponse()} 
<b> ${itemResponses[5].getItem().getTitle()} </b> : ${itemResponses[5].getResponse()}  
  `

  // const message = `<b>Incident Reporting - ${venue} <br/> `

  const BOT_TOKEN = 'your bot API id from bot father';

  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Escape the input text
  const text = encodeURIComponent(message);

  const url = `${TELEGRAM_API}?chat_id=${chatId}&text=${text}&parse_mode=HTML`;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  const { ok, description } = JSON.parse(response);

  if (ok !== true) {
    Logger.log(`Error: ${description}`);
  }
};