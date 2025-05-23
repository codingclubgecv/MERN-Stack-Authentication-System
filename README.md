# 🔐 MERN Stack Authentication System

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-image-link.png" alt="Auth Banner" width="100%" />
</div>

## 🚀 Features

- ✅ **User Registration with Email Verification**
- ✅ **User Login with JWT Authentication**
- ✅ **Forgot Password and Reset Password Functionality**
- ✅ **Secure Password Hashing (bcrypt)**
- ✅ **Email Services (Nodemailer + Gmail SMTP)**
- ✅ **Protected API Routes**
- ✅ **Full Frontend Integration (React)**
- ✅ **Token Expiry Handling**
- ✅ **Error Handling and Validations**
- ✅ **Attractive UI with Notifications**

---

## 🛠️ Technologies Used

| Frontend  | Backend | Database | Email Service |
| :---: | :---: | :---: | :---: |
| ![React](https://img.icons8.com/color/48/react-native.png) React.js | ![Node.js](https://img.icons8.com/color/48/nodejs.png) Node.js | ![MongoDB](https://img.icons8.com/color/48/mongodb.png) MongoDB Atlas | ![Gmail](https://img.icons8.com/color/48/gmail.png) Gmail SMTP |
| ![Axios](https://img.icons8.com/ios/40/axios.png) Axios | ![Express.js](https://img.icons8.com/ios/48/express-js.png) Express.js |  | ![Nodemailer](https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-nodemailer-a-module-for-nodejs-applications-that-allows-easy-asynchronous-email-sending-logo-bold-tal-revivo.png) Nodemailer |

---

## ✨ How it Works

### 1. Registration

- New users can **register** by providing **Name**, **Email**, and **Password**.
- A **verification email** will be sent to the user's email with a secure tokenized link.
- Until email verification is completed, user cannot log in.

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-image-link.png" alt="Register Page" width="600px" />
</div>

---

### 2. Email Verification

- Clicking the link updates the user's record:
  - `isVerified: true`
  - `verificationToken: undefined`
- Displays a success message upon verification!

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-image-link.png" alt="Email Verified" width="600px" />
</div>

---

### 3. Login

- Only **verified users** can log in.
- On login:
  - Backend generates a **JWT token**.
  - Token is stored securely (localStorage/cookies).
  - Authenticated routes are protected using this token.

---

### 4. Forgot Password

- Users can request a **password reset** link if they forget their password.
- A secure reset token is generated and emailed.
- Link valid for 1 hour.
  
<div align="center">
  <img src="https://user-images.githubusercontent.com/your-image-link.png" alt="Forgot Password" width="600px" />
</div>

---

### 5. Reset Password

- Users can set a new password after clicking the reset link.
- The token is invalidated after password reset.

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-image-link.png" alt="Reset Password" width="600px" />
</div>

---

## 🧩 Project Structure

```
auth-using-mern/
├── client/ (React App)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/ (Express API)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## ⚡ How to Use in Your Own Project

1. **Clone the Repository**

```bash
git clone https://github.com/codingclubgecv/MERN-Stack-Authentication-System.git
cd MERN-Stack-Authentication-System
```

2. **Install Dependencies**

- Backend

```bash
cd server
npm install
```

- Frontend

```bash
cd client/secure-auth-frontend
npm install
```

3. **Set Environment Variables**

Create a `.env` file in the `server/` folder:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-very-secret-key
EMAIL_USER=your-gmail-address
EMAIL_PASS=your-gmail-app-password
CLIENT_URL=http://localhost:5173
```

4. **Start Servers**

- Start Backend

```bash
cd server
npm start
```

- Start Frontend

```bash
cd client
npm run dev
```

5. **Ready to Go!**
> Visit `http://localhost:5173` to view the app! 🎉

---

## 📸 Some Screenshots

| Register | Verify Email | Login | Forgot Password | Reset Password |
|:---:|:---:|:---:|:---:|:---:|
| ![](https://user-images.githubusercontent.com/your-image-link.png) | ![](https://user-images.githubusercontent.com/your-image-link.png) | ![](https://user-images.githubusercontent.com/your-image-link.png) | ![](https://user-images.githubusercontent.com/your-image-link.png) | ![](https://user-images.githubusercontent.com/your-image-link.png) |

---

## 🧠 Important Notes

- Ensure Gmail "less secure apps" settings are enabled or use an **App Password**.
- Tokens expire after certain time to enhance security.
- Hash passwords properly using `bcrypt`.
- Store sensitive credentials in `.env` (never push `.env` to GitHub).

---

## ✍️ Author

Made with ❤️ by [Abhishek Kumar](https://github.com/codingadventure0)

---

## ⭐ Contributions

- Feel free to fork and contribute via Pull Requests!
- Suggestions and improvements are most welcome! 🚀

---