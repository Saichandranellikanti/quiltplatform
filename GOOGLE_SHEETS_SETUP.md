## Google Sheets Integration Setup

To complete the MKY Booking workflow, you need to set up Google Sheets integration:

### Step 1: Google Sheets API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create credentials → API Key
5. Copy the API key

### Step 2: Google Apps Script Setup
1. Create a new Google Sheet for MKY bookings
2. Go to Extensions → Apps Script
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet or create company-specific sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(data.company + '_Bookings');
    
    if (!sheet) {
      sheet = ss.insertSheet(data.company + '_Bookings');
      // Add headers
      sheet.getRange(1, 1, 1, 16).setValues([[
        'Timestamp', 'Booking No', 'Date', 'Port of Loading', 'Port of Discharge',
        'Shipper', 'Receiver', 'Country', 'Container Type', 'Container No',
        'Quantity', 'Freight', 'BL Charges', 'Local Charges', 'Permit Type', 'Notes'
      ]]);
    }
    
    // Add the booking data
    sheet.appendRow([
      data.timestamp,
      data.bookingNo,
      data.bookingDate,
      data.portOfLoading,
      data.portOfDischarge,
      data.shipper,
      data.receiver,
      data.country,
      data.containerType,
      data.containerNo,
      data.quantity,
      data.freight,
      data.blCharges,
      data.localCharges,
      data.permitType,
      data.notes
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Booking saved'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Deploy → New deployment → Execute as "Me", Access "Anyone"
5. Copy the deployment URL

Now please provide these two values: