# Backend Structure

The backend is organized by responsibility:

- `config/`: environment and database setup
- `repository/`: database queries only
- `service/`: business rules such as auth, roles, and account verification
- `controller/`: HTTP request/response handling
- `route/`: Express route registration
- `utils/`: startup utilities such as super admin seeding

Event manager/company accounts are created with `account_status = 'pending'`.
Only the seeded super admin should approve them before they can add or edit events.
