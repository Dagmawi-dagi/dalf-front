// list_header.vue will use this to create header tabs for data_list
// list_raw will use this to display the raw items accordingly 

export const  a_heads =  {
  "user id" : { "width": "120px", bg:'cyan', tx:'#000' },
  "user" : { "width": "120px", bg:'cyan', tx:'#000' },
  "createdAt" : { "width":  "120px"},
  "body" : { "grow":  true },
}

export const  b_heads =  {
  "logo" : { "width": "150px" },
  "name" : { "width":  "120px"},
  "subtopics" : { "grow":  true},
}

export const  users_heads =  {
  "userName" : { "width": "150px" },
  "last_logged_in":{"width": '120px'},
  "role" : { "width":  "120px"},
  "phoneNumber" : { "width":  '120px'},
  "active" :{ "width": "120px", bg:'cyan', tx:'#000' },
  "email" : { "width":  "120px"},
  "createdAt" : { "width":  '120px'},
}


export const  emergency_contacts_heads =  {
  "name" : { "width": "150px" },
  "phone_number" : { "width":  "120px"},
  "createdAt" : { "width":  '120px'},
}


export const  warning_heads =  {
  "allergy" : { "width": "150px" },
  "behavior" : { "width":  "120px"},
  "chronic_diseases" : { "width":  "120px"},
  "createdAt" : { "width":  '120px'},
}

export const  external_medical_docs_heads =  {
  "scanned_docs" : { "grow":true },
  "createdAt" : { "width":  '120px'},
  "updatedAt" : { "width":  '120px'},
}

export const  appointments_heads =  {
  "date" : { "width":"120px" },
  "comment" : { "width":  '120px'},
  "appointed_by" : { "width":  '120px'},
  "createdAt" : { "width":  '120px'},
}

export const  health_insurance_heads =  {
  "company_name" : { "width":"120px" },
  "insurance_number" : { "width":  '120px'},
  "percent" : { "width":  '120px'},
  "address" : { "width":  '120px'},
  "createdAt" : { "width":  '120px'},
}


export const  deposites_heads =  {
  "deposit_amount" : { "width":"120px" },
  "current_amount" : { "width":  '120px'},
  "payed_invoices" : { "width":  '120px'},
  "withdrawn" : { "width":  '120px'},
  "createdAt" : { "width":  '120px'},
}


export const  credit_heads =  {
  "invoice" : { "width":"120px" },
  "amount" : { "width":  '120px'},
  "payed" : { "width":  '120px'},
  "createdAt" : { "width":  '120px'},
}

export const  prescroption_heads =  {
 // not from DB but from form creator
}

//employee
export const  employee_heads =  {
  "first_name" : { "width":"120px" },
  "last_name" : { "width":  '120px'},
  "gender" : { "width":  '120px'},
  "email" : { "width":  '120px'},
  "phone_number" : { "width":  '120px'},
  "system_user" : { "width":  '120px'},
  "has_share" : { "width":  '120px'},
  "department":{"width":  '120px'},  
  "createdBy":{"width": '120px'}
}

export const  attendance_heads =  {
  "shift" : { "width":"120px" },
  "enterAt" : { "width":  '120px'},
  "leaveAt" : { "width":  '120px'},
  "seenBy" : { "width":  '120px'},
  "createdBy":{"width": '120px'}
}

export const  contract_heads =  {
  "begin_date" : { "width":"120px" },
  "end_date" : { "width":  '120px'},
  "gross_salary" : { "width":  '120px'},
  "gross_salary_period" : { "width":  '120px'},
  "comment":{"width": '120px'},
  "status":{"width": '120px'},
  "createdBy":{"width": '120px'}
}

export const  disciplinary_record_heads =  {
  "date" : { "width":"120px" },
  "title" : { "width":  '120px'},
  "discription" : { "width":  '120px'},
  "decision" : { "width":  '120px'},
  "decision_by":{"width": '120px'}
}

export const payed_share_heads = {
  "form_date" : { "width":"120px" },
  "to_date" : { "width":"120px" },
  "share_of_services_and_total_company_income_form" : { "width":"120px" },
  "service_requests" : {"width": "120px"}
}

export const rest_leave_heads = {
  "begin_date" : { "width":"120px" },
  "end_date" : { "width":"120px" },
  "duration" : { "width":"120px" },
  "request_date" : {"width": "120px"},
  "authorization_date" : {"width": "120px"},
  "authorization_by" : {"width": "120px"},
  "comment" : {"width": "120px"},
}

export const skill_heads = {
  "skill form" : { "grow":  true },
}

export const pateints_heads = {
  "MRN":{ "width":"90px" },
  "first_name":  { "width":"120px" },
  "middle_name":  { "width":"120px" },
  "last_name":{ "width":"120px" },
  "age":{ "width":"120px" },
  "gender":  { "width":"120px" },
  "phone_number": { "width":"120px" },
  "type":{ "width":"120px", bg:'cyan', tx:'#000' },
  "insurance_company":{ "width":"120px" },
  "invoice_destination":{ "width":"120px", bg:'cyan', tx:'#000' },
  "createdAt":{ "width":"120px" },
}

export const invoice_head = {
  "status":{ "width":"90px", bg:'cyan', tx:'#000' },
  "payment_type":  { "width":"120px" },
  "credited":  { "width":"120px" },
  "free_pass":{ "width":"120px" },
  "issued_at_price":{ "width":"120px" },
  "custom_invoice":  { "width":"120px" },
  "createdBy":  { "width":"120px" },
  "pateint_archive": {"width": "120px"},
  "createdAt":  { "width":"120px" },
}

export const credit_head = {
  "pateint_archive":{ "width":"90px", bg:'cyan', tx:'#000' },
  "invoice":  { "width":"120px" },
  "createdBy": { "width":"120px" },
  "createdAt":  { "width":"120px" },
}

export const deposite_head = {
  "deposit_amount":{ "width":"120px", bg:'cyan', tx:'#000' },
  "current_amount":  { "width":"120px" },
  "payed_invoices":  { "width":"120px" },
  "withdrawn":  { "width":"120px" },
  "pateint_archive":  { "width":"120px" },
  "createdBy": { "width":"120px" },
  "createdAt":  { "width":"120px" },
}

export const insurance_head = {
  "company_name":{ "width":"120px", bg:'cyan', tx:'#000' },
  "insurance_number":  { "width":"120px" },
  "discount_form":  { "width":"120px" },
  "phone_number":  { "width":"120px" },
  "email":  { "width":"120px" },
  "createdBy": { "width":"120px" },
  "createdAt":  { "width":"120px" },
}

export const store_items_head = {
  "item_name":  { "width":"120px" },
  "item_type":  { "width":"120px" },
  "quantity":   { "width":"120px" },
  "createdAt":  { "width":"120px" },
}

export const store_requested_items_head = {
  "store_item":  { "width":"120px" },
  "requested_by":  { "width":"120px" },
  "aprroved_by":   { "width":"120px" },
  "status":  { "width":"120px" },
  "comment":{"width": "120px" }
}

export const departments_head = {
  "department_name":  { "width":"120px" },
  "parent_reference":  { "width":"120px" },
  "createdAt":{"width": "120px" }
}

export const attendance_head = {
  "employee_archive":  { "width":"120px" },
  "shift":  { "width":"120px" },
  "enterAt":  { "width":"120px" },
  "leaveAt":  { "width":"120px" },
  "seenBy":  { "width":"120px" },
  "createdBy":{"width": "120px" },
  "createdAt":{"width": "120px" }
}

export default { 
  a_heads,
  b_heads,
  users_heads,
  emergency_contacts_heads,
  warning_heads,
  external_medical_docs_heads,
  appointments_heads,
  health_insurance_heads,
  deposites_heads,
  credit_heads,
  invoice_head,
  credit_head,
  deposite_head,
  pateints_heads,
  insurance_head,
  store_items_head,
  store_requested_items_head,
  departments_head,
  // employee
  attendance_head,
  employee_heads,
  attendance_heads,
  contract_heads,
  disciplinary_record_heads,
  payed_share_heads,
  rest_leave_heads,
  skill_heads


}