import React from "react";
import ContactForm from "../ContactForm";

const ContactPage = () => {
  return (
    <>
      <div className="w-full py-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
            Dove trovarci
          </h1>
          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4895.321774633288!2d14.694554877263583!3d42.15046994831517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1330de79a9fea407%3A0x875c2296c960749d!2sAqualand%20del%20Vasto!5e1!3m2!1sit!2sit!4v1750371430193!5m2!1sit!2sit"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
        <div className="w-full grid grid-rows md:grid-cols-2 gap-10 mt-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Contatti</h1>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Telefono</h2>
                <p className="text-gray-700 mb-4">
                  Se hai bisogno di maggiori informazioni chiamaci al numero:
                  (+39)0544 561156*
                </p>
                <h2 className="text-xl font-semibold mb-2">
                  Orari di apertura
                </h2>
                <p className="text-gray-700 mb-2">
                  *Da novembre a marzo: lunedì - venerdì dalle 9:00 alle 13:00 e
                  dalle 14:00 alle 18:00. Da aprile a ottobre: tutti i giorni
                  dalle 9:00 alle 18:00
                </p>
              </div>
            </div>
          </div>
          <div className="mb-34">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Modulo di contatto
            </h1>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
