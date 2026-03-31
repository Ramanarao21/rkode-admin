# Rkode Users Dashboard - Admin Panel

A secure admin dashboard for managing user submissions and contact form data from the Rkode Labs website. Built with React, Vite, and Tailwind CSS with authentication and real-time data management.

## Features

- **Authentication System**: Secure login with JWT token management
- **Dashboard Overview**: Statistics cards showing total submissions and key metrics
- **Submission Management**: View, filter, and manage all form submissions
- **Message Details**: Modal view for detailed submission information
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Automatic data refresh and status updates
- **Secure API Integration**: Protected routes with token-based authentication

## Tech Stack

- **React 19.2.4** - UI library
- **Vite 8.0.1** - Build tool and dev server
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **React Icons 5.6.0** - Icon library
- **ESLint** - Code linting

## Project Structure

```
rkode-users-dashboard/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # Images and static files
│   ├── components/
│   │   ├── AuthModal.jsx        # Login/authentication modal
│   │   ├── Header.jsx           # Dashboard header
│   │   ├── MessageModal.jsx     # Submission details modal
│   │   ├── StatsCard.jsx        # Statistics display card
│   │   └── SubmissionTable.jsx  # Data table component
│   ├── services/
│   │   ├── api.js               # Base API configuration
│   │   ├── authService.js       # Authentication logic
│   │   └── formService.js       # Form data management
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── index.html
├── package.json
└── vite.config.js
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Access to the Rkode Labs backend API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rkode-users-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
echo "VITE_API_BASE_URL=https://rkode-backend.onrender.com" > .env
```

4. Update the `.env` file with your backend API URL:
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:5173` with hot module replacement (HMR).

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality and style issues.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://rkode-backend.onrender.com` |

## Authentication

The dashboard uses JWT token-based authentication:

1. Users log in through the `AuthModal` component
2. Upon successful login, a JWT token is stored in `localStorage`
3. All API requests include the token in the Authorization header
4. Token is validated on each request
5. Users are automatically logged out if the token expires

### Default Credentials
Contact your system administrator for login credentials.

## Key Components

### AuthModal
- Handles user login
- Validates credentials
- Manages authentication state
- Stores JWT tokens securely

### Header
- Displays user information
- Logout functionality
- Navigation elements

### StatsCard
- Shows dashboard statistics
- Total submissions count
- Other key metrics

### SubmissionTable
- Displays all form submissions
- Sortable columns
- Filterable data
- Row actions (view, delete)

### MessageModal
- Shows detailed submission information
- Contact details
- Message content
- Submission timestamp

## API Integration

### Services

#### authService.js
```javascript
- login(credentials)      
- logout()                
- getToken()              
- isAuthenticated()       
```

#### formService.js
```javascript
- getSubmissions()        
- getSubmissionById(id)   
- deleteSubmission(id)   
```

#### api.js
- Base Axios configuration
- Request/response interceptors
- Token injection
- Error handling

## Security Features

- JWT token authentication
- Protected API routes
- Automatic token refresh
- Secure token storage
- HTTPS enforcement (production)
- XSS protection
- CSRF protection

## Data Management

The dashboard manages the following data:
- Contact form submissions
- User messages
- Submission timestamps
- Contact information (name, email, phone)
- Message status

## Styling

The project uses Tailwind CSS 4.2.2 with the Vite plugin. Custom styles are in `src/index.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Hosting
The `dist/` folder can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

### Environment Configuration
Ensure production environment variables are set:
```env
VITE_API_BASE_URL=https://your-production-api.com
```

## Troubleshooting

### Authentication Issues
- Clear browser localStorage
- Check API URL in `.env`
- Verify backend is running
- Check network tab for API errors

### Build Errors
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version compatibility

### API Connection Issues
- Verify `VITE_API_BASE_URL` is correct
- Check CORS settings on backend
- Ensure backend is accessible

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/admin-feature`)
3. Commit your changes (`git commit -m 'Add admin feature'`)
4. Push to the branch (`git push origin feature/admin-feature`)
5. Open a Pull Request

