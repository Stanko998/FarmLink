import "../assets/Style/pages/About.scss";

export default function About() {
  return (
    <div className="about-page">
      <section className="company-info">
        <h1>About Our Company</h1>
        <p>
          Welcome to FarmLink! We are dedicated to connecting local farmers with
          customers, enabling direct access to fresh, locally sourced products.
          Our platform supports sustainable agriculture and empowers local
          communities.
        </p>
        <p>
          Whether you're a farmer looking to expand your reach or a customer
          searching for quality, fresh produce, FarmLink is here to help!
        </p>
      </section>
      <section className="customer-support">
        <h2>Need Help? Contact Us</h2>
        <p>
          If you have any questions, issues, or feedback, feel free to reach out
          to us using the form below.
        </p>
        <form className="support-form">
          <label>
            Your Name:
            <input type="text" placeholder="Enter your name" required />
          </label>
          <label>
            Email Address:
            <input type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Message:
            <textarea
              placeholder="Write your message here"
              rows={4}
              required
            ></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}
