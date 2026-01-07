# ExitPro - College Exit Permission System

A comprehensive web application for managing student exit permissions in educational institutions. Built with React frontend and Node.js backend, featuring biometric authentication and real-time approval workflows.

## 🌟 Live Demo

- **Frontend**: [Netlify Deployment](https://exitpro.netlify.app/) 
- **Backend API**: [Render Deployment](https://exitpro.onrender.com)

## 📋 Features

### For Students
- **Signup & Login**: Secure account creation with college provided mailid/roll no.
- **Permission Requests**: Submission of exit requests with reason, time, and location
- **Real-time Status**: Track approval status from parents and faculty.
- **OTP Verification**: Parent approval via SMS OTP.

  ### For Parents
- **OTP Verification**: Approve child exit requests via SMS
- **Notification System**: Receive OTP for permission approval

### For Faculty
- **Branch-wise Access**: View pending requests for their department
- **Approval Workflow**: Approve or reject student requests
- **Dashboard**: Manage multiple requests efficiently

### For Security Personnel
- **Approved Requests**: View students with approved permissions
- **Checkout System**: Mark students as exited/returned
- **Real-time Updates**: Instant status synchronization



## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase Firestore** - NoSQL database
- **Firebase Admin SDK** - Server-side Firebase operations
- **Multer** - File upload handling
- **JWT** - Authentication tokens

### Deployment
- **Render** - Backend hosting
- **Netlify** - Frontend hosting
- **GitHub** - Version control

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore enabled
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/GurvindapalliSriramcharan/ExitPro-.git
   cd ExitPro-/node-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env` file and update values:
   ```env
   FIREBASE_PROJECT_URL=https://your-project.firebaseio.com
   FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
   PORT=5000
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Firestore Database
   - Generate service account key
   - Add key to environment variables

5. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../react-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Create `.env.local` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   App runs on `http://localhost:3000`

## 📱 Usage Workflow

### 1. Student Registration
1. Student visits the app and clicks "Sign Up"
2. Fills registration form with personal details
3. Uploads students personal details (name,roll no., parent's number ...etc )
4. Account created successfully

### 2. Permission Request Process
1. **Student Login**: Student logs in with email/password
2. **Request Submission**:
   - Select reason (medical, personal, etc.)
   - Choose time duration
   - Select location (college/hostel)
   - Choose OTP recipients (parent/alternate)
3. **Initial Status**: "Pending Parent Approval"

   ### 3. Parent Verification
1. **OTP Generation**: System sends OTP to parent's phone
2. **Parent Login**: Parent or students enters recieved OTP
3. **Final Approval**: Request status becomes "Approved"

### 4. Faculty Approval
1. **Faculty Login**: Faculty logs in with department email
2. **Review Requests**: View pending requests for their branch
3. **Decision Making**: Approve or reject requests
4. **Status Update**: Approved requests move to "Security Checkout"



### 5. Security Checkout
1. **Security Login**: Security personnel logs in
2. **View Approved**: See students ready for exit
3. **Biometric Verification**: Confirm student identity
4. **Checkout**: Mark student as exited
5. **Return Tracking**: Record return time

## 🔌 API Endpoints

### Student Routes
- `POST /student/signup` - Register new student
- `POST /student/login` - Student authentication
- `POST /student/request-permission` - Submit exit request
- `GET /student/status` - Check request status

### Faculty Routes
- `POST /faculty/login` - Faculty authentication
- `GET /faculty/pending-requests` - Get pending approvals
- `POST /faculty/approve` - Approve/reject requests

### Parent Routes
- `POST /parent/verify-otp` - Verify OTP for approval

### Security Routes
- `GET /security/accepted-outings` - Get approved requests
- `POST /security/checkout` - Mark student checkout

## 🗄 Database Schema

### Collections

#### `students`
```json
{
  "name": "John Doe",
  "rollNo": "12345",
  "branch": "CSE",
  "email": "john.doe@vnrvjiet.in",
  "parentPhone": "9876543210",
  "alternativePhone": "9876543211",
  "password": "hashed_password",
  "faceFilename": "face_12345.jpg",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### `outingRequests`
```json
{
  "email": "student@vnrvjiet.in",
  "reason": "Medical appointment",
  "fromTime": "2024-01-01T10:00:00Z",
  "toTime": "2024-01-01T12:00:00Z",
  "branch": "CSE",
  "location": "college",
  "otpRecipients": "{\"parent\":true,\"alternate\":false}",
  "otp": "7195",
  "parentStatus": "Approved",
  "facultyStatus": "Approved",
  "createdAt": "2024-01-01T09:00:00Z"
}
```

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repo to Render
2. Set root directory to `node-backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables in Render dashboard

### Frontend (Netlify)
1. Connect GitHub repo to Netlify
2. Set base directory to `react-frontend`
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add `REACT_APP_API_URL` environment variable

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for allowed origins
- **Firebase Security Rules**: Database access control
- **Password Hashing**: Secure password storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- **Developer**: Gurvindapalli Sriram Charan
- **Designers**: Sista Manogna
- **Tester**: Bhavya Posham
- **Institution**: VNR VJIET

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Contact: sriramcharan.vnr@gmail.com,24071a6691@vnrvjiet.in.

---

**Built with ❤️ for VNR VJIET students and faculty**
