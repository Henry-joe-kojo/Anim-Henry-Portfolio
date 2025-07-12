const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create profile directory for profile pictures
const profileDir = path.join(__dirname, 'profile');
if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine destination based on file type or field name
        if (file.fieldname === 'profile') {
            cb(null, 'profile/');
        } else {
            cb(null, 'uploads/');
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Email transporter configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: process.env.EMAIL_USER || 'your-email@gmail.com', // You'll receive the emails
            subject: `Portfolio Contact: ${subject || 'New Message'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p><em>Sent from Anim Henry Antwi's Portfolio</em></p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ 
            success: true, 
            message: 'Thank you for your message! I will get back to you soon.' 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

// Upload portfolio image
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No image file provided' 
            });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        
        res.json({ 
            success: true, 
            message: 'Image uploaded successfully',
            imageUrl: imageUrl,
            filename: req.file.filename
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to upload image' 
        });
    }
});

// Upload profile picture
app.post('/api/upload-profile', upload.single('profile'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No profile image provided' 
            });
        }

        const profileUrl = `/profile/${req.file.filename}`;
        
        res.json({ 
            success: true, 
            message: 'Profile picture uploaded successfully',
            profileUrl: profileUrl,
            filename: req.file.filename
        });

    } catch (error) {
        console.error('Profile upload error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to upload profile picture' 
        });
    }
});

// Get all uploaded images
app.get('/api/images', (req, res) => {
    try {
        const uploadsPath = path.join(__dirname, 'uploads');
        
        if (!fs.existsSync(uploadsPath)) {
            return res.json({ images: [] });
        }

        const files = fs.readdirSync(uploadsPath);
        const images = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
            })
            .map(file => ({
                filename: file,
                url: `/uploads/${file}`,
                uploadedAt: fs.statSync(path.join(uploadsPath, file)).mtime
            }));

        res.json({ images: images });

    } catch (error) {
        console.error('Error reading images:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve images' 
        });
    }
});

// Get profile picture
app.get('/api/profile', (req, res) => {
    try {
        const profilePath = path.join(__dirname, 'profile');
        
        if (!fs.existsSync(profilePath)) {
            return res.json({ profile: null });
        }

        const files = fs.readdirSync(profilePath);
        const profileImages = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        if (profileImages.length > 0) {
            // Return the most recent profile picture
            const latestProfile = profileImages[profileImages.length - 1];
            res.json({ 
                profile: {
                    filename: latestProfile,
                    url: `/profile/${latestProfile}`,
                    uploadedAt: fs.statSync(path.join(profilePath, latestProfile)).mtime
                }
            });
        } else {
            res.json({ profile: null });
        }

    } catch (error) {
        console.error('Error reading profile:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve profile picture' 
        });
    }
});

// Delete an image
app.delete('/api/images/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'uploads', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ 
                success: true, 
                message: 'Image deleted successfully' 
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'Image not found' 
            });
        }

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete image' 
        });
    }
});

// Delete profile picture
app.delete('/api/profile/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'profile', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ 
                success: true, 
                message: 'Profile picture deleted successfully' 
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'Profile picture not found' 
            });
        }

    } catch (error) {
        console.error('Delete profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete profile picture' 
        });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));

// Admin panel route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
    console.log(`📤 Upload endpoint: http://localhost:${PORT}/api/upload`);
    console.log(`👤 Profile upload: http://localhost:${PORT}/api/upload-profile`);
    console.log(`👨‍💼 Admin panel: http://localhost:${PORT}/admin`);
});

module.exports = app; 