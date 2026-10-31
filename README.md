# Navya G M — Portfolio (Java Full Stack)

| Part     | Tech                                 | Open in   | Runs on                |
|----------|--------------------------------------|-----------|------------------------|
| backend  | Java 21, Spring Boot 3.5, MongoDB    | IntelliJ  | http://localhost:8080  |
| frontend | React 18 + Vite                      | VS Code   | http://localhost:5173  |

## Run it

1. Make sure the **MongoDB** Windows service is running (it is installed already).
2. **Backend (IntelliJ):** File → Open → `backend` folder (as a Maven project), then run
   `PortfolioApplication`. Or in a terminal: `cd backend` → `mvn spring-boot:run`.
3. **Frontend (VS Code):** open the `frontend` folder, then in the terminal:
   `npm install` (first time only) → `npm run dev`.
4. Open http://localhost:5173

## Where things live

- **All website text** → `backend/src/main/resources/profile-seed.json`.
  Edit it and restart the backend; it is re-loaded into MongoDB on every startup.
- **Profile photo** → `backend/uploads/profile.jpg`. To change it from the site, open
  http://localhost:5173/?admin, click **Change photo**, and enter the admin key
  (`portfolio.admin-key` in `application.properties`).
- **Contact form messages** → MongoDB collection `contact_messages` (database `navya_portfolio`).
  Read them with: `GET http://localhost:8080/api/contact` and header `X-Admin-Key: <your key>`.

## API

| Method | Path                  | Notes                                  |
|--------|-----------------------|----------------------------------------|
| GET    | /api/profile          | Whole profile                          |
| GET    | /api/profile/photo    | Current photo                          |
| POST   | /api/profile/photo    | multipart `file`, needs `X-Admin-Key`  |
| POST   | /api/contact          | `{ name, email, subject, message }`             |
| GET    | /api/contact          | List messages, needs `X-Admin-Key`     |
