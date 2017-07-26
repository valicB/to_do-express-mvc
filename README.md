# to_do-express-mvc


db-engines.com


database (my_store, todo_mvc...)
  -> collection (array) []
    -> objects/documents {}
      -> properties

show databases
1) use <database_name>
    use todo
2) db (--> todo)

3) db.users.insert( {new object} )
  db.users.insert( { login: 'admin', email: 'admin@gmail.com', password: '1234567' })

  db.users.find()
  db.users.find({ email: 'admin@gmail.com' })
  db.users.update( { login: 'admin' }, { $set : { password: 'qwerty' } } )
  db.users.remove( { login: 'admin2' } )

  2 collections
  references / links / embed
  Tasks <> Users
