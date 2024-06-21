const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PlaceModel = require("./models/Places");
const imageDownloader = require("image-downloader");
const path = require("path");
const multer = require("multer");
const Place = require("./models/Places");
const Booking = require("./models/Booking");
const fs = require('fs')
const mime = require('mime-types')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dug354rzd65areb3zb5";

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { readFileSync } = require("fs");
const bucket = "airbnb-clone-dawid";

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server started-${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

async function uploadToS3(path, originalFileName, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFileName.split(".");
  const ext = parts[parts.length - 1];
  const newFileName = Date.now() + "." + ext;
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFileName,
        ContentType: mimetype,
        ACL: "public-read",
      })
    );
    return `https://${bucket}.s3.eu-north-1.amazonaws.com/${newFileName}`
  } catch (error) {
    console.log(error);
  }
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const truepass = bcrypt.compareSync(password, userDoc.password);
    if (truepass) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("wrong pass");
    }
  } else {
    res.status(422).json("user not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const tokenData = jwt.verify(token, jwtSecret);
      const user = await User.findById(tokenData.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: link,
      dest: "/tmp/" + newName,
    });

    const url = await uploadToS3("/tmp/" + newName, newName, mime.lookup("/tmp/" + newName))

    res.json(url);
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//  This is for local storage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "uploads")); // Save files to the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Set unique filenames
//   },
// });

// const upload = multer({ storage: storage });

// // Route for handling file uploads
// app.post("/upload-photos", upload.array("photos"), (req, res) => {
//   res.status(200).json(req.files);
// });

// This uses amazon S3 bucket for images

const photosMiddleware = multer({ dest: "/tmp" });
app.post(
  "/upload-photos",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url)
    }
    res.json(uploadedFiles);
  }
);

app.post("/places", async (req, res) => {
  const {
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    addedPhotos,
    perks,
    maxGuests,
  } = req.body;
  const { token } = req.cookies;
  const tokenData = jwt.verify(token, jwtSecret);
  const user = await User.findById(tokenData.id);
  const response = await Place.create({
    owner: user.id,
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    photos: addedPhotos,
    perks,
    maxGuests,
  });
  res.json(response);
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:placeId", async (req, res) => {
  const placeId = req.params.placeId; // Extract placeId from request parameters
  const placeData = await Place.findById(placeId);
  res.json(placeData);
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    placeId,
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    addedPhotos,
    perks,
    maxGuests,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const placeDoc = await Place.findById(placeId);

      if (!placeDoc) {
        return res.status(404).json({ error: "Place not found" });
      }

      if (userData.id !== placeDoc.owner.toString()) {
        return res.status(403).json({ error: "Forbidden" });
      }

      console.log("Added Photos:", addedPhotos);

      placeDoc.set({
        title,
        address,
        description,
        extraInfo,
        checkIn,
        checkOut,
        photos: addedPhotos, // Make sure addedPhotos is not null here
        perks,
        maxGuests,
      });

      await placeDoc.save();

      res.json("updated place info");
    } catch (error) {
      console.error("Error updating place:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.post("/booking", async (req, res) => {
  const { token } = req.cookies;
  const { id } = await jwt.verify(token, jwtSecret);
  const {
    id: placeId,
    checkIn,
    checkOut,
    name,
    mobile,
    guests,
    stayNights,
  } = req.body;
  const booking = await Booking.create({
    userId: id,
    placeId,
    checkIn,
    checkOut,
    name,
    mobile,
    guests,
    stayNights,
  });
  res.json(booking);
});

app.get("/bookings/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;
  console.log(bookingId);
  const booking = await Booking.findById(bookingId).populate("placeId");
  res.json(booking);
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  const { id } = await jwt.verify(token, jwtSecret);
  const mybookings = await Booking.find({ userId: id }).populate("placeId");
  res.json(mybookings);
});
