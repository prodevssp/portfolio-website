import React from "react";

const services = [
  {
    title: "Creative Design",
    price: "$99",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png", // Replace with your actual icon path
  },
  {
    title: "Graphic Design",
    price: "$199",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png", // Replace with your actual icon path
  },
  {
    title: "UI/UX Design",
    price: "$299",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png", // Replace with your actual icon path
  },
  {
    title: "Web Design",
    price: "$399",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png", // Replace with your actual icon path
  },
];

const ServicesSection = () => {
  return (
    <section
      className="py-16 bg-slate-50 dark:bg-[#2c2d33] dark:text-slate-50 md:px-10"
      id="service"
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-orange-500 text-4xl font-semibold">Services</h2>
        <h3 className="text-2xl text-gray-400 font-bold mt-2">
          What I Do for Clients
        </h3>
        {/* <p className="text-gray-500 text-lg mt-2">
          Most common methods for designing websites that work well on desktop
          is responsive and adaptive design.
        </p> */}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#4b4f5c] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50">
                  {service.title}
                </h4>
                <p className="text-orange-500 font-medium">
                  Starts from {service.price}
                </p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-slate-200 mt-4 text-sm">
              {service.description}
            </p>
            <a
              href="#contact"
              className="mt-6 block text-center px-6 py-2.5 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Book a Call
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
