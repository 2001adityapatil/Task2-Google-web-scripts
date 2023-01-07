function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html');

}

function uploadFiles(obj) {

  try {

    var dropbox = "DriveUploader";
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    var blob = Utilities.newBlob(Utilities.base64Decode(obj.data), obj.mimeType, obj.fileName);
    var file = folder.createFile(blob);
    file.setDescription("Uploaded by " + obj.myName);

    

    var spreadsheet = SpreadsheetApp.openById("1wNrXkKsYB6LTxVZtdum_rzPhocOGzzHefQp7O3KooKc");

  // console.log(spreadsheet);
  // Get the first sheet in the spreadsheet
  var sheet = spreadsheet.getSheetByName("userdata");
  // Get the next empty row in the sheet
  // console.log(sheet);
  var lastRow = sheet.getLastRow() + 1;
  // Write the values to the sheet
  sheet.getRange(lastRow, 1).setValue(obj.myName);
  sheet.getRange(lastRow, 2).setValue(obj.myEmail);
  sheet.getRange(lastRow, 3).setValue(obj.fileName);
  sheet.getRange(lastRow, 4).setValue(file.getUrl());


  return "File uploaded successfully: ";

  } catch (error) {

    return error.toString();
  }
}

















// function doGet() {
//   return HtmlService.createHtmlOutputFromFile("index");
// }
// const openSidebar = _ => SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile("index"));

// function upload(e){
//   const message = "sample confirmation message"; // Please set your confirmation message.

//   DriveApp.createFile(Utilities.newBlob(...e));
//   SpreadsheetApp.getActiveRange().setValue(message);
// }
