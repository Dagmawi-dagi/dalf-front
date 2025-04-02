// list data will use this to filter the list OR queary filterd list  
// this is what the accordion comp is also expecting as a props
export const  questionsfilter = [
        {
        "filterHeader": "isAnon",
        "filters" : [
            {
              "name": "true",
            },
            {
              "name": "false",
            },
          ]
        },
        {
          "filterHeader": "picture",
          "filters" : [  
          {
            "name": "true"
          },
          {
            "name": "false"
          }
        ]
      },
      {
        "filterHeader": "upvotes",
        "filters" : [  
        {
          "name": "10>"
        },
        {
          "name": "11-20"
        },
        {
          "name": "21-50"
        },
        {
          "name": "51-100"
        },
        {
          "name": "above 100"
        },
      ]
    },
    {
      "filterHeader": "downvotes",
      "filters" : [  
      {
        "name": "0-10"
      },
      {
        "name": "11-20"
      },
      {
        "name": "21-50"
      },
      {
        "name": "51-100"
      },
      {
        "name": "above 100"
      },
    ]
  }
]

export const answersfilter= [
    {
      filterHeader: 'isAnon',
      filters: [
        {
          name: 'true' 
        },
        {
          namd: 'false'
        }
      ]
    },
    {
      "filterHeader": "upvotes",
      "filters" : [  
      {
        "name": "0-10"
      },
      {
        "name": "11-20"
      },
      {
        "name": "21-50"
      },
      {
        "name": "51-100"
      },
      {
        "name": "above 100"
      },
    ]
    },
    {
      "filterHeader": "downvotes",
      "filters" : [  
      {
        "name": "0-10"
      },
      {
        "name": "11-20"
      },
      {
        "name": "21-50"
      },
      {
        "name": "51-100"
      },
      {
        "name": "above 100"
      },
    ]
  }
]

export const  usersfilter= [
    {
    filterHeader: 'questions',
    "filters" : [  
      {
        "name": "0-10"
      },
      {
        "name": "11-20"
      },
      {
        "name": "21-50"
      },
      {
        "name": "51-100"
      },
      {
        "name": "above 100"
      },
    ]
    },
    {
      filterHeader: 'answers',
      "filters" : [  
        {
          "name": "0-10"
        },
        {
          "name": "11-20"
        },
        {
          "name": "21-50"
        },
        {
          "name": "51-100"
        },
        {
          "name": "above 100"
        },
      ]
      },

]