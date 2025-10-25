import { useTranslation } from "react-i18next";

export default function Contact() {
  const {t} = useTranslation();
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 text-center text-neutral-200">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">{t("contact.title")}</h1>
  
        <p className="text-lg text-neutral-400 mb-10">
          {t("contact.text")}{" "}
          <a
            href="mailto:shefket.must@gmail.com"
            className="text-orange-400 hover:underline"
          >
            shefket.must@gmail.com
          </a>
        </p>
  
        <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23453.99869595392!2d27.235011440677052!3d42.70901750437676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a67d16f8ed0efd%3A0x1323de324168c3fd!2z0KbQtdC90YLRitGALCA4NTAw!5e0!3m2!1sbg!2sbg!4v1757590956885!5m2!1sbg!2sbg"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    );
  }
  