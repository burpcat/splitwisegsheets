function onEdit(e) {
  try {
    Logger.log('Exec start')
    // Check if 'e' and 'e.range' are defined
    if (e && e.range && typeof e.range.getColumn === 'function') {
      var sheet = e.source.getSheetByName('Sheet1');
      var range = e.range;
      var column = range.getColumn();
      var checkboxRange = sheet.getRange(2, 4, sheet.getLastRow()-1, 4);
      var costRange = sheet.getRange("B2:B100");
      
      sheet.getRange("J2:J5").clearContent();
      var enable = sheet.getRange('H14').getValue();
      
      // Check if it's the correct sheet and in the checkbox columns (D to G)
      if (sheet && enable===true) {
          Logger.log('Main Function')

          // Reset total cost and selected members count
          var totalCost = 0;
          var selectedMembersCount = 0;
          // Loop through each checkbox
          for (var i = 1; i <= checkboxRange.getNumRows(); i++){
            // var mainDictionary = {'1':false,'2':false,'3':false,'4':false};
            var mainDictionary = {};
            for (var j = 1; j <= checkboxRange.getNumColumns(); j++) {
            var cellValue = checkboxRange.getCell(i,j).getValue();
            // Logger.log(cellValue)

            if (cellValue === true) {
              // If checkbox is selected, add the cost to the total and increment the count
              mainDictionary[j] = true
              var itemCost = costRange.getCell(i, 1).getValue();
            }

          }
          // Calculate split shares by the length of main dictionary
          var dictLength = Object.keys(mainDictionary).length;
          var individualShare = itemCost / dictLength;
          // Logger.log(individualShare);

          // Need to write splitting logic here

          for (var key in mainDictionary) {
            var numericKey = parseInt(key);

            if (numericKey === 1) {
              var stayValue = sheet.getRange("J2").getValue();
              stayValue += individualShare;
              sheet.getRange("J2").setValue(stayValue);
            } else if (numericKey === 2) {
              var stayValue = sheet.getRange("J3").getValue();
              stayValue += individualShare;
              sheet.getRange("J3").setValue(stayValue);
            } else if (numericKey === 3) {
              var stayValue = sheet.getRange("J4").getValue();
              stayValue += individualShare;
              sheet.getRange("J4").setValue(stayValue);
            } else if (numericKey === 4) {
              var stayValue = sheet.getRange("J5").getValue();
              stayValue += individualShare;
              sheet.getRange("J5").setValue(stayValue);
            }

            // Remove the key so the loop wont do shit again
            if (mainDictionary.hasOwnProperty(key)) {
              delete mainDictionary[key];
            }
          }


        }
        
    }
    } else {
      Logger.log('Invalid or unexpected event object structure:', e);
    }
  } catch (error) {
    Logger.log('Error in onEdit:', error.message, error.stack);
  }
}

