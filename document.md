# Internshala Clone Project Documentation

## Project Overview

This repository contains a clone of the Internshala platform, split into two main parts:

- `backend/`: Node.js + Express backend with MongoDB models, middleware, controllers, and API routes
- `internarea/`: Next.js frontend application with client-side routing, UI pages, authentication, and local data storage

The project is designed as an internship and job portal with advanced social, payment, resume, language, and security features.

---

# Architecture

## Frontend (`internarea/`)

### Technologies Used

- Next.js 15
- React 19
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Firebase Authentication
- React Toastify
- Swiper.js
- Razorpay Integration
- Stripe Integration
- i18next / react-i18next for multilingual support
- Axios for API communication
- jsPDF / html2pdf for resume generation

### Important Frontend Features

- Authentication system
- Internship & job listing pages
- Public Space social feed
- Resume Builder
- Subscription & payment system
- Forgot Password flow
- Multi-language UI
- OTP verification flows
- Login history tracking

---

## Backend (`backend/`)

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- OTP verification system
- Razorpay SDK
- Stripe SDK
- Multer for file uploads
- Device detector middleware
- IP tracking middleware

### Backend Responsibilities

- Authentication
- OTP verification
- Subscription management
- Payment handling
- Resume storage
- Login tracking
- Public Space APIs
- Language verification APIs
- Forgot password APIs

---

# Updated Folder Structure

```bash
backend/
│
├── db.js
├── index.js
├── package.json
│
├── Middleware/
│   ├── authMiddleware.js
│   ├── chromeVerification.js
│   ├── mobileTimeRestriction.js
│   ├── loginTracker.js
│   ├── subscriptionCheck.js
│   ├── postLimitMiddleware.js
│   └── languageVerification.js
│
├── Utils/
│   ├── otpGenerator.js
│   ├── passwordGenerator.js
│   ├── emailService.js
│   ├── invoiceGenerator.js
│   ├── paymentTimeValidator.js
│   ├── deviceDetector.js
│   └── resumePdfGenerator.js
│
├── Model/
│   ├── User.js
│   ├── Internship.js
│   ├── Job.js
│   ├── Application.js
│   ├── Post.js
│   ├── Subscription.js
│   ├── Resume.js
│   ├── ForgotPasswordRequest.js
│   ├── LoginHistory.js
│   ├── LanguageVerification.js
│   └── Payment.js
│
├── Routes/
│   ├── admin.js
│   ├── internship.js
│   ├── job.js
│   ├── application.js
│   ├── publicspace.js
│   ├── auth.js
│   ├── subscription.js
│   ├── payment.js
│   ├── forgotPassword.js
│   ├── resume.js
│   ├── language.js
│   └── loginHistory.js
│
└── Controllers/
    ├── authController.js
    ├── subscriptionController.js
    ├── resumeController.js
    ├── publicSpaceController.js
    ├── forgotPasswordController.js
    ├── languageController.js
    └── paymentController.js

internarea/
│
├── src/
│   ├── Components/
│   │   ├── PublicSpace/
│   │   ├── ResumeBuilder/
│   │   ├── ForgotPassword/
│   │   ├── Subscription/
│   │   ├── OTPVerification/
│   │   ├── LoginHistory/
│   │   └── LanguageSelector/
│   │
│   ├── pages/
│   │   ├── public-space/
│   │   ├── forgot-password/
│   │   ├── resume-builder/
│   │   ├── subscription/
│   │   ├── payment/
│   │   ├── login-history/
│   │   └── language-settings/
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   ├── paymentService.ts
│   │   ├── languageService.ts
│   │   ├── otpService.ts
│   │   └── resumeService.ts
│   │
│   ├── locales/
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── hi.json
│   │   ├── pt.json
│   │   ├── zh.json
│   │   └── fr.json
│   │
│   └── data/
│       └── localData.ts
```

---

# TASK 1 — Public Space Community Module

## Requirement

The platform should allow users to:

- Upload photos and videos
- Like posts
- Comment on posts
- Share posts
- Follow posting restrictions based on friend count

---

## How It Was Implemented

### Public Space Features

The Public Space module was expanded into a social networking feature.

### Features Added

- Post creation
- Image/video uploads
- Comments system
- Like system
- Share functionality
- Friend management system
- Daily post limit validation

---

## Posting Rules Implemented

| Friend Count         | Posting Limit |
| -------------------- | ------------- |
| 0 Friends            | Cannot post   |
| 1 Friend             | 1 post/day    |
| 2 Friends            | 2 posts/day   |
| More than 10 Friends | Unlimited     |

---

## Logic Used

### Middleware

`postLimitMiddleware.js`

Responsibilities:

- Counts friend connections
- Counts user posts for the day
- Blocks invalid post attempts
- Sends proper error messages

Example Logic:

```js
if (friendCount === 0) {
  return res.status(403).json({ message: 'Add friends before posting' });
}
```

---

## Database Changes

### User Model

Added:

```js
friends:[{ type: mongoose.Schema.Types.ObjectId, ref:'User' }]
```

### Post Model

Added:

```js
likes:[String],
comments:[Object],
shares:Number,
mediaType:String
```

---

## Frontend Files Used

### Components

- `CreatePostCard.tsx`
- `PostCard.tsx`
- `LeftSidebar.tsx`
- `RightSidebar.tsx`

### Pages

- `src/pages/public-space/index.tsx`

### Services

- `publicSpaceService.ts`

---

## APIs Added

| Method | Route                 | Purpose     |
| ------ | --------------------- | ----------- |
| POST   | `/api/public/post`    | Create post |
| POST   | `/api/public/like`    | Like post   |
| POST   | `/api/public/comment` | Add comment |
| POST   | `/api/public/share`   | Share post  |
| GET    | `/api/public/posts`   | Get feed    |

---

# TASK 2 — Forgot Password Module

## Requirement

Users should:

- Reset password using email or phone number
- Use forgot password only once per day
- Receive warning if exceeded
- Get generated password containing only uppercase/lowercase letters

---

## How It Was Implemented

### New Route

```bash
/forgot-password
```

---

## Features Added

- Email reset support
- Phone reset support
- Daily request tracking
- Password generator
- OTP verification
- Secure reset workflow

---

## Password Generator Logic

### File Used

`Utils/passwordGenerator.js`

### Generator Rules

- Only uppercase letters
- Only lowercase letters
- No numbers
- No special characters

Example:

```js
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
```

Generated Password Example:

```bash
AbCdEfGhIj
```

---

## Daily Limit Validation

### Database Model

`ForgotPasswordRequest.js`

Tracks:

- userId
- requestDate
- requestCount

Logic:

```js
if (requestCount >= 1) {
  return res.status(403).json({
    message: 'You can use this option only once per day'
  });
}
```

---

## Frontend Files

| File                        | Purpose              |
| --------------------------- | -------------------- |
| `forgot-password/index.tsx` | Forgot password page |
| `ForgotPasswordForm.tsx`    | Reset form           |
| `otpVerification.tsx`       | OTP validation       |

---

## Backend Files

| File                          | Purpose                    |
| ----------------------------- | -------------------------- |
| `forgotPassword.js`           | API routes                 |
| `forgotPasswordController.js` | Reset logic                |
| `passwordGenerator.js`        | Random password generation |
| `emailService.js`             | Sends email                |

---

# TASK 3 — Subscription & Payment System

## Requirement

### Subscription Plans

| Plan   | Price | Internship Limit |
| ------ | ----- | ---------------- |
| Free   | ₹0    | 1/month          |
| Bronze | ₹100  | 3/month          |
| Silver | ₹300  | 5/month          |
| Gold   | ₹1000 | Unlimited        |

Additional Rules:

- Payment allowed only between 10AM and 11AM IST
- Send invoice email after payment

---

# How It Was Implemented

## Payment Gateway Used

- Razorpay
- Stripe

---

## Payment Time Restriction

### File Used

`paymentTimeValidator.js`

Logic:

```js
const hour = new Date().getHours();

if (hour < 10 || hour >= 11) {
  return res.status(403).json({
    message: 'Payments allowed only between 10AM and 11AM IST'
  });
}
```

---

## Subscription Validation Middleware

### File

`subscriptionCheck.js`

Responsibilities:

- Tracks monthly applications
- Validates limits
- Blocks excessive applications

---

## Database Model

### `Subscription.js`

```js
planName:String,
price:Number,
applicationLimit:Number,
expiryDate:Date
```

---

## Invoice Email System

### Email Includes

- Plan name
- Payment amount
- Invoice ID
- Payment date
- User details

### File Used

`invoiceGenerator.js`

---

## Frontend Pages

| Page               | Purpose          |
| ------------------ | ---------------- |
| `/subscription`    | Plan selection   |
| `/payment`         | Payment checkout |
| `/payment-success` | Success screen   |

---

## Backend Routes

| Route                              | Purpose              |
| ---------------------------------- | -------------------- |
| `/api/subscription/create-order`   | Create payment order |
| `/api/subscription/verify-payment` | Verify payment       |
| `/api/subscription/plans`          | Fetch plans          |

---

# TASK 4 — Resume Builder Module

## Requirement

Students should:

- Create professional resumes
- Enter personal details
- Upload photo
- Attach resume to profile automatically
- Access feature only under premium plan
- Pay ₹50 per resume
- Verify OTP before payment

---

# How It Was Implemented

## Resume Builder Form

### Fields Included

- Name
- Qualifications
- Skills
- Experience
- Personal Details
- Contact Details
- Photo Upload

---

## Resume Generation

### Libraries Used

- jsPDF
- html2canvas

### File Used

`resumePdfGenerator.js`

The system converts form data into a downloadable professional PDF resume.

---

## OTP Verification Before Payment

### Flow

1. User clicks Generate Resume
2. OTP sent to registered email
3. OTP verification page opens
4. Payment starts only after verification
5. Resume generated after successful payment

---

## Razorpay Integration

### Resume Charge

```bash
₹50 per resume
```

---

## Premium Plan Restriction

### Middleware

`premiumCheckMiddleware.js`

Logic:

```js
if (user.plan === 'FREE') {
 return res.status(403).json({
   message: 'Upgrade to premium to use Resume Builder'
 });
}
```

---

## Frontend Files

| File                       | Purpose          |
| -------------------------- | ---------------- |
| `resume-builder/index.tsx` | Resume form page |
| `ResumePreview.tsx`        | Resume preview   |
| `ResumeTemplate.tsx`       | Resume layout    |
| `OTPVerification.tsx`      | OTP check        |

---

## Backend Files

| File                    | Purpose        |
| ----------------------- | -------------- |
| `resume.js`             | Resume routes  |
| `resumeController.js`   | Resume logic   |
| `resumePdfGenerator.js` | PDF generation |
| `otpGenerator.js`       | OTP service    |

---

# TASK 5 — Multi-language Support

## Requirement

Supported Languages:

- English
- Spanish
- Hindi
- Portuguese
- Chinese
- French

Additional Rule:

- French language activation requires OTP verification

---

# How It Was Implemented

## Translation System

### Libraries Used

- i18next
- react-i18next

---

## Translation Files

| File      | Language   |
| --------- | ---------- |
| `en.json` | English    |
| `es.json` | Spanish    |
| `hi.json` | Hindi      |
| `pt.json` | Portuguese |
| `zh.json` | Chinese    |
| `fr.json` | French     |

---

## Language Selector Component

### File

`LanguageSelector.tsx`

Responsibilities:

- Switch language dynamically
- Save selected language in localStorage
- Apply translations globally

---

## French OTP Verification

### Logic

```js
if (selectedLanguage === 'French') {
  sendOTP(user.email);
}
```

Only after successful OTP verification:

```js
i18n.changeLanguage('fr');
```

---

## Backend Files

| File                      | Purpose        |
| ------------------------- | -------------- |
| `language.js`             | Routes         |
| `languageController.js`   | OTP validation |
| `languageVerification.js` | Middleware     |

---

## Frontend Files

| File                          | Purpose                |
| ----------------------------- | ---------------------- |
| `language-settings/index.tsx` | Language settings page |
| `LanguageSelector.tsx`        | Dropdown selector      |
| `VerifyFrenchOTP.tsx`         | OTP verification       |

---

# TASK 6 — Login Tracking & Security System

## Requirement

Track:

- Browser type
- Operating system
- Device type
- IP address
- Login history

Additional Rules:

- Chrome users require OTP verification
- Mobile users allowed login only between 10AM and 1PM

---

# How It Was Implemented

## Login Tracking System

### Middleware

`loginTracker.js`

Tracks:

- Browser name
- Device type
- Operating system
- IP address
- Login timestamp

---

## Device Detection

### Library Used

- express-useragent
- device-detector-js

---

## Login History Database

### Model

`LoginHistory.js`

```js
browser:String,
os:String,
device:String,
ip:String,
loginTime:Date
```

---

## Chrome OTP Verification

### Middleware

`chromeVerification.js`

Logic:

```js
if (browser === 'Chrome') {
  sendOTP(user.email);
}
```

User gains access only after OTP verification.

---

## Mobile Login Time Restriction

### Middleware

`mobileTimeRestriction.js`

Logic:

```js
if (device === 'mobile') {
  if (hour < 10 || hour > 13) {
    return res.status(403).json({
      message:'Mobile login allowed only between 10AM and 1PM'
    });
  }
}
```

---

## Frontend Pages

| File                   | Purpose             |
| ---------------------- | ------------------- |
| `/login-history`       | Shows login records |
| `LoginHistoryCard.tsx` | Login history UI    |

---

## Backend APIs

| Route                   | Purpose           |
| ----------------------- | ----------------- |
| `/api/login/history`    | Fetch login logs  |
| `/api/login/verify-otp` | Verify Chrome OTP |

---

# Database Schema Updates

## User Model Updates

```js
subscriptionPlan:String,
resumeCount:Number,
language:String,
loginHistory:[Object],
friends:[ObjectId]
```

---

# Security Features Implemented

## OTP Verification Used In

- Forgot password
- French language activation
- Resume payment verification
- Chrome browser login

---

## Access Restrictions

| Feature         | Restriction         |
| --------------- | ------------------- |
| Payments        | 10AM–11AM IST       |
| Mobile Login    | 10AM–1PM            |
| Forgot Password | Once per day        |
| Public Posting  | Friend-based limits |

---

# Packages & Libraries Used

## Frontend Packages

```bash
npm install react-toastify axios react-redux @reduxjs/toolkit
npm install i18next react-i18next
npm install jspdf html2canvas
npm install razorpay stripe
npm install react-icons
```

---

## Backend Packages

```bash
npm install express mongoose cors dotenv
npm install jsonwebtoken bcryptjs
npm install nodemailer otp-generator
npm install razorpay stripe
npm install express-useragent device-detector-js
npm install multer
```

---

# APIs Summary

| Module           | API Count |
| ---------------- | --------- |
| Public Space     | 5 APIs    |
| Forgot Password  | 3 APIs    |
| Subscription     | 4 APIs    |
| Resume Builder   | 4 APIs    |
| Language Support | 3 APIs    |
| Login Security   | 3 APIs    |

---

# Final Result

The Internshala Clone project now includes:

- Advanced social public space
- Secure forgot password system
- Subscription-based internship applications
- Resume builder with OTP verification
- Multi-language support with secure French activation
- Login tracking with browser/device restrictions
- Chrome OTP authentication
- Mobile time-restricted login access
- Razorpay & Stripe payment integrations
- Invoice email generation
- Premium plan access control
- Device-aware authentication system

The platform now behaves like a production-ready internship portal with modern security, monetization, and user engagement features.
