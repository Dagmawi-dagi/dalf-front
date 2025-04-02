// those are for the accordions on the sidebar(side Nar) 
// we can create deeplynested like so 
// {
//   "name": "pparent",
//   sub_routes:[
//     {
//       "name": "child",
//       sub_routes:[
//         {
//           "name": "child child",
//           "route_name": "insurance-companies",
//         },
//         {
//           "name": "child child",
//           "route_name": "insurance-invoices",
//         }
//       ]
//     },
//   ]
// },

export default [
  {
    "role": 'store',
    "routes" : [
      {
        "name": "items",
        "route_name": "store-items",
      },
      {
        "name": "requested items",
        "route_name": "store-requested-items",
      },
      {
        "name": "my history",
        "route_name": "my-store-history",
      },
    ]
  },

  {
    "role": 'admin',
    "routes" : [
      {
        "name": "users",
        "route_name": "users",
      },
      {
        "name": "departments",
        "route_name": "departments",
      },
    ]
  },
  {
    "role": 'general',
    "routes" : [
      {
        "name": "vacancy",
        "route_name": "vacancy",
      },
      {
        "name": "websiteBlog",
        "route_name": "websiteBlog",
      },
    ]
  },
]