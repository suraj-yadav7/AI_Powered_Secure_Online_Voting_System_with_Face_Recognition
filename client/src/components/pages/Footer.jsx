export default function Footer() {
  return (
    <footer className=" text-black mt-40  ">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold">AI-Powered Voting</h2>
          <p className="text-sm mt-2 text-gray-400">
            A secure online voting platform using face recognition for voter verification and transparent elections.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-1 text-gray-600 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="text-sm text-gray-600 mt-2">
            Email: <a href="mailto:support@onlinevoting.com" className="hover:text-white">support@aionlinevoting.com</a><br />
            Phone: +91234567890 <br />
            Location: Telangana Hyderabad-500055, India
          </p>
        </div>
      </div>
      <hr/>

      <div className="text-center text-gray-500 text-sm py-4">
        © 2025 AI Online Voting System. All rights reserved.
      </div>
    </footer>
  )
};