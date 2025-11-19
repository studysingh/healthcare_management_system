# Healthcare Management System

## Title
Healthcare Management System

## Elevator Pitch
A role-based healthcare management system enabling patients to book and track appointments and send messages, while admins manage appointments, users, and message replies. Stack: React (separate patient and admin UIs), Node.js/Express API, MongoDB (Mongoose), JWT auth via httpOnly cookies, Nodemailer for email, Cloudinary for media.

## Architecture
- Frontend: Two React single-page applications (patient portal & admin dashboard) using Axios and toast notifications.
- Backend: Express REST API separated by domain (users, appointments, messages) with controllers and middlewares.
- Database: MongoDB with Mongoose models (User, Appointment, Message).
- Authentication: JWT stored in role-scoped httpOnly cookies; middleware checks role for protected routes.
- Email: Nodemailer for notifications (appointment status, message replies).
- Media: Cloudinary for doctor profile images.

## Core Features and Flows
- Authentication & Roles: Login issues a role-specific cookie (admin or patient) used for route protection.
- Appointments: Patients submit requests; admins view and change status (Pending, Approved, Rejected); status changes reflected in dashboard and trigger email.
- Messaging: Patients send inquiries; admins view inbox and reply; reply is emailed with original message preview in subject.
- Admin Management: Admins can create additional admin accounts via dashboard form.

## Data Model Summary (Conceptual)
- User: firstName, lastName, email, phone, role (Admin | Patient | Doctor), dob, gender, nic, password (hashed), optional avatar.
- Appointment: patient reference, doctor/department info, appointment date/time, status.
- Message: sender identity (names, email, phone), message body; reply handled via email.

## End-to-End Demo Narrative
1. Patient logs in and submits an appointment request (date/time + doctor/department).
2. Backend stores it as Pending; admin dashboard lists it.
3. Admin updates status to Approved or Rejected; patient receives an email notification.
4. Patient sends a general message; appears in admin inbox.
5. Admin replies; backend emails the reply using Nodemailer.
6. Admin adds a new administrator or new doctor; session state updates.

## Security and Reliability (Implemented)
- httpOnly cookies for JWT storage.
- Role-based authorization middleware.
- Centralized error handling returning structured JSON.
- Environment-based SMTP configuration for email transport.

## Environment Configuration
Update `backend/config.env`:

```env
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

PORT=4000

FRONTEND_URL=http://localhost:5174
DASHBOARD_URL=http://localhost:5173

JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=7d
COOKIE_EXPIRE=7

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

SMTP_MAIL=youremail@example.com
SMTP_PASSWORD=your_email_password_or_app_password
```