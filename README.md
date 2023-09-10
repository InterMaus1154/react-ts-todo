This is a basic Todo app made for learning purposes.

Technology used for frontend: ReactJS + TypeScript, SocketIO
Technology used for backend: HTTP Server, SocketIO

The "Login as guest" function is currently unavailable due to bugs. Fix will be coming soon.

Working and tested features: 
  -Authentication system
    -Input validation(username, display name, password required, password length >= 8)
  -Light and dark mode
  -Todo items saved to server
    -Not automated yet, "Save to server" needs to be pressed after changes to items
  -Settings saved to server
    -Automated, including dark and light mode
  -CRUD operations for todo items:
    -adding new item
    -display properly items received from server
    -update item(mark completed / mark incompleted)
    -delete a single item or delete all items
  -Pop-up windows for various actions
    -new item added
    -all item deleted
  -Filter
    -filter modal on mobile view
  -Summary box
  -Maximum 3 x 3 items displayed, pages can be switched with buttons
    -disabled on mobile, all items displayed
  -Hidden action panel on mobile
    -can be opened with the help of a button
  -Loading screen while the app is connecting to the server

Possibly features coming in the future:
  -categories saved to server
  -guest mode fix
  -stricter input validation
  
