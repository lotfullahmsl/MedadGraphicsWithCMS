"use client";
import React from "react";

function NewComponent({ item, handleImageUpload, handleUrlUpload, handleContentUpdate }) {
  return (
    <div className="border p-4 rounded-lg bg-gray-50 mb-4">
      <h4 className="font-semibold mb-2 text-center">Project {item.id}</h4>
      <input
        type="text"
        value={item.title}
        onChange={(e) =>
          handleContentUpdate("portfolio", [
            ...content.portfolio.map((p) =>
              p.id === item.id ? { ...p, title: e.target.value } : p
            ),
          ])
        }
        className="w-full p-2 border rounded mb-4"
        placeholder="Title"
      />
      <input
        type="text"
        value={item.description}
        onChange={(e) =>
          handleContentUpdate("portfolio", [
            ...content.portfolio.map((p) =>
              p.id === item.id ? { ...p, description: e.target.value } : p
            ),
          ])
        }
        className="w-full p-2 border rounded mb-4"
        placeholder="Description"
      />
      <div className="border p-4 rounded-lg bg-gray-100">
        <h4 className="font-semibold mb-2 text-center">Upload Media</h4>
        <div className="flex flex-col items-center">
          <input
            type="file"
            onChange={(e) => handleImageUpload("portfolio", item.id, e.target.files[0])}
            className="w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={() => {
              const fileInput = document.querySelector('input[type="file"]');
              if (fileInput.files.length > 0) {
                handleImageUpload("portfolio", item.id, fileInput.files[0]);
              }
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
          >
            Submit Upload
          </button>
        </div>
      </div>
    </div>
  );
}

function MainComponent() {
  const { useState, useCallback } = React;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({
    hero: {
      title: "Where Creativity\nMeets Precision",
      subtitle:
        "Elevating brands through innovative design solutions and cutting-edge visual excellence",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    services: [
      {
        id: "service_1",
        icon: "fa-paint-brush",
        title: "Graphic Design",
        description:
          "Professional design solutions tailored to elevate your brand identity.",
      },
      {
        id: "service_2",
        icon: "fa-cube",
        title: "3D Design",
        description:
          "Stunning 3D visualizations that bring your ideas to life.",
      },
      {
        id: "service_3",
        icon: "fa-video",
        title: "Motion Graphics",
        description:
          "Dynamic animations and visual effects for engaging content.",
      },
    ],
    portfolio: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Creative Project",
        description: "Innovative design solution for modern brands",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "John Smith",
        company: "Tech Solutions Inc",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        text: "Exceptional design work that transformed our brand.",
      },
    ],
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "123" && password === "123") {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };
  const handleContentUpdate = (section, newContent) => {
    setContent((prev) => ({
      ...prev,
      [section]: newContent,
    }));
  };
  const handleImageUpload = async (section, id, file) => {
    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        if (section === "hero") {
          handleContentUpdate("hero", { ...content.hero, image: imageUrl });
        } else if (section === "portfolio") {
          const newPortfolio = content.portfolio.map((item) =>
            item.id === id ? { ...item, image: imageUrl } : item
          );
          handleContentUpdate("portfolio", newPortfolio);
        }
        setShowUploadModal(false);
        setSelectedFile(null);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      alert("Error uploading image");
      setLoading(false);
    }
  };
  const addNewProject = () => {
    const newId = Math.max(...content.portfolio.map((p) => p.id)) + 1;
    const newProject = {
      id: newId,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "New Project",
      description: "Project Description",
    };
    handleContentUpdate("portfolio", [...content.portfolio, newProject]);
  };
  const handleUrlUpload = async (section, id, url) => {
    if (section === "portfolio") {
      const newPortfolio = content.portfolio.map((item) =>
        item.id === id ? { ...item, image: url } : item
      );
      handleContentUpdate("portfolio", newPortfolio);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!isLoggedIn && showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[300px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#1a1a1a] text-white px-4 py-2 rounded"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </div>
              {loginError && (
                <p className="text-red-500 mt-2 text-sm">{loginError}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white p-8 rounded-lg w-[500px] shadow-xl max-h-[80vh] overflow-y-auto mx-auto relative">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pt-2">
              <h2 className="text-xl font-bold font-montserrat">Admin Panel</h2>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-4 text-center">Hero Section</h3>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) =>
                    handleContentUpdate("hero", {
                      ...content.hero,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={content.hero.subtitle}
                  onChange={(e) =>
                    handleContentUpdate("hero", {
                      ...content.hero,
                      subtitle: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Subtitle"
                />
                <div className="border p-4 rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-2 text-center">
                    Upload Media
                  </h4>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-center">Portfolio</h3>
                <button
                  onClick={addNewProject}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors mb-6"
                >
                  Add New Project
                </button>
                {content.portfolio.map((item) => (
                  <div key={item.id} className="mb-6 p-4 border rounded">
                    <div className="mb-2">
                      <label className="block text-sm mb-1">Upload Image</label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageUpload(
                            "portfolio",
                            item.id,
                            e.target.files[0]
                          )
                        }
                        className="w-full mb-2"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm mb-1">Or Image URL</label>
                      <input
                        type="text"
                        placeholder="Enter image URL"
                        onChange={(e) =>
                          handleUrlUpload("portfolio", item.id, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newPortfolio = content.portfolio.map((p) =>
                          p.id === item.id ? { ...p, title: e.target.value } : p
                        );
                        handleContentUpdate("portfolio", newPortfolio);
                      }}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Project Title"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newPortfolio = content.portfolio.map((p) =>
                          p.id === item.id
                            ? { ...p, description: e.target.value }
                            : p
                        );
                        handleContentUpdate("portfolio", newPortfolio);
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Project Description"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-6">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-bold"
              >
                Close Admin Panel
              </button>
            </div>
          </div>

          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
              <div className="bg-white p-8 rounded-lg w-[400px] shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Upload Image</h3>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full mb-4"
                  accept="image/*"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleImageUpload("hero", null, selectedFile)
                    }
                    disabled={!selectedFile || loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold font-montserrat text-[#1a1a1a]">
                Medad Graphics
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="font-poppins text-gray-600 hover:text-[#1a1a1a]"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="font-poppins text-gray-600 hover:text-[#1a1a1a]"
              >
                Portfolio
              </a>
              <a
                href="#testimonials"
                className="font-poppins text-gray-600 hover:text-[#1a1a1a]"
              >
                Testimonials
              </a>
              <button className="bg-[#1a1a1a] text-white px-6 py-2 rounded-lg font-poppins hover:bg-[#333]">
                Contact Us
              </button>
              {!isLoggedIn && (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg font-poppins hover:bg-gray-700"
                >
                  Admin Login
                </button>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i
                className={`fas ${
                  isMenuOpen ? "fa-times" : "fa-bars"
                } text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <a
                href="#services"
                className="block px-3 py-2 font-poppins text-gray-600"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="block px-3 py-2 font-poppins text-gray-600"
              >
                Portfolio
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 font-poppins text-gray-600"
              >
                Testimonials
              </a>
              <button className="w-full text-left px-3 py-2 bg-[#1a1a1a] text-white rounded-lg font-poppins">
                Contact Us
              </button>
              {!isLoggedIn && (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full text-left px-3 py-2 bg-gray-800 text-white rounded-lg font-poppins mt-2"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main>
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-60 z-10"></div>
          <div className="absolute inset-0">
            <img
              src={content.hero.image}
              alt="Creative design showcase featuring dynamic visual elements and professional graphics"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4 whitespace-pre-line">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl font-poppins mb-8">
                {content.hero.subtitle}
              </p>
              <button className="bg-white text-[#1a1a1a] px-8 py-3 rounded-lg font-poppins hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </section>
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.services.map((service) => (
                <div
                  key={service.id}
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <i
                    className={`fas ${service.icon} text-4xl text-[#1a1a1a] mb-4`}
                  ></i>
                  <h3 className="text-xl font-bold font-montserrat mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 font-poppins">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12">
              Our Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-montserrat mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-poppins">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12">
              Client Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-6 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold font-montserrat">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 font-poppins text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 font-poppins">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-[#1a1a1a] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold font-montserrat mb-4">
                  Medad Graphics
                </h3>
                <p className="text-gray-400 font-poppins">
                  Elevating brands through innovative design solutions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold font-montserrat mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white font-poppins"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#portfolio"
                      className="text-gray-400 hover:text-white font-poppins"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-gray-400 hover:text-white font-poppins"
                    >
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold font-montserrat mb-4">
                  Contact
                </h4>
                <ul className="space-y-2 text-gray-400 font-poppins">
                  <li>
                    <i className="fas fa-envelope mr-2"></i>{" "}
                    info@medadgraphics.com
                  </li>
                  <li>
                    <i className="fas fa-phone mr-2"></i> +1 (555) 123-4567
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt mr-2"></i> New York, NY
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold font-montserrat mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 font-poppins">
              <p>&copy; 2025 Medad Graphics. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default MainComponent;