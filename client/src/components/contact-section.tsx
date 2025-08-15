import { Mail, Linkedin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Let's Connect</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always excited to discuss technology, share knowledge, or explore new
          opportunities. Whether you're interested in my homelab setup or looking for a
          passionate systems engineer, let's talk!
        </p>

        <img
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=400"
          alt="Modern network equipment and server infrastructure"
          className="rounded-xl shadow-2xl w-full max-w-3xl mx-auto mb-12"
        />

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <a
            href="mailto:darianodirling@gmail.com"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center"
          >
            <Mail className="w-5 h-5 mr-3" />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/darianodirling"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border hover:border-emerald-500 text-muted-foreground hover:text-emerald-400 px-8 py-4 rounded-lg font-medium transition-colors flex items-center"
          >
            <Linkedin className="w-5 h-5 mr-3" />
            LinkedIn
          </a>
          <a
            href="tel:919-809-4139"
            className="border border-border hover:border-emerald-500 text-muted-foreground hover:text-emerald-400 px-8 py-4 rounded-lg font-medium transition-colors flex items-center"
          >
            <Phone className="w-5 h-5 mr-3" />
            Call Me
          </a>
        </div>

        <div className="text-muted-foreground">
          <p className="mb-2">Darian O'Dirling</p>
          <p className="mb-2">919-809-4139</p>
          <p className="mb-2">darianodirling@gmail.com</p>
          <p>darianodirling.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
