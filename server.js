// Importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// Firebase admin setup
let serviceAccount = require("./ecom-website-af3a9-firebase-adminsdk-gjyml-d9a304e9b4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// Declare static variable path
const staticPath = path.join(__dirname, "public");

// Initializing express.js
const app = express();

// Middlewares
app.use(express.static(staticPath));
app.use(express.json());

// Routes

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

// Signup route
app.post("/signup", (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    // Form validations
    if (name.length < 3) {
        return res.json({ 'alert': 'Name must be at least 3 characters long' });
    } else if (!email.length) {
        return res.json({ 'alert': 'Please enter your email.' });
    } else if (password.length < 8) {
        return res.json({ 'alert': 'Password should be at least 8 characters long.' });
    } else if (!number.length) {
        return res.json({ 'alert': 'Please enter your phone number.' });
    } else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'Invalid number, please enter a valid one.' });
    } else if (!tac) {
        return res.json({ 'alert': 'You must agree to our terms and conditions.' });
    }

    // Store user in the database
    db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'Email already exists' });
            } else {
                // Encrypt the password before storing it.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                         req.body.password = hash;
                         db.collection('users').doc(email).set(req.body)   
                         .then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })                 
                    })
                })
            }
        })
})

// login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
  })
  
  app.post('/login', (req, res) => {
    let { email, password } = req.body;
  
    if (!email.length || !password.length) {
      return res.json({ 'alert': 'fill all the inputs' });
    }
  
    db.collection('users').doc(email).get()
      .then(user => {
        if (!user.exists) {
          return res.json({ 'alert': 'Login email does not exist' });
        } else {
          bcrypt.compare(password, user.data().password, (err, result) => {
            if (result) {
              let data = user.data();
              return res.json({
                name: data.name,
                email: data.email,
                seller: data.seller,
              });
            } else {
              return res.json({ 'alert': 'Incorrect password' });
            }
          });
        }
      });
  });

// seller route
app.get('/seller', (req,res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
  let { name, about, address, number, tac, legit, email } = req.body;
  if (!name.length || !address.length || !about.length || number.length < 10 || !Number(number)) {
      return res.json({ 'alert': 'Some information(s) is/are invalid'});
  } else if (!tac || !legit) {
      return res.json({ 'alert': 'You must agree with our terms and conditions'});
  } else {
      // update seller's user status here.
      db.collection('sellers').doc(email).set(req.body)
          .then(data => {
              db.collection('users').doc(email).update({
                  seller: true
              }).then(data => {
                  res.json(true);
              })
          })
  }
})

//add product
app.get('/add-product', (req,res)=>{
    res.sendFile(path.join(staticPath, "addProduct.html"));
})

// 404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
});

// Default route for handling undefined routes
app.use((req, res) => {
    res.redirect('/404');
});

app.listen(3000, () => {
    console.log('Listening on port 3000......');
});
