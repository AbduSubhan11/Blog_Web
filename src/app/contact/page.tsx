"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else{
        toast.error("Message not sent")
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#141414] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Contact Us
          </h2>
          <p className="text-[#807f7f] text-lg md:text-xl mx-auto w-[95%] max-w-md">
            Have a question, suggestion, or collaboration in mind? Reach out
            below!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          <input
            type="hidden"
            name="access_key"
            value="c4cea03b-f4fe-4951-b90f-1285bd336637"
          />

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="w-full p-3 rounded bg-[#1d1d1d] border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="John@gmail.com"
              required
              className="w-full p-3 rounded bg-[#1d1d1d] border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write a message..."
              required
              rows={5}
              className="w-full p-3 rounded bg-[#1d1d1d] border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-[#141414] font-semibold px-6 py-3 rounded transition duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
