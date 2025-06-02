var express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const Volunteer = require("./Volunteermodel")
const Users = require("./Usermodel");
const Applications = require("./applicationmodel");
const bycrypt = require("bcrypt");
const Review = require("./reviewmodel");

const app = express();
const PORT = 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.options('*', cors());

const URI = "mongodb://localhost:27017/Volunteer-Verse";
mongoose.connect(URI).then(() => {
  console.log("DB connected Sucessfully");
}
).catch(err => console.log(err))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post("/URegister", async (req, res) => {
  const { name, email, password, dob, phone, gender } = req.body;
  try {
    const uExist = await Users.findOne({ email: email })
    if (uExist) {
      return res.status(422).json({ error: "User already existed" });
    }
    else {
      const hashpassword = await bycrypt.hash(password, 12);
      const newUser = new Users({
        name: name,
        email: email,
        password: hashpassword,
        dob: dob,
        phone: phone,
        gender: gender
      });
      await newUser.save();
      res.status(201).json({ message: "Succesfull" });
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/VRegister", async (req, res) => {
  const { name, email, password, dob, phone, gender } = req.body;
  try {
    const vExist = await Volunteer.findOne({ email: email })
    if (vExist) {
      return res.status(422).json({ error: "User already existed" });
    }
    else {
      const hashpassword = await bycrypt.hash(password, 12);
      const newVolunteer = new Volunteer({ name, email, password: hashpassword, dob, phone, gender });
      await newVolunteer.save();
      res.status(201).json({ message: "Succesfull" });
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/VLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const vlogin = await Volunteer.findOne({ email: email })
    if (vlogin !== null) {
      const isPasswordValid = await bycrypt.compare(password, vlogin.password);
      if (isPasswordValid) {
        res.json(vlogin);
      } else {
        res.json("Incorrect Password");
      }
    }
    else {
      res.json("User not found");
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/ULogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const ulogin = await Users.findOne({ email: email })
    if (ulogin) {
      const isPasswordValid = await bycrypt.compare(password, ulogin.password);
      if (isPasswordValid) {
        res.json(ulogin);
      } else {
        res.json("Incorrect Password");
      }
    }
    else {
      res.json("User not found");
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/VApplication", async (req, res) => {
  const { email, name, age, phone, address, interest } = req.body;
  try {
    const newInterest = new Applications({ email, name, age, phone, address, interest });
    await newInterest.save();
    res.status(201).json("Successfull")
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get("/VCount", async (req, res) => {
  try {
    const VCount = await Volunteer.countDocuments();
    res.json(VCount);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get("/ACount", async (req, res) => {
  try {
    const ACount = await Applications.countDocuments();
    res.json(ACount);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/VData", async (req, res) => {
  try {
    const Vdata = await Applications.find()
    res.json(Vdata)
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get("/IVData", async (req, res) => {
  const { email } = req.query;
  try {
    const Vdata = await Applications.find({ email: email })
    res.json(Vdata)
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.delete('/ADelete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Applications.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'Application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/IVDatabyId/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const application = await Applications.findById(id);
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/AEdit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await Applications.findByIdAndUpdate(id, updateData, { new: true });
    if (result) {
      res.status(200).json({ message: 'Application updated successfully', data: result });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/Vol', async (req, res) => {
  const { email } = req.query;
  try {
    const Vdata = await Volunteer.find({ email: email });
    res.json(Vdata);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updatePassword', async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;

  try {
    const user = await Volunteer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bycrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const hashedPassword = await bycrypt.hash(newpassword, 12);
    const response = await Volunteer.findOneAndUpdate({ email }, { password: hashedPassword });

    if (response) {
      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to update password' });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.post("/review", async (req, res) => {
  const { userId, userName, reviewContent, volunteer } = req.body;

  if (!userId || !userName || !reviewContent || !volunteer) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newReview = new Review({ userId, userName, reviewContent, volunteer });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('Error saving review:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/Vreview/:volunteer', async (req, res) => {
  const { volunteer } = req.params;

  try {
    const reviews = await Review.find({ volunteer });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this volunteer' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error retrieving reviews:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
