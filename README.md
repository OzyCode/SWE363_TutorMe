# PROJECT 363: TutorMe!

Welcome to PROJECT 363: Tutor Application for KFUPM.

This `README.md` file will guide you through the usage of our website/application. Please follow the instructions carefully to get started.

## Requirements

Before starting, ensure you have the following dependencies installed:

- `expressjs`
- `nunjucks`
- `nodejs`
- `nodemailer` (used for sending emails to a designated email address; if you'd like to receive the email, you'll need to add it to the database as a tutor/student).

## Getting Started

To begin your journey through the website, follow the steps based on your role:

### 1. Open `Main_page.html`

---

### General Section

**How do I login as a student, tutor, or admin?**

1. Click on **Student Login**, **Tutor Login**, or **Admin Login**.
2. Fill in your credentials: **Student ID**, **Tutor ID**, or **Admin ID** and **Password**.
3. Click **Login**.

**Forgot your password?**

1. Click on **Forgot Password?**.
2. Enter the **OTP**, **New Password**, and **Rewrite Password**.
3. Click **Save new password**.

---

### Student Section (Logged in as a student)

**How do I request a tutor?**

1. Select the course you'd like to be tutored on from the **Courses** dropdown.
2. Check the specific days you want tutoring via the checkboxes.
3. Click **Search**.
4. Navigate through available tutors by clicking the left and right buttons.
5. Click **Request a Tutor**.
6. Wait for the tutor to confirm the request.

**How do I know if my tutor accepted my request?**

1. Click on the **notification bell** on the top right to view notifications.

**How do I leave a review for my tutor?**

1. Click **Review Past Tutor**.
2. Choose one of your past tutors from the **Past Tutors** dropdown.
3. Select a rating out of 5 on the **1-5** dropdown.
4. (Optional) Add a comment in the **Comment** textbox.
5. Click **Send review to Admin**.

**What if I don't know the specific days I want tutoring?**

1. Follow the steps under **How do I request a tutor?** until you reach step 7.
2. Click **Search**.
3. Navigate through available tutors by clicking the left and right buttons.
4. Check **Check for any available time**.
5. Click **Request a Tutor**.
6. Wait for the tutor to confirm the request.

---

### Tutor Section (Logged in as a tutor)

**How can I choose the days that I'm available for students to see?**

1. Select the course you'd like to tutor on from the **Choose Course** dropdown.
2. Check the specific days you are available via the checkboxes.
3. Check **Virtual Tutoring** if you'll be tutoring virtually.
4. Click **Save**.

**How do I know if a student has sent a request to tutor them?**

1. Click on the **notification bell** on the top right.

**What if I don't have any courses to choose or want to add another course to teach?**

1. Click **Request to Tutor**.
2. Fill in **Student ID**.
3. Select the course you'd like to tutor on the **Choose Course** dropdown.
4. Choose the letter grade you received in that course.
5. Click **Send request**.
6. Wait for Admin approval.

**How do I know if the Admin approved my request?**

1. You will receive an email notification if you've been approved to tutor the requested course.
2. The requested course will appear in the **Choose courses** dropdown if you've received approval.

---

### Admin Section (Logged in as an admin)

**How do I see the reviews on tutors?**

1. Choose a tutor from the **Tutors** dropdown or use the search bar.
2. Scroll through the reviews.

**How can I accept or reject tutor requests to tutor courses?**

1. Click on the **notification bell** on the top right.
2. Accept or reject requests by clicking the **Check** (accept) or **X** (reject) buttons.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
# PROJECT 363: Tutor Application for KFUPM

Welcome to PROJECT 363: Tutor Application for KFUPM.

This `README.md` file will guide you through the usage of our website/application. Please follow the instructions carefully to get started.

## Requirements

Before starting, ensure you have the following dependencies installed:

- `expressjs`
- `nunjucks`
- `nodejs`
- `nodemailer` (used for sending emails to a designated email address; if you'd like to receive the email, you'll need to add it to the database as a tutor/student).

## Getting Started

To begin your journey through the website, follow the steps based on your role:

### 1. Open `Main_page.html`

---

### General Section

**How do I login as a student, tutor, or admin?**

1. Click on **Student Login**, **Tutor Login**, or **Admin Login**.
2. Fill in your credentials: **Student ID**, **Tutor ID**, or **Admin ID** and **Password**.
3. Click **Login**.

**Forgot your password?**

1. Click on **Forgot Password?**.
2. Enter the **OTP**, **New Password**, and **Rewrite Password**.
3. Click **Save new password**.

---

### Student Section (Logged in as a student)

**How do I request a tutor?**

1. Select the course you'd like to be tutored on from the **Courses** dropdown.
2. Check the specific days you want tutoring via the checkboxes.
3. Click **Search**.
4. Navigate through available tutors by clicking the left and right buttons.
5. Click **Request a Tutor**.
6. Wait for the tutor to confirm the request.

**How do I know if my tutor accepted my request?**

1. Click on the **notification bell** on the top right to view notifications.

**How do I leave a review for my tutor?**

1. Click **Review Past Tutor**.
2. Choose one of your past tutors from the **Past Tutors** dropdown.
3. Select a rating out of 5 on the **1-5** dropdown.
4. (Optional) Add a comment in the **Comment** textbox.
5. Click **Send review to Admin**.

**What if I don't know the specific days I want tutoring?**

1. Follow the steps under **How do I request a tutor?** until you reach step 7.
2. Click **Search**.
3. Navigate through available tutors by clicking the left and right buttons.
4. Check **Check for any available time**.
5. Click **Request a Tutor**.
6. Wait for the tutor to confirm the request.

---

### Tutor Section (Logged in as a tutor)

**How can I choose the days that I'm available for students to see?**

1. Select the course you'd like to tutor on from the **Choose Course** dropdown.
2. Check the specific days you are available via the checkboxes.
3. Check **Virtual Tutoring** if you'll be tutoring virtually.
4. Click **Save**.

**How do I know if a student has sent a request to tutor them?**

1. Click on the **notification bell** on the top right.

**What if I don't have any courses to choose or want to add another course to teach?**

1. Click **Request to Tutor**.
2. Fill in **Student ID**.
3. Select the course you'd like to tutor on the **Choose Course** dropdown.
4. Choose the letter grade you received in that course.
5. Click **Send request**.
6. Wait for Admin approval.

**How do I know if the Admin approved my request?**

1. You will receive an email notification if you've been approved to tutor the requested course.
2. The requested course will appear in the **Choose courses** dropdown if you've received approval.

---

### Admin Section (Logged in as an admin)

**How do I see the reviews on tutors?**

1. Choose a tutor from the **Tutors** dropdown or use the search bar.
2. Scroll through the reviews.

**How can I accept or reject tutor requests to tutor courses?**

1. Click on the **notification bell** on the top right.
2. Accept or reject requests by clicking the **Check** (accept) or **X** (reject) buttons.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
