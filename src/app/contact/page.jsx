import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact - Tuoc Lam Thai",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ContactForm />
    </div>
  );
}
