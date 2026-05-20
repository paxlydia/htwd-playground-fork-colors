// Loads the colors data from the JSON file and updates the page content.
async function loadColors() {
  try {
    // Fetches the colors data from the JSON file
    // with a query parameter to prevent caching.
    const response = await fetch(`data/colors.json?t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Parses the JSON response into a JavaScript object.
    const records = await response.json();

    // Processes each record and builds HTML output.
    var recordCount = 0;
    var newInnerHTML = "";
    records.forEach(function (record, _index) {
      // Gets the ID and skips blank IDs.
      var id = String(record.id).trim();
      if (id == "") return;
      // Gets the valid RGB color values.
      var r = colorValue(record.color.r);
      var g = colorValue(record.color.g);
      var b = colorValue(record.color.b);
      // Appends the HTML representation.
      newInnerHTML += recordAsHTML(id, r, g, b);
      // Increments the record count.
      recordCount++;
    });
    // Sets a message if no valid records were found.
    if (recordCount == 0) newInnerHTML = "No colors found! 😭";

    // Updates the page with the new HTML content.
    document.getElementById("colorRecords").innerHTML = newInnerHTML;
  } catch (error) {
    console.error("Failed to load colors:", error);
    document.getElementById("colorRecords").innerHTML =
      "Error loading colors 😞";
  }
}

// -- Choice color functions --

// Handles the change event for the color input fields.
function handleColorChange(e) {
  var value = colorValue(e.value);
  if (e.value != value.toString()) e.value = value;
  updateColorPreview();
}

// Handles the click event for the random color button.
function handleRandomColor(_e) {
  const min = 50; // Minimum value avoids very dark colors (0-49).
  const max = 255; // Maximum color value (255).
  document.getElementById("r").value = colorValue(
    Math.floor(Math.random() * (max - min)) + min,
  );
  document.getElementById("g").value = colorValue(
    Math.floor(Math.random() * (max - min)) + min,
  );
  document.getElementById("b").value = colorValue(
    Math.floor(Math.random() * (max - min)) + min,
  );
  updateColorPreview();
}

// Updates the color preview element based on the current RGB values.
function updateColorPreview() {
  var r = colorValue(document.getElementById("r").value);
  var g = colorValue(document.getElementById("g").value);
  var b = colorValue(document.getElementById("b").value);
  var color = RGBColorValue(r, g, b);
  var title = titleAttribute("Preview", color);
  var element = document.getElementById("colorPreview");
  element.style["background-color"] = color;
  element.title = title;
  document.getElementById("colorPreviewJson").innerHTML = recordAsJSON(r, g, b);
}

// -- Helper functions --

// Converts RGB values to a CSS color string.
function RGBColorValue(r, g, b) {
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Creates a escaped title attribute string.
function titleAttribute(id, color) {
  return escapeHTML(id) + "\n" + escapeHTML(color);
}

// Creates an HTML span element string.
function recordAsHTML(id, r, g, b) {
  var color = RGBColorValue(r, g, b);
  var title = titleAttribute(id, color);
  return (
    '<span title="' +
    title +
    '" style="background-color: ' +
    color +
    '"></span>'
  );
}

// Creates a JSON string representation of a RGB color.
function recordAsJSON(r, g, b) {
  return '"color": { "r": ' + r + ', "g": ' + g + ', "b": ' + b + " }";
}

// Escapes special characters in a string for safe HTML display.
function escapeHTML(text) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

// Validates a color value to be between 0 and 255.
function colorValue(value) {
  var x = parseInt(value) || 0;
  return x < 0 ? 0 : x > 255 ? 255 : x;
}
