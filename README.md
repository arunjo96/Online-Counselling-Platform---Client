# Online Counselling Platform Frontend

A modern React-based frontend application for an online counselling platform that connects clients with mental health professionals through secure video sessions, chat, and appointment scheduling.

## Features

- **User Authentication**: Complete login, registration, and password recovery flows
- **Dashboard**: Profile management for both clients and counsellors
- **Counsellor Directory**: Browse, filter, and book appointments with counsellors
- **Appointments**: Schedule, manage and pay for counselling sessions
- **Real-time Chat**: Secure messaging between clients and counsellors
- **Video Calls**: WebRTC-based secure video consultations
- **Session Notes**: Counsellors can maintain client records
- **Payment Integration**: Secure payment processing with Stripe

## Tech Stack

- **Framework**: React with Vite
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Real-time Communication**: Socket.IO and WebRTC
- **UI Components**: Custom components with React Icons

## Project Structure

| Directory | Description |
|-----------|-------------|
| `/src/pages/` | Main page components for different routes |
| `/src/components/` | Reusable UI components and interface elements |
| `/src/features/` | Redux Toolkit slices and API query definitions |
| `/src/context/` | React Context providers for state management |
| `/src/hooks/` | Custom React hooks for shared functionality |
| `/src/routes/` | Application routing and route configurations |
| `/src/utils/` | Helper utilities and common functions |


## Key Pages

- **Dashboard**: User profile management and settings
- **Counsellors**: Browse and filter available counsellors
- **Chat**: Real-time messaging interface
- **Video Call**: WebRTC-based video consultation
- **Appointments**: View and manage scheduled sessions
- **Payment Success/Cancel**: Handle payment processing results

## State Management

The application uses Redux Toolkit for global state management with RTK Query for API calls, providing:

- Automatic data caching and invalidation
- Loading and error states
- Optimistic updates
- Normalized data storage


## Best Practices

- Component-based architecture
- Separation of concerns
- Responsive design for all device sizes
- Consistent error handling
- Loading state management
- Proper form validation
- Accessibility considerations

## ⚠️ Nodemailer Issue !

Important: Nodemailer works locally but may encounter issues in production environments due to email server restrictions or firewall configurations.

## ⚙️ Installation & Setup

 Clone the repo
   ```bash
   git clone https://github.com/arunjo96/Online-Counselling-Platform---Client.git

