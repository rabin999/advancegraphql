## Nested fetch
```
query GetBooksByLibrary {
  libraries {
    branch
    books {
      author {
        name
        books {
          name
          author {
            name
          }
        }
      }
    }
  }
}
```


## Alias
```
query getUserWithAliases {
  userA: books {
    name
    genre
  }

  userB: books {
    name
    genre
  }
}
```

## Fragments
  - ### is for client to reduce duplication
```
query getUserWithAliases {
  userA: books {
    ...bookFields
  }

  userB: books {
    ...bookFields
  }
}

fragment bookFields on Book {
  name
  genre
}
```

## In total
```
query BookQuery {
  book1: books(query: { search: "Klocko", paginate: { start: 1, limit: 15 } }) {
    ...BookField
  }
  
  book2: books(query: { search: "Klocko", paginate: { start: 1, limit: 15 } }) {
    ...BookField
  }
}

fragment BookField on Book {
  department: name
  genre
}
```

## Alias in MongoDB
```
db.books.aggregate(
   [
      {
         $project: {
            title: 1,
            isbn: {
               prefix: { $substr: [ "$isbn", 0, 3 ] },
               group: { $substr: [ "$isbn", 3, 2 ] },
               publisher: { $substr: [ "$isbn", 5, 4 ] },
               title: { $substr: [ "$isbn", 9, 3 ] },
               checkDigit: { $substr: [ "$isbn", 12, 1] }
            },
            lastName: "$author.last",
            copiesSold: "$copies"
         }
      }
   ]
)
```