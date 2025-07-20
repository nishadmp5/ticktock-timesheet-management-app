
# Ticktock Timesheet Management App

A SaaS-style timesheet management app built with Next.js 15, NextAuth, and TailwindCSS.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/nishadmp5/ticktock-timesheet-management-app
   cd ticktock-timesheet-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root (already present in this repo):
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## Frameworks/Libraries Used

- [Next.js 15]
- [NextAuth.js]
- [TailwindCSS]
- React (App Router, Server & Client Components)
- JavaScript
- React Icons
- React Toastify
- Bcrypt

---

## Assumptions & Notes

- Authentication uses dummy user data and NextAuth credentials provider.
- All data (users, timesheets, entries) is mock data, stored in `/src/lib/mockData/`.
- API Integration: All data fetching in components is done via internal API routes, not by importing mock data directly.
- No persistent database; all data is in-memory and resets on server restart.

---

## Time Spent

- Analysis & Planning: 1 hours
- Project Setup: 2 hours
- Authentication: 3 hours
- API Integration	: 5 hours
- Error Handling & Validation	: 2 hours
- UI Styling : 6 hours
- Debugging : 1.5 hour
- Final Polish & Cleanup : 2 hours

  
Total : 24 hours

---

