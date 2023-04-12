function onEdit(e) { 
  var range = e.range;
  var spreadSheet = e.source;
  var sheetName = spreadSheet.getActiveSheet().getName();
  var column = range.getColumn();
  var row = range.getRow();
  // var value = SpreadsheetApp.getActiveSheet().getRange(row, column).getValue();
  if (sheetName == 'Vasaro Ambassador Application') {  
    addOrUpdateShopifyCustomer(range, row, column);
  } 
}

addOrUpdateShopifyCustomer = async function(range, row, column) {
  var customersEmail = await shopify.rest.Customer.find({
    session: session,
    email: range.getCell(row, 3).getValue(),
  }).customers;
  var customersPhone = await shopify.rest.Customer.find({
    session: session,
    email: range.getCell(row, 4).getValue(),
  }).customers;
  if (customersEmail.length === 0 && customersPhone.length === 0) {
    const customer = new shopify.rest.Customer({session: session});
    customer.first_name = range.getCell(row, 1).getValue();
    customer.second_name = range.getCell(row, 2).getValue();
    customer.email = range.getCell(row, 3).getValue();
    customer.phone = range.getCell(row, 4).getValue();
    customer.metafields = [
      {
        "key": "instagram",
        "value": range.getCell(row, 5).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      }, 
      {
        "key": "tiktok",
        "value": range.getCell(row, 6).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "postingAgreement",
        "value": range.getCell(row, 7).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "contentUsageAgreement",
        "value": range.getCell(row, 8).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "inCollege",
        "value": range.getCell(row, 9).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "collegeName",
        "value": range.getCell(row, 10).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "inSorority",
        "value": range.getCell(row, 11).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "sororityName",
        "value": range.getCell(row, 12).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "wantIntershipInfo",
        "value": range.getCell(row, 13).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "hearFrom",
        "value": range.getCell(row, 14).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "referredBy",
        "value": range.getCell(row, 15).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "submittedAt",
        "value": range.getCell(row, 16).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "token",
        "value": range.getCell(row, 17).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
      {
        "key": "internalNotes",
        "value": range.getCell(row, 18).getValue(),
        "type": "single_line_text_field",
        "namespace": "global"
      },
    ];
    await customer.save({
      update: true
    });
  } else {
    
  }
}