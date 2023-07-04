import JQuery from "jquery";
let $ = JQuery;

export const notify = function (data) {
  let body = "body",
    notify = "notifications",
    status = data.status,
    title = data.title;

  body;
  status;
  title;

  if ($("." + notify).length === 0) {
    $(body).append('<div class="' + notify + '"></div>');
  }

  $("." + notify)
    .prepend('<div class="notification ' + status + ' ani">' + title + "</div>")
    .find(".notification")
    .delay(3000)
    .fadeTo(300, 0)
    .delay(301)
    .slideUp(400)
    .delay(401)
    .queue(function () {
      $(this).remove();
    });
};

export default notify;
