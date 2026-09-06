# HackaMate

Landing page for HackaMate — a platform to find hackathons, form teams, and ship
projects. Built with React and Vite. Light, static, no animation.

## Run locally

    npm install
    npm run dev

Then open the URL Vite prints (default http://localhost:5173).

## Build

    npm run build
    npm run preview

## Structure

    src/
      main.jsx          App entry
      App.jsx           Hash router: #/ (landing), #/login, #/signup
      index.css         Global styles + design tokens (colors, type, .btn, .logo)
      App.css           App-level layout
      Pages/
        Landing.jsx     Landing page; composes the sections below
        Auth/
          Auth.css      Shared styles for both auth pages
          SignIn.jsx    #/login
          SignUp.jsx    #/signup  (same layout/CSS as SignIn)
      Components/       One folder per section, CSS co-located
        Navbar/ Hero/ HowItWorks/ WhyHackaMate/
        TeamMatch/ Hackathons/ Stats/ CtaBanner/ Footer/

Routing is a small hash router in App.jsx (no router dependency). Navigation uses
plain links: #/login, #/signup, and in-page anchors like #hackathons.
