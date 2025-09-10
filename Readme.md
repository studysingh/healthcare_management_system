## 📁 Environment Configuration

Make sure to update the `backend/config.env` file like this:

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
