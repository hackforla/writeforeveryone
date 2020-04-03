function defaultSites() {
  return [
    "apnews.com",
    "news.yahoo.com",
    "news.google.com",
    "cnn.com",
    "usatoday.com"
  ].join("\n")
}

function defaultWords() {
  return [
    "anchorman",
    "businessman",
    "cameraman",
    "chairman",
    "clergyman",
    "councilman",
    "committeeman",
    "congressman",
    "craftsman",
    "doorman",
    "everyman",
    "fireman",
    "fisherman",
    "freshman",
    "gentleman",
    "layman",
    "lineman",
    "mailman",
    "mankind",
    "manmade",
    "manhole",
    "manpower",
    "middleman",
    "newsman",
    "ombudsman",
    "policeman",
    "postman",
    "spokesman",
    "statesman",
    ].join("\n")
}

function init() {
  let params = new URLSearchParams(window.location.search)
  initSitesTextArea(params)
  initWordsTextArea(params)
  initSitesInputFile()
  initWordsInputFile()
}

function initSitesTextArea(params) {
  document.getElementById("sites").innerHTML = params.get("sites") || defaultSites()
}

function initWordsTextArea(params) {
  document.getElementById("words").innerHTML = params.get("words") || defaultWords()
}

function initSitesInputFile() {
  let sitesInputFileElement = document.getElementById('sites-input-file')
  if (sitesInputFileElement) {
    sitesInputFileElement.addEventListener('change', function(event){ uploadFileToElementId(event.target, 'sites'); }, false);
  }
}

function initWordsInputFile() {
  let wordsInputFileElement = document.getElementById('words-input-file')
  if (wordsInputFileElement) {
    wordsInputFileElement.addEventListener('change', function(event){ uploadFileToElementId(event.target, 'words'); }, false);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uploadFileToElementId(input, elementId) {
  if ('files' in input && input.files.length > 0) {
      placeFileContent(
      document.getElementById(elementId),
      input.files[0])
  }
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
      target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

window.addEventListener("load",function() {
  init()
  initSitesInputFile()
  initWordsInputFile()
  document.getElementById('searcher').addEventListener("submit",function(e) {
    e.preventDefault(); // before the code
    let sites = document.getElementById("sites").value.trim().split(/[\n\r\t ,]+/)
    let words = document.getElementById("words").value.trim().replace(/\n/g, " ").replace(/,/g, " ").replace(/\t/g, " ").replace(/  +/g, " ").split(" ");
    let terms = " ( " + words.map(word => "intext:" + word).join(" | ") + " )"
    for (site of sites) {
      let query = "site:" + site + terms;
      let uri = "https://www.google.com/search?q=" + encodeURIComponent(query);
      window.open(uri);
    }
  });
});
