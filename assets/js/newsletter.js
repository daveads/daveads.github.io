// Progressive enhancement for the newsletter form. No frameworks, no third parties.
(function () {
  "use strict";
  var form = document.querySelector("[data-newsletter-form]");
  if (!form) return;

  var api = (form.getAttribute("data-api") || "").replace(/\/+$/, "");
  var status = form.querySelector(".newsletter-status");
  var button = form.querySelector("button[type=submit]");
  var email = form.querySelector("input[name=email]");
  var subscriberCount = form.querySelector("[data-subscriber-count]");
  var source = form.getAttribute("data-source") || "article_footer";

  if (subscriberCount) {
    fetch(api + "/api/subscribers/count")
      .then(function (res) {
        if (!res.ok) throw new Error("count unavailable");
        return res.json();
      })
      .then(function (data) {
        if (!Number.isInteger(data.active) || data.active < 0) return;
        subscriberCount.textContent = "[" + data.active + " subscriber" +
          (data.active === 1 ? "" : "s") + "]";
        subscriberCount.hidden = false;
      })
      .catch(function () {
        // The signup form still works when the optional count is unavailable.
      });
  }

  function show(state, text) {
    status.setAttribute("data-state", state);
    status.textContent = text;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!email.value.trim() || !email.checkValidity()) {
      show("error", "Please enter a valid email address.");
      email.focus();
      return;
    }
    button.disabled = true;
    show("loading", "Sending…");

    fetch(api + "/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value.trim(),
        source: source,
        website: form.querySelector("input[name=website]").value
      })
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (res.ok) {
            show("success", data.message || "Check your inbox for a confirmation link.");
            email.value = "";
          } else if (res.status === 429) {
            show("error", "Too many attempts. Please try again later.");
          } else {
            show("error", data.message || "Something went wrong. Please try again.");
          }
        });
      })
      .catch(function () {
        show("error", "Couldn't reach the server. Please try again later or use the RSS feed.");
      })
      .then(function () { button.disabled = false; });
  });
})();
