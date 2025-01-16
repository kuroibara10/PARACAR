const express = require("express");
const cors = require("cors");
require("./db/connection");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const path = require("path");

const products = require("./Models/products");
const users = require("./Models/users");
const Order = require("./Models/orders"); // استيراد موديل الطلبات

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // لتقديم الصور المرفوعة

//Client

// Login route with password comparison
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // العثور على المستخدم في قاعدة البيانات
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // التحقق من الدور
    if (user.role === "admin") {
      return res.json({
        message: `Welcome ${user.username}!`,
        role: "admin",
        id: user._id,
        role: user.role,
      });
    } else if (user.role === "client") {
      return res.json({
        message: `Welcome ${user.username}!`,
        role: "client",
        id: user._id,
        role: user.role,
      });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Signup route with password encryption
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new users({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// جلب جميع المستخدمين
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await users.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث مستخدم معين
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUsers = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// حذف مستخدم معين
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await users.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// إعداد Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// نقطة النهاية لرفع الصورة
app.post(
  "/api/users/:id/upload/users",
  upload.single("photo"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const imagePath = `../uploads/users/${req.file.filename}`;

      // تحديث المستخدم مع مسار الصورة
      const user = await users.findByIdAndUpdate(
        id,
        { photo: imagePath },
        { new: true }
      );

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

//Products

const storagePP = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/"); // تحديد المجلد الذي سيتم تخزين الصور فيه
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // إضافة التاريخ إلى اسم الملف لتجنب تكراره
  },
});

const uploadPP = multer({ storage: storagePP });

// استخدام `upload.single()` لتحميل صورة واحدة
app.post("/api/products", uploadPP.single("photoProduct"), async (req, res) => {
  const { nameProduct, description, prix, reviews } = req.body;
  const photoProduct = req.file ? req.file.path : ""; // مسار الصورة المحفوظة

  try {
    const existingProducts = await products.findOne({ nameProduct });
    if (existingProducts) {
      return res
        .status(400)
        .json({ message: "This name product is already registered!" });
    }

    const newProduct = new products({
      nameProduct,
      description,
      prix,
      reviews,
      photoProduct, // حفظ مسار الصورة
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// جلب جميع المستخدمين
app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await products.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// حذف مستخدم معين
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await products.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
///////////////////////////////////////////////////////////////////////////////////

app.put(
  "/api/products/:id",
  uploadPP.single("photoProduct"),
  async (req, res) => {
    const { id } = req.params;
    const { nameProduct, description, prix, reviews } = req.body;
    const photoProduct = req.file
      ? `uploads/products/${req.file.filename}`
      : undefined; // مسار الصورة المحفوظة إذا كانت موجودة

    try {
      // البحث عن المنتج في قاعدة البيانات باستخدام id
      const existingProduct = await products.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }

      // تحديث المنتج بالمعلومات الجديدة
      existingProduct.nameProduct = nameProduct || existingProduct.nameProduct;
      existingProduct.description = description || existingProduct.description;
      existingProduct.prix = prix || existingProduct.prix;
      existingProduct.reviews = reviews || existingProduct.reviews;
      if (photoProduct) {
        existingProduct.photoProduct = photoProduct; // تحديث مسار الصورة إذا تم رفع صورة جديدة
      }

      await existingProduct.save();

      res.status(200).json({
        message: "Product updated successfully",
        product: existingProduct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
//////////////////////////////////////////////////////////////////////////////////////////
// إعداد Multer
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload2 = multer({ storage2 });

// نقطة النهاية لرفع الصورة
app.post(
  "/api/products/:id/upload/products",
  upload2.single("photoProduct"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const imagePath = `/uploads/products/${req.file.filename}`;

      // تحديث المستخدم مع مسار الصورة
      const product = await products.findByIdAndUpdate(
        id,
        { photoProduct: imagePath },
        { new: true }
      );

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// إضافة طلب جديد
app.post("/api/orders", async (req, res) => {
  const { products, customerEmail, localisation } = req.body;

  try {
    const totalPrix = products.reduce((acc, product) => acc + product.prix, 0);

    const newOrder = new Order({
      products,
      totalPrix,
      customerEmail,
      localisation,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// جلب جميع الطلبات
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// جلب طلب معين
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// حذف طلب
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث طلب
app.put("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { products, customerEmail, localisation } = req.body;
    const totalPrix = products.reduce((acc, product) => acc + product.prix, 0);

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { products, totalPrix, customerEmail, localisation },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(5000, () => console.log("Server is run"));
