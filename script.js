// JSONPlaceholder provides sample user data for practice projects.
const API_URL = "https://jsonplaceholder.typicode.com/users";

const loadButton = document.getElementById("load-button");
const retryButton = document.getElementById("retry-button");
const buttonLabel = document.getElementById("button-label");
const userGrid = document.getElementById("user-grid");
const userCount = document.getElementById("user-count");
const panelSubtitle = document.getElementById("panel-subtitle");
const emptyState = document.getElementById("empty-state");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const errorMessage = document.getElementById("error-message");
const statusArea = document.getElementById("status-area");

/** Show one status panel and hide the others. */
function showStatus(status) {
  statusArea.classList.toggle("has-results", status === "results");
  emptyState.hidden = status !== "empty";
  loadingState.hidden = status !== "loading";
  errorState.hidden = status !== "error";
}

/** Create initials for the user's avatar. */
function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/** Add a labelled line of information to a user card. */
function createDetail(label, value, isEmail = false) {
  const row = document.createElement("div");
  row.className = "detail-row";

  const labelElement = document.createElement("span");
  labelElement.className = "detail-label";
  labelElement.textContent = label;

  const valueElement = document.createElement("span");
  valueElement.className = "detail-value";

  if (isEmail && value) {
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${value}`;
    emailLink.textContent = value;
    valueElement.appendChild(emailLink);
  } else {
    valueElement.textContent = value || "Not provided";
  }

  row.append(labelElement, valueElement);
  return row;
}

/** Build a user card using DOM methods and textContent. */
function createUserCard(user) {
  const card = document.createElement("article");
  card.className = "user-card";

  const top = document.createElement("div");
  top.className = "user-card-top";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = getInitials(user.name || "User");

  const nameWrap = document.createElement("div");
  nameWrap.className = "user-name-wrap";

  const name = document.createElement("h4");
  name.className = "user-name";
  name.textContent = user.name || "Unnamed user";

  const username = document.createElement("p");
  username.className = "user-handle";
  username.textContent = `@${user.username || "unknown"}`;
  nameWrap.append(name, username);

  const userId = document.createElement("span");
  userId.className = "user-id";
  userId.textContent = `ID ${user.id ?? "—"}`;

  top.append(avatar, nameWrap, userId);

  const details = document.createElement("div");
  details.className = "user-details";
  details.append(
    createDetail("Email", user.email, true),
    createDetail("Company", user.company?.name),
    createDetail("City", user.address?.city)
  );

  card.append(top, details);
  return card;
}

/** Display all users returned by the API on the page. */
function displayUsers(users) {
  userGrid.replaceChildren();

  const cards = users.map((user) => createUserCard(user));
  userGrid.append(...cards);

  userCount.textContent = String(users.length);
  panelSubtitle.textContent = `Successfully loaded ${users.length} ${users.length === 1 ? "user" : "users"}`;
  showStatus("results");
}

/** Fetch user data when the button is clicked. */
async function loadUsers() {
  loadButton.disabled = true;
  buttonLabel.textContent = "Loading...";
  userGrid.replaceChildren();
  userCount.textContent = "—";
  panelSubtitle.textContent = "Please wait while the data loads";
  showStatus("loading");

  try {
    // Send a request to the API and wait for its response.
    const response = await fetch(API_URL);

    // fetch() does not reject automatically for HTTP errors such as 404.
    if (!response.ok) {
      throw new Error(`The server returned an error (${response.status}).`);
    }

    // Convert the response body from JSON into JavaScript data.
    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error("The API did not return a user list. Please try again.");
    }

    // Render the data dynamically on the webpage.
    displayUsers(users);
  } catch (error) {
    console.error("Unable to fetch users:", error);
    userCount.textContent = "—";
    panelSubtitle.textContent = "The request could not be completed";
    errorMessage.textContent = error instanceof TypeError
      ? "The API could not be reached. Check your internet connection and try again."
      : (error.message || "Something went wrong. Please try again.");
    showStatus("error");
  } finally {
    // Re-enable the button whether the request succeeds or fails.
    loadButton.disabled = false;
    buttonLabel.textContent = "Load Data";
  }
}

// Both buttons run the same function, so users can retry after an error.
loadButton.addEventListener("click", loadUsers);
retryButton.addEventListener("click", loadUsers);
