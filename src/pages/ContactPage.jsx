import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <>
      <Helmet>
        <title>Contact Us | ASO Publication</title>
        <meta
          name="description"
          content="Contact ASO Publication for books, queries, and support."
        />
      </Helmet>

      <div className="min-h-screen p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

        <form className="max-w-md space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 rounded bg-gray-800"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-800"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            placeholder="Message"
            className="w-full p-2 rounded bg-gray-800"
            rows="4"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button className="bg-blue-600 px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactPage;
