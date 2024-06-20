
const AssignmentDetailspage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-5">
        <div className="container mx-auto">
          <h1 className="text-3xl">Survey App Project Details</h1>
        </div>
      </header>
      <main className="container mx-auto p-5">
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p>
            A company is seeking a talented Developer to contribute to
            developing a Survey application using the MERN (MongoDB, Express.js,
            React.js, Node.js) stack. This project involves integrating payment
            functionalities, implementing a robust user management system, and
            creating an admin dashboard with role management. As a vital team
            member, you will be pivotal in crafting a feature-rich platform for
            survey creation, voting, result analysis, and user interaction.
          </p>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">What is a survey?</h2>
          <p>
            A survey gathers information or feedback from individuals to
            understand their opinions, preferences, or experiences on a
            particular topic or subject. Surveys can be conducted through
            various mediums such as online forms, questionnaires, interviews, or
            telephone calls. They are widely used in market research, academic
            studies, customer satisfaction analysis, and organizational
            evaluations.
          </p>
          <p>Here are example websites to get an idea:</p>
          <ul className="list-disc list-inside">
            <li>
              <a
                href="https://www.surveymonkey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                SurveyMonkey
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/forms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Google Forms
              </a>
            </li>
            <li>
              <a
                href="https://www.typeform.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Typeform
              </a>
            </li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Key Rules</h2>
          <ul className="list-disc list-inside">
            <li>Minimum 20 notable commits on the client side.</li>
            <li>Minimum 12 notable commits on the server side.</li>
            <li>
              Include website name, admin username, password, and live site URL
              in README.md.
            </li>
            <li>
              List at least 10 bullet points highlighting your website features.
            </li>
            <li>
              Ensure responsiveness for mobile, tablet, and desktop views,
              including the dashboard.
            </li>
            <li>
              Users should not be redirected to the login page after reloading a
              private route.
            </li>
            <li>
              Use environment variables to hide Firebase config keys and MongoDB
              credentials.
            </li>
            <li>
              Use sweet alerts/toasts/notifications for CRUD operations,
              successful login, and sign-up. Do not use default browser alerts.
            </li>
            <li>Implement TanStack Query for all GET method data fetching.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Main Features</h2>
          <h3 className="text-xl font-semibold mb-2">Pages</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Homepage:</strong> Hero Section, Featured Surveys Section,
              Latest Surveys Section, How It Works Section, FAQ.
            </li>
            <li>
              <strong>Surveys Page (Public):</strong> Display all surveys with
              title, short description, and total votes. Filters for the
              category and sort for vote count.
            </li>
            <li>
              <strong>Survey Details Page (Public):</strong> Display detailed
              survey information. Allow voting for logged-in users only. Only
              pro-users can add comments. Display survey results visually after
              voting or after the survey deadline. Allow users to report
              inappropriate surveys.
            </li>
            <li>
              <strong>Pricing Page (Public):</strong> Integrate payment system
              for pro-user membership. Change user role to pro-user upon
              successful payment.
            </li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">User Authentication</h2>
          <ul className="list-disc list-inside">
            <li>Email/password account creation.</li>
            <li>Social media authentication.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Role Management</h2>
          <ul className="list-disc list-inside">
            <li>User roles: user, surveyor, admin, pro-user.</li>
            <li>The default role for new users is user.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Dashboard</h2>
          <h3 className="text-xl font-semibold mb-2">
            Surveyor Dashboard: (/dashboard/surveyor)
          </h3>
          <ul className="list-disc list-inside">
            <li>
              Survey creation with questions. (/dashboard/surveyor/create)
            </li>
            <li>
              A question will contain the following information:
              <ul className="list-disc list-inside ml-5">
                <li>Title.</li>
                <li>Description.</li>
                <li>Options. (yes or no).</li>
                <li>Category. (Select from a dropdown)</li>
                <li>Deadline. (type date)</li>
              </ul>
            </li>
            <li>Show these screenshots image-1, image-2, image-3, image-4</li>
            <li>Survey update. (/dashboard/surveyor/update/:id)</li>
            <li>
              View individual survey responses for individual surveys added by
              the currently logged-in user in tabular form with a details
              button. (/dashboard/surveyor/surveys)
            </li>
            <li>
              Upon clicking the details button, show individual survey responses
              with detailed information and users.
              (/dashboard/surveyor/surveys/:id)
            </li>
            <li>Note: only the surveyor can create a survey.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            Admin Dashboard: (/dashboard/admin)
          </h3>
          <ul className="list-disc list-inside">
            <li>Manage users and roles. (/dashboard/admin/users)</li>
            <li>Publish/unpublish surveys. (/dashboard/admin/surveys)</li>
            <li>
              View all payments and survey responses.
              (/dashboard/admin/payments)
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            User Dashboard: (/dashboard/user)
          </h3>
          <ul className="list-disc list-inside">
            <li>Participate in surveys and (/dashboard/user/surveys)</li>
            <li>Reported surveys. (/dashboard/user/my-reports)</li>
            <li>
              Pro-User: (only pro-user can access this page)
              (/dashboard/user/comments)
            </li>
            <li>Commented on surveys.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Challenge Requirements</h2>
          <ul className="list-disc list-inside">
            <li>
              The feedback message is required when an admin is unpublishing a
              survey.
            </li>
            <li>
              View survey feedback added by the admin on unpublish a survey in
              tabular form. (/dashboard/surveyor/feedbacks)
            </li>
            <li>
              Toggle survey responses between table and chart views.
              (/dashboard/surveyor/surveys/:id)
            </li>
            <li>Surveys may contain multiple questions. See image.</li>
            <li>JWT Authentication 🔑</li>
            <li>
              Create and store JWT tokens in local storage for authentication.
            </li>
            <li>Implement JWT on private routes.</li>
            <li>Optional 401 and 403 handling.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Optional Features</h2>
          <ul className="list-disc list-inside">
            <li>Animation on the homepage sections.</li>
            <li>Toggle system between card and table views.</li>
            <li>Implement like and dislike features for individual surveys.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">
            Optional Package Requirements
          </h2>
          <p>Use any 3 of the following:</p>
          <ul className="list-disc list-inside">
            <li>Headless UI / shadcn/ui</li>
            <li>Yup (for form validation)</li>
            <li>Mongoose</li>
            <li>Moment</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">
            Extra Pages Recommendations
          </h2>
          <ul className="list-disc list-inside">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy and Terms of Service</li>
            <li>Help Center</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Guidelines</h2>
          <ul className="list-disc list-inside">
            <li>Spend 15-20 minutes on core features.</li>
            <li>Start with a basic idea and progressively add features.</li>
            <li>
              Prioritize user experience, data security, and seamless payment
              integration.
            </li>
            <li>Use ChatGPT for generating sample data initially.</li>
            <li>Regularly commit and push the code.</li>
            <li>Screenshots link.</li>
          </ul>
        </section>
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-3">Submission Requirements</h2>
          <ul className="list-disc list-inside">
            <li>Assignment Category:</li>
            <li>Admin Email:</li>
            <li>Admin Password:</li>
            <li>Front-end Live Site Link:</li>
            <li>Client Side GitHub Repository Link:</li>
            <li>Server-Side GitHub Repository Link:</li>
          </ul>
        </section>
      </main>
    </div>
    );
};

export default AssignmentDetailspage;